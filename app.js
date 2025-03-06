const express = require('express')
const app = express()
const { getTreasures } = require("./controllers/treasures.controllers")
app.use(express.json())

app.get("/api/treasures", getTreasures)
// app.get("./api/treasures/treasure_id", getTreasureId)
//     // const treasure_id = req.params.treasure_id
//     // console.log(req.params)
//     // return db.query(`SELECT * FROM treasures WHERE `)


// app.get("/api/treasures/treasure_name", getNames)

// app.get("/api/treasures/colour", getColours)

// app.get("/api/treasures/age", getAges)

// app.get("/api/treasures/cost_at_auction", getAuctionCosts)

// app.get("/api/treasures/shop_name", getShopNames)







module.exports = app