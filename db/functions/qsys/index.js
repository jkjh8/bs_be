import Qsys from '../../models/qsys'

const qsysFind = async (args) => {
  return await Qsys.find(args)
}

const qsysMake = async (args) => {
  return await Qsys.create(args)
}

const qsysUpdate = async (args) => {
  return await Qsys.findOneAndUpdate(args)
}

const qsysRemovebyId = async (id) => {
  return await Qsys.findByIdAndDelete(id)
}

export { qsysMake, qsysFind, qsysUpdate, qsysRemovebyId }
