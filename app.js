const express = require('express')
const app = express()
const { getTreasures , getTreasuresById, postTreasure } = require("./controllers/treasures.controllers")
const { handlePsqlErrors, 
    handleServerErrors, 
    handleCustomErrors 
} = require('./controllers/errors.controllers')

app.use(express.json())

//SERVER STATUS
app.get("/api", (_,res)=> {
    res.status(200).send({msg:"Server running ok."})
})
//GET
app.get("/api/treasures", getTreasures)

app.get("/api/treasures/:treasure_id", getTreasuresById)
// app.get("/api/treasures/:shop_id")

//POST
app.post("/api/treasures", postTreasure)


//ERROR HANDLING
//catch all for any method and route not matched above
app.all('*', (req, res) => {
    res.status(404).send({msg: "path not found!"})
})
app.use(handlePsqlErrors);

app.use(handleCustomErrors);

app.use(handleServerErrors); //last piece in the chain

module.exports = app