import { CustomMatchers } from './CustomMatchers'

import { authTest } from '@/processes/authTest'
import { fromUXTIDValue } from '@/processes/fromUXTIDValue'

chai.use(CustomMatchers)

describe('Личный кабинет', () => {
  authTest('/profile')

  // it('Проверка открытия меню профиля и перехода в личный кабинет', () => {
  //   cy.get(fromUXTIDValue('profile-menu-button')).click()
  //   cy.get(fromUXTIDValue('personal-cabinet-menu-item')).click()
  //   cy.url().should('include', '/personal-cabinet') // Проверка URL
  // })

  it('Проверка изменения данных пользователя и отображения кнопок', () => {
    cy.get(fromUXTIDValue('user-info-block')).within(() => {
      cy.get(fromUXTIDValue('firstname')).clear().type('TestFirstName')
      cy.get(fromUXTIDValue('lastname')).clear().type('TestLastName')

      // Проверка появления кнопок
      cy.get(fromUXTIDValue('reset-changes-button')).should('be.visible')
      cy.get(fromUXTIDValue('save-changes-button')).should('be.visible')
    })

    cy.get(fromUXTIDValue('reset-changes-button')).click()
    // Проверка, что изменения сброшены (можно добавить проверку значения полей)
  })

  it('Проверка сохранения изменений данных пользователя', () => {
    cy.get(fromUXTIDValue('user-info-block')).within(() => {
      cy.get('[data-testid="firstName"]').clear().type('TestFirstName')
      cy.get('[data-testid="lastName"]').clear().type('TestLastName')
    })

    cy.get(fromUXTIDValue('save-changes-button')).click()
    // Проверка успешного сохранения (можно добавить проверку API запроса или отображения сообщения об успехе)
  })

  it('Проверка чекбокса "Я являюсь контактным лицом по техническим вопросам"', () => {
    cy.get(fromUXTIDValue('is-tech-contact-checkbox')).click()

    // Проверка, что поля в блоке "Информация о контактном лице" стали неактивными и заполнены данными из блока "Информация о пользователе"
    cy.get(fromUXTIDValue('tech-contact-firstName')).should('be.disabled')
    cy.get(fromUXTIDValue('tech-contact-lastName')).should('be.disabled')
    // Добавьте проверки для остальных полей

    // Проверка, что кнопки сохранения/отмены появились только в блоке "Информация о пользователе"
    cy.get(fromUXTIDValue('reset-changes-button')).should('be.visible')
    cy.get(fromUXTIDValue('save-changes-button')).should('be.visible')
  })

  it('Проверка чекбокса "Я являюсь руководителем организации"', () => {
    cy.get(fromUXTIDValue('is-head-checkbox')).click()

    // Проверка, что поля в блоке "Информация о руководителе" стали неактивными и заполнены данными из блока "Информация о пользователе"
    cy.get(fromUXTIDValue('head-firstName')).should('be.disabled')
    cy.get(fromUXTIDValue('head-lastName')).should('be.disabled')
    // Добавьте проверки для остальных полей

    // Проверка, что кнопки сохранения/отмены появились только в блоке "Информация о пользователе"
    cy.get(fromUXTIDValue('reset-changes-button')).should('be.visible')
    cy.get(fromUXTIDValue('save-changes-button')).should('be.visible')
  })

  it('Проверка формы смены пароля', () => {
    cy.get(fromUXTIDValue('change-password-button')).click()

    // Проверка отображения формы смены пароля
    cy.get(fromUXTIDValue('old-password-input')).should('be.visible')
    cy.get(fromUXTIDValue('new-password-input')).should('be.visible')
    cy.get(fromUXTIDValue('confirm-password-input')).should('be.visible')

    // Проверка неактивности кнопки "Сохранить пароль"
    cy.get(fromUXTIDValue('save-password-button')).should('be.disabled')

    // Валидация пароля (пример)
    cy.get(fromUXTIDValue('new-password-input')).type('weakpass')
    cy.get('[data-testid="error-description"]').should('contain', 'не менее 8 символов, содержит буквы в нижнем и верхнем регистре, содержит хотя бы одну цифру')

    // Проверка сравнения паролей
    cy.get(fromUXTIDValue('new-password-input')).type('strongpass')
    cy.get(fromUXTIDValue('confirm-password-input')).type('wrongpass')
    cy.get('[data-testid="error-description"]').should('contain', 'Пароли не совпадают')

    // Активация кнопки "Сохранить пароль"
    cy.get(fromUXTIDValue('new-password-input')).clear().type('StrongPass123!')
    cy.get(fromUXTIDValue('confirm-password-input')).clear().type('StrongPass123!')
    cy.get(fromUXTIDValue('save-password-button')).should('be.enabled')

    // Сохранение пароля (пример)
    cy.get(fromUXTIDValue('save-password-button')).click()
    // Проверка успешного сохранения и перенаправления (можно добавить проверку API запроса или отображения сообщения об успехе)
  })
})