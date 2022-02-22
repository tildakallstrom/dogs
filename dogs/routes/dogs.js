const express = require('express')
const router = express.Router()
const Dog = require('../models/dog');


//Getting all
router.get('/', async (req, res) => {
  try {
      const dogs = await Dog.find()
      res.json(dogs)

  } catch(err) {
      res.status(500).json({ message: err.message })

  }
})

//Getting one
router.get('/:id', getDog, (req, res) => {
 res.json(res.dog)
})

//Creating one
router.post('/', async (req, res) => {
    const dog = new Dog({
    name: req.body.name,
    breed: req.body.breed,
    age: req.body.age,
    sex: req.body.sex,
    merits: req.body.merits,
    father: req.body.father,
    mother: req.body.mother

    })
 try {
   const newDog = await dog.save()
   res.status(201).json(newDog)
 } catch(err) {
   res.status(400).json({ message: err.message })
 }
    
})

//Updating one
router.put('/:id', getDog, async (req, res) => {
if (req.body.name != null) {
    res.dog.name = req.body.name
} 
if (req.body.breed != null) {
    res.dog.breed = req.body.breed
} 
if (req.body.age != null) {
  res.dog.age = req.body.age
} 
if (req.body.sex != null) {
  res.dog.sex = req.body.sex
} 
if (req.body.merits != null) {
  res.dog.merits = req.body.merits
} 
if (req.body.father != null) {
  res.dog.father = req.body.father
} 
if (req.body.mother != null) {
  res.dog.mother = req.body.mother
} 

try {
const updatedDog = await res.dog.save()
res.json(updatedDog)
} catch(err) {
 res.status(400).json({ message: err.message })
}

    
})

//Deleting one
router.delete('/:id', getDog, async (req, res) => {
    try {
      await res.dog.remove()
      res.json({ message: 'Dog Deleted' })
    } catch(err) {
      res.status(500).json({ message: err.message })
    }

})

async function getDog(req, res, next) {
    let dog
  try {
    dog = await Dog.findById(req.params.id)
    if (dog == null) {
        return res.status(404).json({ message: 'Cannot find dog' })
    }
  } catch(err) {
    return res.status(500).json({ message: err.message })
  }

  res.dog = dog
  next()
}


module.exports = router