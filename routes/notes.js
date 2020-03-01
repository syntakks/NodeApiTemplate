const auth = require('../middleware/authorize')
const admin = require('../middleware/admin')
const dbDebugger = require('debug')('app:db')
const { Note, validate } = require('../models/note')
const express = require('express')
const router = express.Router()
const asyncMiddleware = require('../middleware/async')

// Web Methods======================================================================

// GET All Notes
router.get('/', auth, asyncMiddleware(async (req, res) => {
    dbDebugger('GET All Notes:')
    const notes = await Note.find().sort('title')
    dbDebugger(notes)
    res.send(notes)
}))

// GET Pagination
router.get('/:pageNumber/:pageSize', auth, asyncMiddleware(async (req, res) => {
    dbDebugger('GET Paginated Notes:')
    const pageNumber = parseInt(req.params.pageNumber)
    const pageSize = parseInt(req.params.pageSize)
    const notes = await Note
    .find()
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    return res.send(notes)
}))

// GET Note By ID
router.get('/:id', auth,  asyncMiddleware(async (req, res) => {
    dbDebugger('GET Note by ID:')
    const note = await Note.findById(req.params.id)
    if (!note){
        dbDebugger('ERROR: (404) The note with the given ID was not found...')
        return res.status(404).send('The note with Given ID was not found.')
    } 
    dbDebugger(note)
    return res.send(note)
}))

// POST Create Note
router.post('/', auth, asyncMiddleware(async (req, res) => {
    dbDebugger('POST Creating Note in Database...')
    const { error, value } = validate(req.body)
    if (error) {
        dbDebugger('--ERROR: (400) Bad Request...' + error.message)
        return res.status(400).send(error.message)
    } 
    let note = new Note({ title: req.body.title, content: req.body.content })
    note = await note.save()
    dbDebugger(note)
    return res.send(note)
}))

// PUT Update Note
router.put('/:id', auth, asyncMiddleware(async (req, res) => {
    dbDebugger('PUT Updating Note...')
    const { error, value } = validate(req.body)
    if (error) {
        dbDebugger('--ERROR: (400) Bad Request...' + error.message)
        return res.status(400).send(error.message)
    } 
    const note = await Note.findByIdAndUpdate(
        req.params.id,
        { title: req.body.title, content: req.body.content, $inc: { __v: 1 } }, 
        { new: true }
    )
    if (!note){
        dbDebugger('--ERROR: (404) The note with the given ID was not found...')
        return res.status(404).send('The note with Given ID was not found.')
    } 
    dbDebugger(note)
    return res.send(note)
}))

// DELETE Remove Note
router.delete('/:id', auth, asyncMiddleware(async (req, res) => {
    dbDebugger('DELETE Deleting Note')
    const note = await Note.findByIdAndRemove(req.params.id)
    if (!note){
        dbDebugger('--ERROR: (404) The note with the given ID was not found...')
        return res.status(404).send('The note with Given ID was not found.')
    }
    dbDebugger(note)
    return res.send(note)
}))

module.exports = router