const express = require('express')
const router = express.Router()

const  { 
    getCompetitions,
    getCompetition,
    createCompetition,
    updateCompetition,
    deleteCompetition 
} = require('../controllers/assignements.js')

router.get('/', getCompetitions)

router.get('/:id', getCompetition)

router.post('/', createCompetition) 

router.put('/:id', updateCompetition) 

router.delete('/:id', deleteCompetition)

module.exports = router