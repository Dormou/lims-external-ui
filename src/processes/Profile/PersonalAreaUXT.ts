export type UXTID =
    "profile-menu-button"
    | "personal-cabinet-menu-item"
    | "user-info-block"
    | "reset-changes-button"
    | "save-changes-button"
    | "is-tech-contact-checkbox"
    | "tech-contact-firstname"
    | "tech-contact-lastname"
    | "is-head-checkbox"
    | "head-firstname"
    | "head-lastname"
    | "change-password-button"
    | "old-password-input"
    | "new-password-input"
    | "confirm-password-input"
    | "save-password-button"
    | "firstname"
    | "lastname"
    | "patronymic"
    | "confirm-password-input-container"
    | "tech-contact-patronymic"
    | "head-patronymic"
    | "head-user-info-block"
    | "tech-user-info-block"
    | "tech-contact-patronymic";

// export const getUXID = (uxid: UXTID): string => {
//   switch (uxid) {
//     case 'profile-menu-button': return '#profileMenuButton'; // Пример ID, замените на фактический
//     case 'personal-cabinet-menu-item': return '#personalCabinetMenuItem'; // Пример ID
//     // ... другие кейсы для каждого UXID
//     default: throw new Error(`Unknown UXID: ${uxid}`);
//   }
// };

export const getUXTID = (value: UXTID) => value