import { en, type Dictionary } from './en'
import { id } from './id'
import { zh } from './zh'
import { defaultLocale, isLocale, type Locale } from './config'

export type { Dictionary }

const dictionaries: Record<Locale, Dictionary> = { en, id, zh }

export const getDictionary = (locale: unknown): Dictionary => dictionaries[isLocale(locale) ? locale : defaultLocale]
