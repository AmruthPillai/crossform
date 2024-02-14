import { describe, expect, test } from 'vitest'

import { toFormData } from '../lib/to-formdata'
import { type Serializeable } from '../lib/types'
import { toObject } from '../lib/to-object'

describe('toObject', () => {
  const data = {
    string: 'string',
    emptyString: '',
    number: 123_456,
    boolean: true,
    null: null,
    date: new Date('2021-01-01'),
    file: new File([''], 'file.txt'),
    array: [1, 2, 3],
    object: {
      foo: 'bar',
      deeply: {
        nested: {
          foo: 'bar'
        }
      }
    }
  } satisfies Record<string, Serializeable>

  const formData = toFormData(data)

  test('returns the same object before/after serialization', () => {
    const result = toObject(formData)

    expect(result).toEqual(data)
    expect('undefined' in result).toEqual(false)
  })
})
