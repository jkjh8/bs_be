import User from '../../models/user'

async function makeUser(args) {
  return await User.create(args)
}

async function userFind(args) {
  return await User.find(args)
}

async function userFindOne(args) {
  return await User.findOne(args)
}

export { makeUser, userFind, userFindOne }
