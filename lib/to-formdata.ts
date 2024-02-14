import { type Serializeable } from './types'

export const toFormData = (
  data: Serializeable,
  parentKey = '',
  formData: FormData = new FormData()
): FormData => {
  if (typeof data === 'string') {
    formData.append(parentKey, data)
  } else if (typeof data === 'number') {
    formData.append(parentKey, data.toString())
  } else if (typeof data === 'boolean') {
    formData.append(parentKey, data ? 'true' : 'false')
  } else if (data === null) {
    formData.append(parentKey, 'null')
  } else if (data instanceof Date) {
    formData.append(parentKey, data.toISOString())
  } else if (data instanceof File) {
    formData.append(parentKey, data)
  } else if (data === undefined) {
    // Skip appending property if undefined
  } else {
    for (const entry of Object.entries(data)) {
      const [key, value] = entry
      toFormData(
        value,
        parentKey !== '' ? `${parentKey}[${key}]` : key.toString(),
        formData
      )
    }
  }

  return formData
}
