import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query'
import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { Mutex } from 'async-mutex'
import queryString from 'query-string'

// Мьютекс для блокировки одновременных запросов обновления
const mutex = new Mutex()

interface ReauthConfig {
  baseUrl: string
  refreshUrl: string
  getToken: (state: any) => string | null
  getRefreshToken: (state: any) => string | null
  onRefreshSuccess: (data: any) => { type: string; payload: any }
  onRefreshApiError: () => { type: string; payload?: any }
}

export const createBaseQueryWithReauth = (
  config: ReauthConfig
): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> => {
  const baseQuery = fetchBaseQuery({
    baseUrl: config.baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = config.getToken(getState())
      if (token) headers.set('authorization', `Bearer ${token}`)
      return headers
    },
    paramsSerializer: (params: Record<string, unknown>) =>
      queryString.stringify(params, { arrayFormat: 'none' }),
  })

  return async (args, api, extraOptions) => {
    // Ожидаем, если обновление токена уже запущено другим запросом
    await mutex.waitForUnlock()
    let result = await baseQuery(args, api, extraOptions)

    if (result.error && result.error.status === 401) {
      // Взаимоблокировка (блокируем доступ остальных, пока обновляем токен)
      const release = await mutex.acquire()
      try {
        const refreshToken = config.getRefreshToken(api.getState())

        const refreshResult = await baseQuery(
          { url: config.refreshUrl, method: 'POST', body: { refreshToken } },
          api,
          extraOptions
        )

        if (refreshResult.data) {
          api.dispatch(config.onRefreshSuccess(refreshResult.data))
          // Повторяем исходный запрос с новым токеном
          result = await baseQuery(args, api, extraOptions)
        } else {
          // Ошибка обновления токена
          api.dispatch(config.onRefreshApiError())
        }
      } finally {
        // Снимаем блокировку
        release()
      }
    }
    return result
  }
}
