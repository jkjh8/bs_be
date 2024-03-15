import User from '../../models/user'

async function makeUser(args) {
  return await User.create(args)
}

async function userFind(args) {
  return await User.find(args)
}

function userFindOne(args) {
  return new Promise((resolve, reject) => {
    User.findOne(args)
      .then((doc) => {
        resolve(doc)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

const userUpdate = async (filter, value) => {
  return await User.updateOne(filter, value)
}

export { makeUser, userFind, userFindOne, userUpdate }
