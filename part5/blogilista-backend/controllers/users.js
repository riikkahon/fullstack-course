const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')


userRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1 })
  response.json(users)
})

userRouter.post('/', async (request, response) => {
  const body = request.body

  if(body.password.length < 3){
    return response.status(400).json({ error: 'User validation failed: username: Path password is shorter than the minimum allowed length (3)'})
  }
    
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)
 
  const user = new User ({
    username: body.username,
    name: body.name,
    passwordHash
  })

   
  const savedUser = await user.save()
  response.status(201).json(savedUser)
    
})

userRouter.delete('/:id', async (request, response) => {
  await User.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = userRouter