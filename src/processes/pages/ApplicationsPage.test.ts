import { RoutesPath } from "@/types/routesPath";

export type UXTID = 
"add-application-preform" 
| "add-application" 
| "application-description"
| "back"
| "go-write-application-btn"
| "tab-testing-requirements"
| "tab-object-params"
| "tab-general-info"
| "select-device-type"
| "device-type"
| "select-branch"
| "branch"
| "input-manufacturer"
| "input-production-address"
| "summary-testing-objects-title"
| "btn-add-testing-object"
| "testing-object-input"
| "testing-object-input"
| "table-params"
| "table-params-header"
| "param-col"
| "objs-cols"
| "param"
| "table-tests"
| "tests-header"
| "objs-inputs"
| "tests-col"
| "test-description"
| "test"
| "test-name"
| "tab-technical-docs"
| "checkbox-additional"
| "objs-checkboxes"
| "mandatory-requirements"
| "checkbox-mandatory"
| "additional-requirements"
| "btn-submit-application"
| "doc-regulatory-document"
| "doc-technical-conditions"
| "doc-strop-scheme"
| "doc-additional-documents"
| "param-row"
| 'obj-input'
| "objs-cols"
| "obj-col"
| "test-row"
| "test-rune"

export const getUXTID = (value: UXTID) => () => value

//type lol = typeof (() => getUXIDs(UXID.))


