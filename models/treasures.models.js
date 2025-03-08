const db = require("../db/connection")

exports.fetchTreasures = (treasure_id, sort_by= 'age', order="asc", colour) => {
    
    const validInputs =['age','cost_at_auction','treasure_name']


    if(!validInputs.includes(sort_by)) {
        return Promise.reject({ status: 400, msg: "Invalid input" });
    }
    let sqlQuery = 'SELECT * FROM treasures '
    const queryValues = []
        // const queryString = `SELECT * FROM treasures ORDER BY ${sort_by} ASC`;
    if(treasure_id) {
        sqlQuery += 'WHERE treasure_id = $1'
        queryValues.push(treasure_id)
    }
    if (sort_by) {
        sqlQuery += `ORDER BY ${sort_by} ${order.toUpperCase()};`
    }

    if(colour) {
        sqlQuery += `WHERE colour = $1`
        queryValues.push(colour)
    }
    return db.query(sqlQuery, queryValues)
    .then(({ rows })=> 
    {
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





