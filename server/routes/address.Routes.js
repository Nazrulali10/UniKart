const express = require('express')
const addressController = require('../controllers/addressController')
const { authUser } = require('../middlewares/authUser')

const addressrouter = express.Router()
addressrouter.post('/addaddress',authUser,addressController.addAddress)
addressrouter.get('/getaddress',authUser,addressController.getAddress)

module.exports = addressrouter