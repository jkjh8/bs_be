import Qsys from '../../models/qsys'

const qsysFind = async (args) => {
  return await Qsys.find(args)
}

const qsysMake = async (args) => {
  const doc = new Qsys({ ...args })
  return await doc.save()
}

const qsysUpdate = async (filter, value) => {
  return await Qsys.updateOne(filter, value)
}

const qsysRemovebyId = async (id) => {
  return await Qsys.findByIdAndDelete(id)
}

const qsysExists = async (args) => {
  return await Qsys.exists({ ...args })
}

const qsysFindOne = (args) => {
  return new Promise((resolve, reject) => {
    Qsys.findOne(args)
      .then((doc) => {
        resolve(doc)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export {
  qsysMake,
  qsysFind,
  qsysUpdate,
  qsysRemovebyId,
  qsysExists,
  qsysFindOne
}
