const app = require("../app")
const { fetchTreasures, fetchTreasuresById } = require("../models/treasures.models")

exports.getTreasures = (request, response,next)=> {
    
    fetchTreasures()
    .then((treasures)=> {
        response.status(200).send({treasures})
    })
    .catch((err)=> {
        next(err)
    })
}

exports.getTreasuresById = (request, response, next)=> {
    const { treasure_id } = request.params
   
    fetchTreasuresById(treasure_id)
    .then((treasure)=> {
        response.status(200).send({treasure})
    })
    .catch((err) => {
        next(err)
    })
}

//const {age,cost_at_auction,treasure_name} = request.params

//fetchTreasureByKey(age,cost_at_auction,treasure_name)
//.then(tresureKey)=>{
//response.status(200).send(trea)
//}

//model

