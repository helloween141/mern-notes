const { Router } = require('express')
const router = Router()
const Note = require('../models/Note')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const auth = require('../middleware/auth.middleware')

router.post(
  '/add',
  auth,
  [
    check('title', 'Title can`t be empty!').notEmpty()
  ], 
  async(req, res) => {
  try {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status('400').json({
        errors: errors.array(),
        message: 'Error in creating note'
      })
    }
    const { title, text } = req.body
    console.log(req.user)
    const note = new Note({ title, text, owner: req.user.userId })
    
    await note.save()

    res.status(201).json({ note })
  } catch(e) {
    res.status(500).json({ message: 'Something wrong, try it again' })
  } 
})

router.post('/delete', auth, async (req, res) => {
  try {
      
      await Note.remove({'_id': req.body.id})

      return res.status(200).json({
        message: `Note with id ${req.body.id} successfully deleted`,
        success: true
      })

  } catch(e) {
    res.status(500).json({ message: 'Something wrong, try it again' })
  }
})

router.get('/', auth, async(req, res) => {
  try {
    const notes = await Note.find({ owner: req.user.userId })
    res.json(notes)
  } catch(e) {
    res.status(500).json({ message: 'Something wrong, try it again' })
  }
  
})

/*router.get('/:id', auth, async(req, res) => {
  try {
    const note = await Note.findById(req.params.id)
    res.json(note)
  } catch(e) {
    res.status(500).json({ message: 'Something wrong, try it again' })
  }
})*/

module.exports = router