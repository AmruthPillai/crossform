# Crossform

A tiny typescript-first utility library to convert [JavaScript Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) to [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData), and handle conversions the other way around.

**The library exposes two functions:**

### `toFormData(data: Object)`

Accepts any serializable object and returns a flattened FormData instance.

### `toObject(formData: FormData)`

Accepts a FormData instance and returns an object parsed from the original format.
