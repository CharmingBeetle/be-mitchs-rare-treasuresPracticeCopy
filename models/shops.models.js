const db = require("../db/connection")

exports.checkShopExists = (shop_id) => {
    console.log("Using shops.models checkShopExists with shop_id:", shop_id);
return db.query(`SELECT * FROM shops WHERE shop_id = $1`, [shop_id])
.then(({ rows })=> {
    if(rows.length === 0) {
        return Promise.reject({status: 404, msg: `Shop ${shop_id} not found`})
    }
    return rows[0]
})
}