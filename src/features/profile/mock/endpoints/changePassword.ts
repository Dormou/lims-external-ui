import { http, HttpHandler, HttpResponse } from 'msw'
import type { ChangePasswordRequest } from '../../types/requests'
import type { ChangePasswordResponse } from '../../types/responses'

const ENDPOINT_URL = 'auth/change-password'

export const changePasswordHandler: HttpHandler = http.post<never, ChangePasswordRequest, ChangePasswordResponse>(ENDPOINT_URL, async ({ request }) => {
	setTimeout(() => undefined, 1000)

	try {
		const data = await request.json()

		if (data.oldPassword !== 'test1234') 
			return HttpResponse.json(undefined, { status: 401 })

		return HttpResponse.json<ChangePasswordResponse>({
			accessToken: 'admin-token',
			refreshToken: 'admin-refresh-token',
			expiresInSeconds: 99999,
			userInfo: {
				id: 'admin-id',
				fullName: {
					firstName: 'Иван',
					lastName: 'Иванов',
					patronymic: null
				}
			}
		})
	}
	catch (error) {
		HttpResponse.json(undefined, { status: 400 })
	}
})