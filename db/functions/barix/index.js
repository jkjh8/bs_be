import Barix from '../../models/barix'

const barixFind = async (args) => {
  return await Barix.find(args)
}

const barixMake = async (args) => {
  const doc = new Barix({ ...args })
  return await doc.save()
}

const barixUpdate = async (filter, value) => {
  return await Barix.updateOne(filter, value, { upsert: true })
}

const barixRemoveById = async (id) => {
  return await Barix.findByIdAndDelete(id)
}

const barixExists = async (args) => {
  return await Barix.exists(args)
}

const barixFindOne = (args) => {
  return new Promise((resolve, reject) => {
    Barix.findOne(args)
      .then((doc) => {
        resolve(doc)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export {
  barixMake,
  barixFind,
  barixFindOne,
  barixUpdate,
  barixExists,
  barixRemoveById
}