describe(`Бизнес процесс подачи заявки`, () => {
    beforeEach(`click add application button`, () => {
        // Принудительно записываем данные в браузер перед визитом на сайт
        cy.window().then((win) => {
            win.localStorage.setItem(`lims.userinfo`, JSON.stringify(
                {
                    id: "test",
                    token: "sfsdgdsgfdgdgfgdg",
                    firstname: "Иван",
                    signUpDate: "Sat Mar 14 2026 16:54:21 GMT+0700 (Indochina Time)",
                    lastname: "Иванов",
                    additionalname: "Иванович",
                    dolgnost: "Администратор",
                    orgname: "HyperAirBus",
                    orgaddress: "air",
                    phone: "+79044308421",
                    email: "kravter7@gmail.com",
                    session: "Браузер Yandex, Россия, г. Москва (вход выполнен в 09:24:15 13.05.2024)",
                    passwordUpdateAt: "2026-03-14T09:54:21.832Z"
                }
            ));
        })

        cy.visit(RoutesPath.CreateApplication)

        cy.get(`[ux-test-id="${getUXTID("add-application")}"]`)
            .should(`exist`)
            .should(`have.text`, `Подать заявку`)
            .click()

        cy.get(`[ux-test-id="${getUXTID("add-application-preform")}"]`)
            .should(`exist`)

        cy.get(`[ux-test-id="${getUXTID("application-description")}"]`)
            .should(`exist`)
            // .contains(
            //     "В форме подачи заявки вам необходимо заполнить четыре раздела: Общая информация, Характеристики объектов испытаний, Требования к испытаниям и Техническая документация." 
            //     +" После этого система сформирует заявку и предложит вам скачать сформированный документ."
            //     +" Вам необходимо распечатать его на фирменном бланке вашей организации, поставить подпись руководителя организации (или иного лица, уполномоченного на подпись документов) и загрузить скан подписанного документа в систему."
            //     +" Обратите внимание: для формирования заявки у вас должны быть заполнены все данные в Личном кабинете."
            //     +" Вы можете в любой момент прервать заполнение заявки и вернуться к ней позже. Заявка будет храниться в системе в статусе “Черновик” в течение 30 дней.")
        
        cy.get(`[ux-test-id="${getUXTID("back")}"]`)
            .should(`exist`)
            .should(`have.text`, `Назад`)
            .click()
        
        cy.get(`[ux-test-id="${getUXTID("add-application")}"]`)
            .should(`exist`)
            .should(`have.text`, `Подать заявку`)
            .click()

        
        cy.get(`[ux-test-id="${getUXTID("go-write-application-btn")}"]`)
            .should(`exist`)
            .should(`have.text`, `Заполнить заявку`)
            .click()
            
    })
//
    it(`заполняет все вкладки и создаёт заявку`, () => {
        /*---------------------------------------------------*/
        /* ---------- Вкладка 1: Общая информация ---------- */
        cy.get(`[ux-test-id="${getUXTID("tab-general-info")}"]`).click()

        /* Проверка сообщения об обязательности типа устройства */
        cy.get(`[ux-test-id="${getUXTID("tab-object-params")}"]`).click()

        cy.contains(`Выберите тип устройства в разделе Общая информация`).should(`exist`)

        cy.get(`[ux-test-id="${getUXTID("tab-testing-requirements")}"]`).click()

        cy.contains(`Выберите тип устройства в разделе Общая информация`).should(`exist`)

        //Возврат на вкладку общая инфа
        cy.get(`[ux-test-id="${getUXTID("tab-general-info")}"]`).click()

        // Выбор типа устройства
        cy.get(`[ux-test-id="${getUXTID("select-device-type")}"]`)
            .focus()
            .click({ force: true })
            .type(`{downarrow}`)
            .type(`Э`)
            
        cy.get(`[ux-test-id="${getUXTID("device-type")}"]`)
            .first()
            .should(`not.have.text`, ``) 
            .click({ force: true })

        /* Проверка сообщения об обязательности объектов */
        cy.get(`[ux-test-id="${getUXTID("tab-object-params")}"]`).click()
        
        cy.contains(`Выберите тип устройства в разделе Общая информация`).should(`not.exist`)
        cy.contains(`Укажите хотя бы один объект испытаний в разделе Общая информация`).should(`exist`) 
        // Возврат на вкладку общая инфа
        cy.get(`[ux-test-id="${getUXTID("tab-general-info")}"]`).click()

        // Филиал подачи заявки
        cy.get(`[ux-test-id="${getUXTID("select-branch")}"]`)
            .focus()
            .click({ force: true })
            .type(`{downarrow}`)
        
        cy.get(`[ux-test-id="${getUXTID("branch")}"]`)
            .first()
            .should(`not.have.text`, ``) 
            .click({ force: true })

        // Поля ввода текста
        cy.get(`[ux-test-id="${getUXTID("input-manufacturer")}"]`).type(`ООО «Производитель»`)
        cy.get(`[ux-test-id="${getUXTID("input-production-address")}"]`).type(`г. Москва, ул. Ленина, д. 10`)

        /* Добавляем объект испытания */
        cy.get(`[ux-test-id="${getUXTID("summary-testing-objects-title")}"]`)
            .should(`have.text`, `Объекты испытаний (ОИ)`)
            .click()

        cy.get(`[ux-test-id="${getUXTID("btn-add-testing-object")}"]`).click()
                
         cy.get(`[ux-test-id="${getUXTID("testing-object-input")}"]`)
            .first()
            .type(`Объект GLHDS-10`)

        /* Добавляем второй объект для дальнейших таблиц */
        cy.get(`[ux-test-id="${getUXTID("btn-add-testing-object")}"]`).click()
                
         cy.get(`[ux-test-id="${getUXTID("testing-object-input")}"]`)
            .first()
            .next()
            .type(`Объект GLHDS-11110`)

        /* Проверка отсуствия сообщения об обязательности объектов */
        cy.get(`[ux-test-id="${getUXTID("tab-object-params")}"]`).click()
        
        cy.contains(`Выберите тип устройства в разделе Общая информация`).should(`not.exist`)
        cy.contains(`Укажите хотя бы один объект испытаний в разделе Общая информация`).should(`not.exist`) 
        // Возврат на вкладку общая инфа
        cy.get(`[ux-test-id="${getUXTID("tab-general-info")}"]`).click()


        /*--------------------------------------------------------------------*/
        /* ---------- Вкладка 2: Характеристики объектов испытании ---------- */
        cy.get(`[ux-test-id="${getUXTID("tab-object-params")}"]`).click()

        // Таблица параметров
        cy.get(`[ux-test-id="${getUXTID("table-params")}"]`)
            .within(() => {
                //проверка первой строки\хидера таблицы
                cy.get(`[ux-test-id="${getUXTID("table-params-header")}"]`)
                    .within(() => {
                        cy.get(`[ux-test-id="${getUXTID("param-col")}"]`)
                            .should(`exist`)
                            .should(`have.text`, "Параметр")
                            .find(`[ux-test-id^=${getUXTID("obj-col")}]`)
                            .each(($col, idx) => {
                                cy.wrap($col)//.find(`[ux-test-id="obj-col-${idx}"]`)
                                .should(`have.text`, `Объект испытаний №${idx+1}`)
                            })
                })

                //проверка строк
                cy.get(`[ux-test-id^=${getUXTID("param-row")}]`).each(($row, rIdx) => {
                    cy.wrap($row)
                    .within(() => {
                        // cy.get(`[ux-test-id="${getUXTID("param")}"]`)
                        //     .should(`exist`)
                        
                        cy.get(`[ux-test-id="${getUXTID("objs-inputs")}"]`)
                            .find(`[ux-test-id^=${getUXTID("obj-input")}]`)
                            .each(($cell, cIdx) => {
                                cy.wrap($cell)//.find(`[ux-test-id="obj-input-${idx}"]`)
                                    .should(`have.attr`, `placeholder`, `Введите значение`)
                                    .type(`Значение ${rIdx+1}-${cIdx+1}`)

                            })
                    })
                })
            })

        /*----------------------------------------------------------*/
        /* ---------- Вкладка 3: Требования к испытаниям ---------- */
        cy.get(`[ux-test-id="${getUXTID("tab-testing-requirements")}"]`).click()

        // Таблица параметров
        cy.get(`[ux-test-id="${getUXTID("table-tests")}"]`)
            .within(() => {
                // проверка первой строки\хидера таблицы
                cy.get(`[ux-test-id="${getUXTID("tests-header")}"]`)
                    .within(() => {
                        cy.get(`[ux-test-id="${getUXTID("tests-col")}"]`)
                            .should(`exist`)
                            //WARN!!! Edited, old:
                            //.should(`have.text`, "Испытание")
                            .should(`have.text`, "Наименование испытания")

                        cy.get(`[ux-test-id="${getUXTID("objs-cols")}"]`)
                            .find(`[ux-test-id^=${getUXTID("obj-col")}]`)
                            .each(($col, idx) => {
                                cy.wrap($col)
                                //.find(`[ux-test-id="obj-col-${idx}"]`) - ???
                                //WARN!!! Edited, old:
                                //.should(`have.text`, `ОИ №${++idx}`)
                                .should(`have.text`, `№${++idx}`)
                            })
                })

                //проверка строк
                cy.get(`[ux-test-id^=${getUXTID("test-row")}]`).each(($row) => {
                    cy.wrap($row)
                    .within(() => {
                        cy.get(`[ux-test-id="${getUXTID("test")}"]`)
                            .find(`[ux-test-id="${getUXTID("test-description")}"]`)
                            .should(`not.be.empty`)
                        
                        cy.get(`[ux-test-id="${getUXTID("test")}"]`)
                            .find(`[ux-test-id="${getUXTID("test-name")}"]`)
                            .should(`not.be.empty`)
                        
                        cy.get(`[ux-test-id="${getUXTID("checkbox-mandatory")}"]`)
                            .should(`have.attr`, `type`, `checkbox`)
                            .should(`be.checked`)
                            .should(`be.disabled`)

                        cy.get(`[ux-test-id="${getUXTID("checkbox-additional")}"]`)
                            .should(`have.attr`, `type`, `checkbox`)

                        cy.get(`[ux-test-id="${getUXTID("test")}"]`)
                            .find(`[ux-test-id="${getUXTID("mandatory-requirements")}"]`)
                        
                        cy.get(`[ux-test-id="${getUXTID("test")}"]`)
                            .find(`[ux-test-id="${getUXTID("additional-requirements")}"]`)
                        
                        cy.get(`[ux-test-id="${getUXTID("objs-checkboxes")}"]`)
                            .find(`[ux-test-id^="obj-checkbox-" as UXID]`)
                            .each(($cell, idx) => {
                                cy.wrap($cell)//.find(`[ux-test-id="obj-checkbox-${idx}"]`)
                                    .should(`have.attr`, `type`, `checkbox`)
                            })
                    })
                })
            })

        
        /*-----------------------------------------------------------*/
        /* ---------- Вкладка 4: Техническая документация ---------- */
        
        cy.get(`[ux-test-id="${getUXTID("tab-technical-docs")}"]`).click()

        const docs = [
            {label: `Нормативный документ`, uxId: `doc-regulatory-document` as UXTID},
            {label:`Технические условия`, uxId: `doc-technical-conditions` as UXTID},
            {label: `Схема строповки`, uxId: `doc-strop-scheme` as UXTID},          // or "Strop Diagram"
            {label: `Дополнительные документы`, uxId: `doc-additional-documents` as UXTID}
        ];

        // Проверяем наличие всех полей для загрузки документов, дописать проверку захвата файлов
        docs.forEach((doc) => {
            cy.get(`[ux-test-id="${getUXTID(doc.uxId)}"]`)
                .contains(doc.label)
        })

        /*------------------------------------------------------*/
        /* ---------- Финальный шаг: Создание заявки ---------- */
        cy.get(`[ux-test-id="${getUXTID("btn-submit-application")}"]`).click()

        // Проверяем появление сообщения об успешной отправке
        cy.contains(`Заявка успешно сформирована`).should(`be.visible`)

        // Проверяем, что можно загрузить файл
        // cy.get(`[ux-test-id="file-upload-area"]`)
        //     .within(() => {
        //     cy.contains(`Перетащите файл сюда или Нажмите, чтобы выбрать файл`).should(
        //         `exist`
        //     )

        //     // Загружаем тестовый файл
        //     // const fileName = `test.pdf`
        //     // cy.get(`[ux-test-id="file-upload-input"]`).attachFile(fileName)
        // })
    })
})