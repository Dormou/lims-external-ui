/**
 * Форматирует размер файла в читаемый вид
 * 
 * @param bytes - размер в байтах
 * @returns строка вида "2.5 МБ"
 * 
 * @example
 * formatFileSize(2048000) = "2.0 МБ"
 * formatFileSize(512)     = "512 Б"
 */
export const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} Б`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} КБ`
    return `${(bytes / (1024 * 1024)).toFixed(1)} МБ`
}