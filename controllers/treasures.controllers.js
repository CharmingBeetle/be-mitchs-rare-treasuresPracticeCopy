const app = require("../app")
const { fetchTreasures } = require("../models/treasures.models")

const getTreasures = (request, response)=> {
    console.log('getTreasures controller')
    
    fetchTreasures()
    .then((treasures)=> {
        response.status(200).send({treasures})
    })
}


module.exports = { getTreasures }