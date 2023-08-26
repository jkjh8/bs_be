/** @format */

import Hangul from 'hangul-js'

const searchArrToStr = (arr) => {
  return Hangul.disassembleToString(arr.join('#').replace(/ /g, ''))
}

const makeSearchField = (schema, searchField, getter) => {
  schema.pre('save', function () {
    this[searchField] = getter(this)
  })
  schema.post('updateOne', async function () {
    const docUpated = await this.model.findOne(this.getFilter())
    if (docUpated) await docUpated.save()
  })
}

export { searchArrToStr, makeSearchField }
