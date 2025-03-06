const express = require('express')
const app = express()
const { getTreasures , getTreasuresById, getTreasuresByAge, getTreasuresByCost } = require("./controllers/treasures.controllers")
app.use(express.json())

app.get("/api/treasures", getTreasures)

app.get("/api/treasures/:treasure_id", getTreasuresById)

// app.get("/api/treasures/treasure_name", getNames)

// app.get("/api/treasures/colour", getColours)

app.get("/api/treasures/:age", getTreasuresByAge)

// app.get("/api/treasures/cost_at_auction", getAuctionCosts)

// app.get("/api/treasures/shop_name", getShopNames)

module.exports = app