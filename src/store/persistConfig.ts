import Cookies from 'js-cookie';

export const COOKIE_NAME = process.env.NEXT_PUBLIC_COOKIE_NAME ?? 'cookie';

export const getCookieValue = (key: string) => {
    const cookieValue = Cookies.get(key);
    return cookieValue && cookieValue !== 'undefined' ? JSON.parse(cookieValue) : undefined;
};

export const setCookieValue = (key: string, value: any) => {
    Cookies.set(key, JSON.stringify(value), {expires: 7});
};

export const removeCookie = (key: string) => {
    Cookies.remove(key);
};
