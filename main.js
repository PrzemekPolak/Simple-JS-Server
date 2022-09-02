const http = require("http")
var express = require('express')
var utilsLib = require('./utils.js')

var app = express()

const host = 'localhost'
const port = 9000

// Home page
app.get('/', function(req, res) {
    res.status(200).send(`Sample queries:<br>
    <a href="http://localhost:9000/productElements/chair/5">http://localhost:9000/productElements/chair/5</a><br>
    <a href="http://localhost:9000/productElementNeededNumber/chair/leg">http://localhost:9000/productElementNeededNumber/chair/leg</a><br>
    <a href="http://localhost:9000/productionTime/table">http://localhost:9000/productionTime/table</a><br>`)
})

// Returns json with list of elements needed for specified amount of products.
// If amount not defined or 0, return for default amount set to 1
// E.g. http://localhost:9000/productElements/chair/5
app.get('/productElements/:product/:amount?', function(req, res) {
    var elements = utilsLib.getProduct(req.params.product, res)['elements']
    var productAmount = req.params.amount

    if (/^[0-9]+$/.test(productAmount) === false && productAmount !== undefined) {
        return res.status(500).json("Inncorect product amount")
    }
    else {
        productAmount = parseInt(productAmount)
    }

    if (productAmount > 0) {
        var result = {}
        for (var x in elements) {
            result[x] = elements[x] * productAmount
        }
        res.status(200).json(result)
    }
    else {
        res.status(200).json(elements)
    }
})

// Returns the number of pieces of the specified element needed for the product
// E.g. http://localhost:9000/productElementNeededNumber/chair/leg
app.get('/productElementNeededNumber/:product/:element', function(req, res) {
    var product = utilsLib.getProduct(req.params.product, res)
    var neededNumber = utilsLib.getElement(product, req.params.element, res)
    res.status(200).json(neededNumber)
})

// Return production time of the product
// E.g. http://localhost:9000/productionTime/table
app.get('/productionTime/:product', function(req, res) {
    var product = utilsLib.getProduct(req.params.product, res)
    var productionTime = product.time
    res.status(200).json(productionTime)
})

const server = http.createServer(app)
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`)
})
