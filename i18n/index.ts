import { en } from './en';
import { is } from './is';
import { da } from './da';
import { es } from './es';

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