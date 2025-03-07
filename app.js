const express = require('express')
const app = express()
const { getTreasures , getTreasuresById } = require("./controllers/treasures.controllers")
app.use(express.json())

app.get("/api/treasures", getTreasures)

app.get("/api/treasures/:treasure_id", getTreasuresById)

//app.get("/api/treasures?sort_by=age", getTreasuresByAge)


module.exports = app