import { RoutesPath } from "@/shared/config";
import { getUXTID } from "./CreateApplication/CreateApplicationUXT";

export const authTest = () => beforeEach(() => {
        cy.window().then((win) => {
            win.localStorage.setItem(`user_info`, JSON.stringify(
                {
                    "id": "admin-id",
                    "fullName": {
                        "firstName": "Иван",
                        "lastName": "Иванов",
                        "patronymic": null
                    }
                }
            ));
            
            win.localStorage.setItem(`refresh_token`, "admin-refresh-token");
            win.localStorage.setItem(`access_token`, "admin-access-token");
        })

        cy.visit(RoutesPath.CreateApplication)

        cy.get(`[ux-test-id="${getUXTID("add-application")}"]`).click()

        cy.get(`[ux-test-id="${getUXTID("add-application-preform")}"]`).should('exist')

        cy.get(`[ux-test-id="${getUXTID("application-description")}"]`).should('exist')

        cy.get(`[ux-test-id="${getUXTID("back")}"]`).click()

        cy.get(`[ux-test-id="${getUXTID("add-application")}"]`).click()

        cy.get(`[ux-test-id="${getUXTID("go-write-application-btn")}"]`).click()
})