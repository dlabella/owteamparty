const express = require('express')
const router = express.Router()

const  { 
    getChallenges,
    getChallenge,
    createChallenge,
    updateChallenge,
    deleteChallenge 
} = require('../controllers/challenges.js')

router.get('/', getChallenges)

router.get('/:id', getChallenge)

router.post('/', createChallenge) 

router.put('/:id', updateChallenge) 

router.delete('/:id', deleteChallenge)

module.exports = router