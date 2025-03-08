const { fetchTreasures, fetchTreasuresById} = require("../models/treasures.models")

exports.getTreasures = (request, response,next)=> {
   const  { sort_by } = request.query
  
        fetchTreasures(null, sort_by)
        .then((treasures)=> {
            response.status(200).send({treasures})
        })
        .catch(next)
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

exports.getTreasuresByAscSort = (request, response,next)=> {
    const { sort_by } =req.query

    fetchTreasures(sort_by)
    .then((treasures)=> {
        response.status(200).send({treasures})
    })
    .catch((err)=> {
        next(err)
    })
}


