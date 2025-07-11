const express = require('express')
const productController = require('../controllers/productController')
const upload = require('../configs/multer')
const { authSeller } = require('../middlewares/authSeller')

const productrouter = express.Router()
productrouter.post('/addproduct',upload.array(["images"]),authSeller,productController.addProduct)
productrouter.get('/productslist',productController.productList)
productrouter.get('/productbyid',productController.productById)
productrouter.post('/stock',authSeller,productController.changeStock)

module.exports = productrouter