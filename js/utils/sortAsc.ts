export function sortAsc(arr: Array<string>) {
    return arr.sort((a: any, b: any) => a.localeCompare(b));
}
