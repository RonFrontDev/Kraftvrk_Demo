import { en } from './en';
import { is } from './is';
import { da } from './da';
import { es } from './es';

// This represents the structure of the object for each language
export interface LanguageTranslations {
  geminiLang: string;
  langCode: string;
  [key: string]: any; // For all other nested translation keys
}

// FIX: The broad type annotation `{ [key: string]: LanguageTranslations }` caused `keyof typeof translations` to be `string | number`.
// By removing it, TypeScript correctly infers the keys as a union of string literals, making the `isLanguageCode` type predicate valid.
export const translations = {
  en,
  is,
  da,
  es,
};

export type LanguageCode = keyof typeof translations;

export const languages: { code: LanguageCode; name: string }[] = [
  { code: 'en', name: 'English' },
  { code: 'is', name: 'Íslenska' },
  { code: 'da', name: 'Dansk' },
  { code: 'es', name: 'Español' },
];

export function isLanguageCode(code: string): code is LanguageCode {
  return code in translations;
}