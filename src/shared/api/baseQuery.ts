import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query'
import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { Mutex } from 'async-mutex'
import queryString from 'query-string'

// Решить проблему
import type { RootState } from '@/app/store'
import type { RefreshTokenResponse } from '@/entities/auth'
import { login, logout } from '@/entities/auth'

// Мьютекс для блокировки одновременных запросов обновления
const mutex = new Mutex()

const baseUrl =
  import.meta.env.VITE_ENABLE_MOCK === 'true'
    ? `http://localhost:${import.meta.env.VITE_SERVER_PORT}`
    : '/api'

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState
    const token = state.auth.accessToken

    if (token) headers.set('authorization', `Bearer ${token}`)

    return headers
  },
  paramsSerializer: (params: Record<string, unknown>) =>
    queryString.stringify(params, { arrayFormat: 'none' }),
})

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // Ожидаем, если обновление токена уже запущено другим запросом
  await mutex.waitForUnlock()

  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    // Взаимоблокировка (блокируем доступ остальных, пока обновляем токен)
    const release = await mutex.acquire()
    try {
      const refreshToken = (api.getState() as RootState).auth.refreshToken

      const refreshResult = (
        await baseQuery(
          {
            url: '/auth/refresh',
            method: 'POST',
            body: { refreshToken },
          },
          api,
          extraOptions
        )
      ).data as RefreshTokenResponse

      if (refreshResult) {
        api.dispatch(login(refreshResult))

        // Повторяем исходный запрос с новым токеном
        result = await baseQuery(args, api, extraOptions)
      } else {
        // Ошибка обновления токена: выходим из системы
        api.dispatch(logout())
      }
    } finally {
      // Снимаем блокировку
      release()
    }
  }

  return result
}
