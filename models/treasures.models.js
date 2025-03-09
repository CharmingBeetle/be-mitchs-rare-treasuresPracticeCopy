const db = require("../db/connection")
const { checkShopExists } = require("./shops.models")

exports.fetchTreasures = (treasure_id, sort_by='age', order="asc", colour=null) => {
    
    const validInputs =['age','cost_at_auction','treasure_name']
    const validOrders = ["desc", "asc"]
    const validColours =   [
        'magenta', 'khaki',     'ivory',
        'silver',  'burgundy',  'gold',
        'mikado',  'gold',      'carmine',
        'silver',  'magenta',   'turquoise',
        'saffron', 'magenta',   'saffron',
        'onyx',    'carmine',   'burgundy',
        'cobalt',  'silver',    'ivory',
        'azure',   'turquoise', 'cobalt',
        'mikado',  'onyx'
      ]

    if(!validInputs.includes(sort_by)) {
        return Promise.reject({ status: 400, msg: "Invalid input" });
    }
    if(!validOrders.includes(order)) {
        return Promise.reject({ status: 400, msg: "Invalid order" });
    }
    if(colour!==null && !validColours.includes(colour)) {
        return Promise.reject({ status: 400, msg: "Invalid colour" });
    }
    let sqlQuery = 'SELECT * FROM treasures '
    const queryValues = []

        if(treasure_id) {
            sqlQuery += 'WHERE treasure_id = $1 '
            queryValues.push(treasure_id)
        }
        if(colour) {
            if(queryValues.length > 0) {
                sqlQuery += 'AND '
            } else {
                sqlQuery += 'WHERE '
            }
            sqlQuery += `colour = $${queryValues.length+1} `
            queryValues.push(colour)
        }
        if (sort_by) {
            sqlQuery += `ORDER BY ${sort_by} ${order.toUpperCase()};`
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


exports.createNewTreasure = (treasure_name, colour, age, cost_at_auction, shop_id) => {

    if(!treasure_name || !colour || !age || !cost_at_auction ||!shop_id) {
        return Promise.reject({ status: 400, msg: "Missing fields" 

        });
    }
    if(typeof treasure_name !== 'string' || typeof colour !== 'string'){
        return Promise.reject({ status: 400, msg: "Wrong data type." 
    })
    }
    if(typeof age !== 'number' || typeof cost_at_auction !== 'number' || typeof shop_id !== "number"){
        return Promise.reject({ status: 400, msg: "Wrong data type.Must be a number" 
    })
    }
    
    return db.query(`
        INSERT INTO treasures
        (treasure_name, 
        colour, 
        age, 
        cost_at_auction, 
        shop_id) 
        VALUES
        ($1, $2, $3, $4, $5) RETURNING*`, [treasure_name, colour, age, cost_at_auction, shop_id])
        .then(({rows})=> {
            return rows[0]
            })
        }
    
// exports.fetchTreasuresByShopId = (shop_id) => {
//     retur
// }