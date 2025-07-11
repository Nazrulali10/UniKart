const express = require('express')
const sellerrouter = express.Router()
const sellerController = require('../controllers/sellerController')
const { authSeller } = require('../middlewares/authSeller')

sellerrouter.post('/login',sellerController.sellerLogin)
sellerrouter.post('/logout',sellerController.sellerLogout)
sellerrouter.post('/checkSellerAuth',authSeller,sellerController.checkSellerAuth)

module.exports = sellerrouter