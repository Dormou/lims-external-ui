import { Button, ActionIcon, rem } from "@mantine/core";
import buttonClasses from "./Button.module.css";

/**
 * Конфигурация кнопки Button
 * 
 * @description
 * Стандартная кнопка приложения с тремя вариантами отображения.
 * 
 * @example
 * ```tsx
 * // Основная кнопка
 * <Button>Подать заявку</Button>
 * 
 * // С иконкой
 * <Button leftSection={<IconPlus />}>Создать</Button>
 * 
 * // Контурная
 * <Button variant="outline">Отмена</Button>
 * 
 * // Текстовая
 * <Button variant="subtle">Подробнее</Button>
 * ```
 * 
 * @variants
 * - `filled` (по умолчанию) — основное действие, залитая цветом
 * - `outline` — второстепенное действие, с контуром
 * - `subtle` — текстовая кнопка для действий внутри контента
 * 
 * @sizes
 * - `xs` — 28px
 * - `md` (по умолчанию) — 48px, основной размер
 */

export const buttonConfig = Button.extend({
  defaultProps: {
    variant: "filled",
    size: "md",
  },
  classNames: {
    root: buttonClasses.root,
  },
  vars: (_, props) => {
    if (props.size === "md") {
      return {
        root: {
          "--button-height": rem(48),
          "--button-padding-x": rem(24),
          "--button-fz": rem(24),
        },
      };
    }
    if (props.size === "xs") {
      return {
        root: {
          "--button-height": rem(28),
          "--button-padding-x": rem(12),
          "--button-fz": rem(16),
        },
      };
    }
    return { root: {} };
  },
});

/**
 * Конфигурация иконки-кнопки ActionIcon
 * 
 * @description
 * Компактная кнопка с иконкой без текста.
 * Использует те же стили и варианты, что и Button.
 * 
 * @example
 * ```tsx
 * <ActionIcon variant="filled">
 *   <IconPlus size={16} />
 * </ActionIcon>
 * 
 * <ActionIcon variant="outline">
 *   <IconEdit size={16} />
 * </ActionIcon>
 * ```
 * 
 * @variants
 * - `filled` (по умолчанию) — залитая иконка
 * - `outline` — иконка с контуром
 */
export const actionIconConfig = ActionIcon.extend({
  defaultProps: {
    variant: "filled",
    size: "md",
  },
  classNames: {
    root: buttonClasses.root,
  },
});