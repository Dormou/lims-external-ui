import { colorsTuple, type MantineColorsTuple } from "@mantine/core";

// Основной и дополнительный цвета бренда
export const colors = {
    primaryBlue: [
        "#ebf7ff", // 0
        "#a6d4f7", // 1
        "#75bef6", // 2
        "#409ef5", // 3
        "#3698f6", // 4
        "#1f75c4", // 5
        "#005b9c", // 6
        "#0070BF", // 7
        "#00497D", // 8
        "#004373", // 9
    ] as MantineColorsTuple,

    primaryDark: colorsTuple("#00497d"),
    primaryLight: colorsTuple("#0070bf"),

    complementaryBlue: [
        "#ebf3f7", // 0
        "#ebf3f7", // 1
        "#ebf3f7", // 2
        "#ebf3f7", // 3
        "#ebf3f7", // 4
        "#ebf3f7", // 5
        "#e3eef4", // 6
        "#c1d9e7", // 7
        "#91bad3", // 8
        "#91bad3", // 9
    ] as MantineColorsTuple,

    complementaryDark: colorsTuple("#c1d9e7"),
    complementaryLight: colorsTuple("#ebf3f7"),

    // Цвета состояний
    successGreen: [
        "#eefcf5", // 0
        "#dcf6ea", // 1
        "#b4edd2", // 2
        "#67dda4", // 3
        "#46d78e", // 4
        "#2ea96c", // 5
        "#198754", // 6
        "#17804f", // 7
        "#157347", // 8
        "#12663f", // 9
    ] as MantineColorsTuple,

    warningYellow: [
        "#fffae2", // 0
        "#fff3cd", // 1
        "#ffe69c", // 2
        "#ffd866", // 3
        "#ffcc3a", // 4
        "#ffc110", // 5
        "#dfa700", // 6
        "#ca9700", // 7
        "#af8100", // 8
        "#a37800", // 9
    ] as MantineColorsTuple,

    errorRed: [
        "#ffeaed", // 0
        "#fed5d9", // 1
        "#ffd2d6", // 2
        "#f3a9b0", // 3
        "#e97b85", // 4
        "#e15361", // 5
        "#dc3545", // 6
        "#dc2c3e", // 7
        "#c31e30", // 8
        "#9a0822", // 9
    ] as MantineColorsTuple,

    // Нейтральные цвета
    white: colorsTuple("#ffffff"),
    lightGray: colorsTuple("#dce0e4"),
    darkGray: colorsTuple("#9da5ad"),
    black: colorsTuple("#212529"),
    
} as const;