import { getUXID } from './PersonalAreaUXT'
import { authTest } from '@/processes/authTest'

import * as chai from 'chai'

import { CustomMatchers } from './CustomMatchers'

chai.use(CustomMatchers)

describe('Личный кабинет', () => {
  beforeEach(() => {
    authTest() // Авторизация перед каждым тестом
  })

  it('Проверка открытия меню профиля и перехода в личный кабинет', () => {
    cy.get(getUXID('profile-menu-button')).click()
    cy.get(getUXID('personal-cabinet-menu-item')).click()
    cy.url().should('include', '/personal-cabinet') // Проверка URL
  })

  it('Проверка изменения данных пользователя и отображения кнопок', () => {
    cy.get(getUXID('user-info-block')).within(() => {
      cy.get('[data-testid="firstName"]').clear().type('TestFirstName')
      cy.get('[data-testid="lastName"]').clear().type('TestLastName')

      // Проверка появления кнопок
      cy.get(getUXID('reset-changes-button')).should('be.visible')
      cy.get(getUXID('save-changes-button')).should('be.visible')
    })

    cy.get(getUXID('reset-changes-button')).click()
    // Проверка, что изменения сброшены (можно добавить проверку значения полей)
  })

  it('Проверка сохранения изменений данных пользователя', () => {
    cy.get(getUXID('user-info-block')).within(() => {
      cy.get('[data-testid="firstName"]').clear().type('TestFirstName')
      cy.get('[data-testid="lastName"]').clear().type('TestLastName')
    })

    cy.get(getUXID('save-changes-button')).click()
    // Проверка успешного сохранения (можно добавить проверку API запроса или отображения сообщения об успехе)
  })

  it('Проверка чекбокса "Я являюсь контактным лицом по техническим вопросам"', () => {
    cy.get(getUXID('is-tech-contact-checkbox')).click()

    // Проверка, что поля в блоке "Информация о контактном лице" стали неактивными и заполнены данными из блока "Информация о пользователе"
    cy.get(getUXID('tech-contact-firstName')).should('be.disabled')
    cy.get(getUXID('tech-contact-lastName')).should('be.disabled')
    // Добавьте проверки для остальных полей

    // Проверка, что кнопки сохранения/отмены появились только в блоке "Информация о пользователе"
    cy.get(getUXID('reset-changes-button')).should('be.visible')
    cy.get(getUXID('save-changes-button')).should('be.visible')
  })

  it('Проверка чекбокса "Я являюсь руководителем организации"', () => {
    cy.get(getUXID('is-head-checkbox')).click()

    // Проверка, что поля в блоке "Информация о руководителе" стали неактивными и заполнены данными из блока "Информация о пользователе"
    cy.get(getUXID('head-firstName')).should('be.disabled')
    cy.get(getUXID('head-lastName')).should('be.disabled')
    // Добавьте проверки для остальных полей

    // Проверка, что кнопки сохранения/отмены появились только в блоке "Информация о пользователе"
    cy.get(getUXID('reset-changes-button')).should('be.visible')
    cy.get(getUXID('save-changes-button')).should('be.visible')
  })

  it('Проверка формы смены пароля', () => {
    cy.get(getUXID('change-password-button')).click()

    // Проверка отображения формы смены пароля
    cy.get(getUXID('old-password-input')).should('be.visible')
    cy.get(getUXID('new-password-input')).should('be.visible')
    cy.get(getUXID('confirm-password-input')).should('be.visible')

    // Проверка неактивности кнопки "Сохранить пароль"
    cy.get(getUXID('save-password-button')).should('be.disabled')

    // Валидация пароля (пример)
    cy.get(getUXID('new-password-input')).type('weakpass')
    cy.get('[data-testid="error-description"]').should('contain', 'не менее 8 символов, содержит буквы в нижнем и верхнем регистре, содержит хотя бы одну цифру')

    // Проверка сравнения паролей
    cy.get(getUXID('new-password-input')).type('strongpass')
    cy.get(getUXID('confirm-password-input')).type('wrongpass')
    cy.get('[data-testid="error-description"]').should('contain', 'Пароли не совпадают')

    // Активация кнопки "Сохранить пароль"
    cy.get(getUXID('new-password-input')).clear().type('StrongPass123!')
    cy.get(getUXID('confirm-password-input')).clear().type('StrongPass123!')
    cy.get(getUXID('save-password-button')).should('be.enabled')

    // Сохранение пароля (пример)
    cy.get(getUXID('save-password-button')).click()
    // Проверка успешного сохранения и перенаправления (можно добавить проверку API запроса или отображения сообщения об успехе)
  })
})
