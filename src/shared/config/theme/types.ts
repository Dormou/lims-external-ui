import type { MantineColorsTuple } from "@mantine/core";

declare module "@mantine/core" {
  export interface MantineThemeColorsOverride {
    colors: Record<
      | "primaryBlue"
      | "primaryDark"
      | "primaryLight"
      | "complementaryBlue"
      | "complementaryDark"
      | "complementaryLight"
      | "successGreen"
      | "warningYellow"
      | "errorRed"
      | "white"
      | "lightGray"
      | "darkGray"
      | "black",
      MantineColorsTuple
    >;
  }
}