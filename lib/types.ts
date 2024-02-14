export type Serializeable =
  | string
  | number
  | boolean
  | null
  | undefined
  | Date
  | File
  | { [x: string | number]: Serializeable }
  | Serializeable[]
