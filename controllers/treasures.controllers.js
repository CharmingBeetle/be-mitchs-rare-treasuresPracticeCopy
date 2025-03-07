const app = require("../app")
const { fetchTreasures, fetchTreasuresById, fetchTreasuresByAge, fetchTreasuresByCost } = require("../models/treasures.models")

exports.getTreasures = (request, response)=> {
    
    fetchTreasures()
    .then((treasures)=> {
        response.status(200).send({treasures})
    })
}

exports.getTreasuresById = (request, response, next)=> {
    const { treasure_id } = request.params
   
    fetchTreasuresById(treasure_id)
    .then((treasure)=> {
        response.status(200).send({treasure})
    })
    .catch(next)
}

// exports.getTreasuresByAge = (request, response, next)=> {
//     const { age } = request.params
//     fetchTreasuresByAge(age)
//     .then((treasure)=> {
//         response.status(200).send({treasure})
//     })
//     .catch(next)
// }

// exports.getTreasuresByCost = (request, response, next)=> {
//     console.log("cost controller")
//     console.log(request.params, "<<<<<< REQUEST KEYS ")
//     const { cost } = request.params
//     fetchTreasuresByAge(age)
//     .then((treasure)=> {
//         response.status(200).send({treasure})
//     })
//     .catch(next)
// }


