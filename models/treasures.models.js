const db = require("../db/connection")
const { getTreasures, getTreasuresById, getTreasuresByAge} = require("../controllers/treasures.controllers")
const app = require("../app")

exports.fetchTreasures = () => {
    return db.query(`SELECT * FROM treasures ORDER BY age ASC `)
    .then(({ rows })=> {
        // console.log(rows)
        return rows
    })
}
exports.fetchTreasuresById = (treasure_id) => {
    return db.query(`SELECT * FROM treasures WHERE treasure_id =$1`, [treasure_id])
    .then(({ rows })=> {
        if (!rows.length) {
            return Promise.reject({ status: 404, msg: "treasure not found!" });
        }
        return rows[0]
    })
}


exports.fetchTreasureByKey = (treasureKey) => {

    const allowedInputs =[age,cost_at_auction,treasure_name]
    let queryString = ('SELECT FROM treasures ')
    return db.query(`SELECT * FROM treasures WHERE treasure_id =$1`, [treasureKey])
    .then(({ rows })=> {
        if (rows.length === 0) {
            return Promise.reject({ status: 404, msg: "Treasure not found" });
        }
        // console.log(rows, "<<<< BY ID")
        return rows[0]
    })
}





// exports.fetchTreasuresByAge= (age) => {
//     console.log("fetchages model")
//     return db.query(`SELECT * FROM treasures ORDER BY age ASC`, [age])
//     .then(({ rows })=> {
//         if (rows.length === 0) {
//             return Promise.reject({ status: 404, msg: "Treasure not found" });
//         }
//         return rows[0]
//     })
// }
// exports.fetchTreasuresByCost= (cost) => {
//     console.log("fetchages model")
//     return db.query(`SELECT * FROM treasures WHERE cost_at_auction =$1`, [cost])
//     .then(({ rows })=> {
//         if (rows.length === 0) {
//             return Promise.reject({ status: 404, msg: "Treasure not found" });
//         }
//         console.log(rows, "<<<<<BY COST")
//         return rows[0]
//     })
// }