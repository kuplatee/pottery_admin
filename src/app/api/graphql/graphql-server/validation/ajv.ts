import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import addErrors from 'ajv-errors'

const ajv = new Ajv({
  allErrors: true,
  strict: true,
})

addFormats(ajv)
addErrors(ajv)

export { ajv }
