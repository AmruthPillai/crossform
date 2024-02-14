import { describe, expect, test } from 'vitest'

import { type Serializeable } from '../lib/types'
import { toFormData } from '../lib/to-formdata'

describe('toFormData', () => {
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

  test('returns a valid form data from an object', () => {
    expect(formData.get('string')).toBe(data.string)
    expect(formData.get('emptyString')).toBe(data.emptyString)
    expect(formData.get('number')).toBe(data.number.toString())
    expect(formData.get('boolean')).toBe(data.boolean.toString())
    expect(formData.get('null')).toBe('null')
    expect(formData.get('date')).toBe(data.date.toISOString())
    expect(formData.get('file')).toBe(data.file)
    expect(formData.get('array[0]')).toBe(data.array[0].toString())
    expect(formData.get('array[1]')).toBe(data.array[1].toString())
    expect(formData.get('array[2]')).toBe(data.array[2].toString())
    expect(formData.get('object[foo]')).toBe(data.object.foo)
    expect(formData.get('object[deeply][nested][foo]')).toBe(
      data.object.deeply.nested.foo
    )
  })
})
