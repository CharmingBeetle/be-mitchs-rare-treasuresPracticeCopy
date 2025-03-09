const { fetchTreasures, fetchTreasuresById, fetchTreasuresByShopId, createNewTreasure} = require("../models/treasures.models")
const { checkShopExists } = require("../models/shops.models")

exports.getTreasures = (request, response,next)=> {
   const  { sort_by, order, colour } = request.query
   const { treasure_id } = request.params
  
        fetchTreasures(treasure_id, sort_by, order, colour)
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


exports.postTreasure = (request, response, next) => {
    const { treasure_name, colour, age, cost_at_auction, shop_id } = request.body

 checkShopExists(shop_id)
    .then(()=> {

        return createNewTreasure(treasure_name, colour, age, cost_at_auction, shop_id )
        })
        .then((newTreasure)=> {
            response.status(201).send({treasure: newTreasure})
        })
        .catch((err)=> {
            console.log("Controller error:", err)
            next(err)
        })

}

// } 
// exports.getTreasuresByShopId = (request, response, next) => {
//     const { shop_id } = request.query
// //invoke cat model here
// const promises = [fetchTreasuresByShopId(shop_id)]
//     if(shop_id) {
//         promises.push(checkShopExists(shop_id))
//     }
//     Promise.all(promises)
//     .then((resolvedPromises)=> {
//         console.log(resolvedPromises)
//     })
//     .catch(next)
//     }




