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
})