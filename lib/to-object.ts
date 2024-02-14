import { type Serializeable } from './types'

const isoDateFormatRegex =
  /^\d{4}-(?:0[1-9]|1[0-2])-(?:[0-2][1-9]|[1-3]0|3[01])T(?:[01]\d|2[0-3])(?::[0-6]\d){1,2}(?:\.\d{3})?(?:[+-][0-2]\d:[0-5]\d|Z)?$/

export const toObject = (formData: FormData): Record<string, Serializeable> => {
  const result: Record<string, Serializeable> = {}

  for (const [key, value] of formData.entries()) {
    const keys = key.split('[').map((k) => k.replace(']', ''))
    const lastKeyIndex = keys.length - 1

    let object: Record<string, Serializeable> = result

    for (let index = 0; index < keys.length; index++) {
      const key = keys[index]

      if (index === lastKeyIndex) {
        if (typeof value === 'string' && isoDateFormatRegex.test(value)) {
          object[key] = new Date(value)
        } else if (
          typeof value === 'string' &&
          !Number.isNaN(Number.parseFloat(value))
        ) {
          object[key] = Number(value)
        } else if (value === 'true' || value === 'false') {
          object[key] = value === 'true'
        } else if (value === 'null') {
          object[key] = null
        } else {
          object[key] = value
        }
      } else {
        if (!(key in object)) {
          object[key] = Number.isNaN(Number(keys[index + 1])) ? {} : []
        }

        object = object[key] as Record<string, Serializeable>
      }
    }
  }

  return result
}
