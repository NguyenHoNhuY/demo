const express = require("express");
const productApi = require("../api/api.product");
const router = express.Router();
//get all products
router.get("/", async function (req, res) {
    let options = {
        page: 1,
        per_page: 10,
    };

    //todo check req.query is empty
    if (Object.keys(req.query).length !== 0) {
        options = {
            page: parseInt(req.query.page),
            per_page: 10,
        };
    }
    const products = await productApi.getAllProducts(options);
    return res.status(200).json({
        message: "Success",
        length: products.length,
        data: products,
        page: options.page,
    });
});
//get product by id
router.get("/:id", async function (req, res) {
    const productId = req.params.id * 1;
    const product = await productApi.getProductById(productId);
    return res.status(200).json({
        message: "Success",
        data: product,
    });
});
// update regular price or stock_quantity
router.put("/:productId", async function (req, res) {
    const { regular_price = "", stock_quantity = "" } = req.body;
    const options = {
        regular_price: regular_price,
        stock_quantity: stock_quantity,
    };
    const productId = req.params.productId * 1;
    const updatedProduct = await productApi.updateProduct(productId, options);
    return res.status(200).json({
        message: "Success",
        data: updatedProduct,
    });
});
router.delete("/:productId", async function (req, res) {
    const productId = req.params.productId * 1;
    const deletedProduct = await productApi.deleteProduct(productId);
    return res.status(200).json({
        message: "Delete Product Successfully",
        data: deletedProduct,
    });
});
module.exports = router;
