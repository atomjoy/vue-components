export function setCookie(name: string = 'consent-cookie', value: string = 'allow', expirationInDays: number = 365, domain: string = '', path: string = '/') {
    const date = new Date();
    date.setTime(date.getTime() + expirationInDays * 24 * 60 * 60 * 1000);
    document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';domain=' + domain + ';path=' + path + ';secure' + ';samesite=Lax';
}

export function cookieExists(name: string = 'consent-cookie', value: string = 'allow') {
    return document.cookie.split('; ').indexOf(name + '=' + value) !== -1;
}
