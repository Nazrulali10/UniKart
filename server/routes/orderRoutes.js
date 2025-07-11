const express = require('express')
const orderrouter = express.Router()
const orderController = require('../controllers/orderController')
const { authSeller } = require('../middlewares/authSeller')
const { authUser } = require('../middlewares/authUser')

orderrouter.post('/placeordercod',authUser,orderController.placeOrderCOD)
orderrouter.get('/getuserorders',authUser,orderController.getUserOrders)
orderrouter.get('/getallorders',authSeller,orderController.getAllOrders)

module.exports = orderrouter