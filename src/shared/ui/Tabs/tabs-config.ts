import { Tabs } from "@mantine/core";
import tabsClasses from "./Tabs.module.css";

/**
 * Конфигурация вкладок Tabs
 * 
 * @variants
 * - `custom` — кастомные вкладки с нижней полоской
 * 
 * @example
 * ```tsx
 * <Tabs variant="custom" defaultValue="tab1">
 *   <Tabs.List>
 *     <Tabs.Tab value="tab1">Вкладка 1</Tabs.Tab>
 *     <Tabs.Tab value="tab2">Вкладка 2</Tabs.Tab>
 *   </Tabs.List>
 * </Tabs>
 * ```
 */
export const tabsConfig = Tabs.extend({
  classNames: tabsClasses,
});