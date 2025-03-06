const db = require("../db/connection")
const app = require("../app")

const fetchTreasures = () => {
    console.log("fetchTreasures model")
    return db.query(`SELECT * FROM treasures`)
    .then(({ rows })=> {
        console.log(rows)
        return rows
    })
}


module.exports = { fetchTreasures }