const express = require('express')
const userController = require('../controllers/userController')
const { authUser } = require('../middlewares/authUser')

const router = express.Router()
router.post('/register',userController.Register)
router.post('/login',userController.Login)
router.get('/logout',authUser,userController.Logout)
router.get('/checkAuth',authUser,userController.checkAuth)

module.exports = router