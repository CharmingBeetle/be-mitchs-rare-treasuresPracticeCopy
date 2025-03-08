const express = require('express')
const app = express()
const { getTreasures , getTreasuresById, getTreasuresByAscSort } = require("./controllers/treasures.controllers")
const { handlePsqlErrors, 
    handleServerErrors, 
    handleCustomErrors 
} = require('./controllers/errors.controllers')


app.use(express.json())

app.get("/api", (_,res)=> {
    res.status(200).send({msg:"Server running ok."})
})

app.get("/api/treasures", getTreasures)

app.get("/api/treasures/:treasure_id", getTreasuresById)



//catch all for any method and route not matched above
app.all('*', (req, res) => {
    res.status(404).send({msg: "path not found!"})
})
app.use(handlePsqlErrors);

app.use(handleCustomErrors);

app.use(handleServerErrors); //last piece in the chain

module.exports = app