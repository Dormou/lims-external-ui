import { authTest } from "@/processes/authTest";
import { getUXTID, type UXTID } from "@/processes/CreateApplication/CreateApplicationUXT";

describe(`Бизнес процесс подачи заявки`, () => {
    authTest()

    it(`заполняет все вкладки и создаёт заявку`, () => {
        cy.get(`[ux-test-id="${getUXTID("tab-general-info")}"]`).click()

        cy.get(`[ux-test-id="${getUXTID("tab-object-params")}"]`).click()

        cy.contains(`Выберите тип устройства в разделе Общая информация`).should('exist')

        cy.get(`[ux-test-id="${getUXTID("tab-testing-requirements")}"]`).click()

        cy.contains(`Выберите тип устройства в разделе Общая информация`).should('exist')

        cy.get(`[ux-test-id="${getUXTID("tab-general-info")}"]`).click()

        cy.get(`[ux-test-id="${getUXTID("select-device-type")}"]`)
            .focus()
            .click({ force: true })
            .type(`{downarrow}`)
            .type(`Э`)

        cy.get(`[ux-test-id="${getUXTID("device-type")}"]`)
            .first()
            .click({ force: true })

        cy.get(`[ux-test-id="${getUXTID("tab-object-params")}"]`).click()

        cy.contains(`Выберите тип устройства в разделе Общая информация`).should('not.exist')
        cy.contains(`Укажите хотя бы один объект испытаний в разделе Общая информация`).should('exist')

        cy.get(`[ux-test-id="${getUXTID("tab-general-info")}"]`).click()

        cy.get(`[ux-test-id="${getUXTID("select-branch")}"]`)
            .focus()
            .click({ force: true })
            .type(`{downarrow}`)

        cy.get(`[ux-test-id="${getUXTID("branch")}"]`)
            .first()
            .click({ force: true })

        cy.get(`[ux-test-id="${getUXTID("input-manufacturer")}"]`).type(`ООО «Производитель»`)
        cy.get(`[ux-test-id="${getUXTID("input-production-address")}"]`).type(`г. Москва, ул. Ленина, д. 10`)

        cy.get(`[ux-test-id="${getUXTID("summary-testing-objects-title")}"]`)
            .click()

        cy.get(`[ux-test-id="${getUXTID("btn-add-testing-object")}"]`).click()

        cy.get(`[ux-test-id="${getUXTID("testing-object-input")}"]`)
            .first()
            .type(`Объект GLHDS-10`)

        cy.get(`[ux-test-id="${getUXTID("btn-add-testing-object")}"]`).click()

        cy.get(`[ux-test-id="${getUXTID("testing-object-input")}"]`)
            .first()
            .next()
            .type(`Объект GLHDS-11110`)

        cy.get(`[ux-test-id="${getUXTID("tab-object-params")}"]`).click()

        cy.contains(`Выберите тип устройства в разделе Общая информация`).should('not.exist')
        cy.contains(`Укажите хотя бы один объект испытаний в разделе Общая информация`).should('not.exist')

        cy.get(`[ux-test-id="${getUXTID("tab-general-info")}"]`).click()

        cy.get(`[ux-test-id="${getUXTID("tab-object-params")}"]`).click()

        cy.get(`[ux-test-id="${getUXTID("table-params")}"]`)
            .within(() => {
                cy.get(`[ux-test-id="${getUXTID("param-row")}]`).each(($row) => {
                    cy.wrap($row)
                        .within(() => {
                            cy.get(`[ux-test-id="${getUXTID("objs-inputs")}"]`)
                                .find(`[ux-test-id^=${getUXTID("obj-input")}]`)
                                .each(($cell, cIdx) => {
                                    cy.wrap($cell)
                                        .type(`Значение ${cIdx+1}`)
                                })
                        })
                })
            })

        cy.get(`[ux-test-id="${getUXTID("tab-testing-requirements")}"]`).click()

        cy.get(`[ux-test-id="${getUXTID("table-tests")}"]`)
            .within(() => {
                cy.get(`[ux-test-id^=${getUXTID("test-row")}]`).each(($row) => {
                    cy.wrap($row)
                        .within(() => {
                            cy.get(`[ux-test-id="${getUXTID("checkbox-additional")}"]`)
                                .click()
                        })
                })
            })

        cy.get(`[ux-test-id="${getUXTID("tab-technical-docs")}"]`).click()

        const docs = [
            {label: `Нормативный документ`, uxId: `doc-regulatory-document` as UXTID},
            {label:`Технические условия`, uxId: `doc-technical-conditions` as UXTID},
            {label: `Схема строповки`, uxId: `doc-strop-scheme` as UXTID},
            {label: `Дополнительные документы`, uxId: `doc-additional-documents` as UXTID}
        ];

        docs.forEach((doc) => {
            cy.get(`[ux-test-id="${getUXTID(doc.uxId)}"]`)
                .contains(doc.label)
        })

        cy.get(`[ux-test-id="${getUXTID("btn-submit-application")}"]`).click()

        cy.contains(`Заявка успешно сформирована`).should('be.visible')
    })
})