const db = require("../db/connection")
const app =require("../app")
const seed=require('../db/seed')
const data = require("../db/data/test-data")
const request = require("supertest")


beforeEach(()=> {
    return seed(data)
})
afterAll(()=> {
    return db.end()
})
describe("/api/treasures", () => {
    describe("GET", () => {
        test("200: Tests whether we receive an object of all treasures requested",() => {
            return request(app)
            .get("/api/treasures")
            .expect(200)
            .then((response) => {
                const treasures = response.body.treasures
                expect(treasures.length).toBeGreaterThan(0)
                treasures.forEach((treasure)=> {  
                    expect(typeof treasure.treasure_id).toBe("number");
                    expect(typeof treasure.treasure_name).toBe("string");
                    expect(typeof treasure.colour).toBe("string");
                    expect(typeof treasure.age).toBe("number");
                    expect(typeof treasure.cost_at_auction).toBe("number");
                    expect(typeof treasure.shop_name).toBe("string");
                })
            })
        })

    })
})