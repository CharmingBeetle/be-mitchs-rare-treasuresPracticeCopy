const db = require("../db/connection")
const { getTreasures, getTreasuresById } = require("../controllers/treasures.controllers")
const app = require("../app")

exports.fetchTreasures = () => {
    console.log("fetchTreasures model")
    return db.query(`SELECT * FROM treasures ORDER BY age ASC `)
    .then(({ rows })=> {
        // console.log(rows)
        return rows
    })
}
exports.fetchTreasuresById = (treasure_id) => {
    console.log("fetchTreasuresByID model")
    return db.query(`SELECT * FROM treasures WHERE treasure_id =$1`, [treasure_id])
    .then(({ rows })=> {
        if (rows.length === 0) {
            return Promise.reject({ status: 404, msg: "Treasure not found" });
        }
        // console.log(rows, "<<<< BY ID")
        return rows[0]
    })
}
exports.fetchTreasuresByAge= (age) => {
    console.log("fetchTreasuresByAge model")
    return db.query(`SELECT * FROM treasures WHERE age =$1`, [age])
    .then(({ rows })=> {
        if (rows.length === 0) {
            return Promise.reject({ status: 404, msg: "Treasure not found" });
        }
        console.log(rows, "<<<<<BY AGE")
        return rows[0]
    })
}
