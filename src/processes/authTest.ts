export const authTest = (url = '/') => beforeEach('Авторизация', () => {
  cy.visit(url, {
    // до выполнения скриптов страницы: приложение стартует уже с токенами
    onBeforeLoad: (win) => {
      win.localStorage.setItem('user_info', JSON.stringify({
        id: 'admin-id',
        fullName: { firstName: 'Иван', lastName: 'Иванов', patronymic: null },
      }))
      win.localStorage.setItem('refresh_token', 'admin-refresh-token')
      win.localStorage.setItem('access_token', 'admin-access-token')
    },
  })
})