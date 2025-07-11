const express = require("express");
const cartController = require('../controllers/cartController');
const { authUser } = require("../middlewares/authUser");

const cartrouter = express.Router()
cartrouter.post('/updatecart',authUser,cartController.updateCart)

module.exports = cartrouter
