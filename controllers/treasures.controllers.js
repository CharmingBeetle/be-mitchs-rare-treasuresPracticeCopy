// const app = require("../app")
const { fetchTreasures, fetchTreasuresById } = require("../models/treasures.models")

exports.getTreasures = (request, response)=> {
    console.log('getTreasures controller')
    
    fetchTreasures()
    .then((treasures)=> {
        response.status(200).send({treasures})
    })
}

exports.getTreasuresById = (request, response, next)=> {
    console.log('getTreasures controller')
    const { treasure_id } = request.params
   

    fetchTreasuresById(treasure_id)
    .then((treasure)=> {
        response.status(200).send({treasure})
    })
    .catch(next)
}

exports.getTreasuresByAge = (request, response, next)=> {
    const { age } = request.params
    console.log(Object.keys(request.params), "<<<<<< REQUEST KEYS ")
    fetchTreasuresByAge(age)
    .then((treasure)=> {
        response.status(200).send({treasure})
    })
    .catch(next)
}



