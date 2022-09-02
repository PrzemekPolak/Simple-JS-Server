var fs = require('fs')

const productsData = JSON.parse(fs.readFileSync('./products.json', 'utf8'))

function getProduct(productName, res) {
    if (productsData[productName] === undefined) {
        return res.status(500).json("There is no product with this name")
    }
    else {
        return productsData[productName]
    }
}

function getElement(product, element, res) {
    if (product['elements'][element] === undefined) {
        res.status(500).json("There is no element with this name")
    }
    else {
        return product['elements'][element]
    }
}

module.exports = { getProduct, getElement }