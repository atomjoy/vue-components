// Tu tylk funkcje i stałe nie typy !!
import type { Currency } from '@/types/shop';

const LOCALE_MAP: Record<Currency, string> = {
    PLN: 'pl-PL',
    USD: 'en-US',
    EUR: 'de-DE',
};

export function formatPrice(
    cents: number | null | undefined,
    currency: Currency = 'PLN',
): string {
    if (cents === null || cents === undefined) {
        return '';
    }

    return new Intl.NumberFormat(LOCALE_MAP[currency], {
        style: 'currency',
        currency,
    }).format(cents / 100);
}

export function fromCents(cents: number | null | undefined): number | '' {
    return cents !== null && cents !== undefined ? cents / 100 : '';
}
