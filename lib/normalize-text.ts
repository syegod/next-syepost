export const normalizeText = (str: string) => {
    return str.charAt(0).toUpperCase() + str.substring(1, str.length).toLowerCase();
}