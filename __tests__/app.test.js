const db = require("../db/connection")
const app =require("../app")
const seed=require('../db/seed')
const data = require("../db/data/test-data")
const request = require("supertest")
const express = require("express")
app.use(express.json())

beforeEach(()=> {
    return seed(data)
})
afterAll(()=> {
    return db.end()
})

describe("GET: /api/treasures", () => {
 
        test("200: Returns with an array of objects of all treasures requested",() => {
            return request(app)
            .get("/api/treasures")
            .expect(200)
            .then(({body}) => {
                const treasures = body.treasures
                console.log(treasures, "<<<TREASURES")
                expect(treasures.length).toBeGreaterThan(0)
                treasures.forEach((treasure)=> {  
                    expect(typeof treasure.treasure_id).toBe("number");
                    expect(typeof treasure.treasure_name).toBe("string");
                    expect(typeof treasure.colour).toBe("string");
                    expect(typeof treasure.age).toBe("number");
                    expect(typeof treasure.cost_at_auction).toBe("number");
                    expect(typeof treasure.shop_id).toBe("number");
                })
            })
        })
        test("200: Returns an array of objects sorted by age in ascending order",() => {
            return request(app)
            .get("/api/treasures")
            .expect(200)
            .then(({ body }) => {
                const treasures = body.treasures //array of object items
                    const firstTreasure = treasures[0]
                    const lastTreasure = treasures[treasures.length-1]
                    expect(lastTreasure.age).toBeGreaterThan(firstTreasure.age)
                    expect(treasures.length).toBeGreaterThan(0)

                    treasures.forEach((treasure)=> {  
                        expect(typeof treasure.treasure_id).toBe("number");
                        expect(typeof treasure.treasure_name).toBe("string");
                        expect(typeof treasure.colour).toBe("string");
                        expect(typeof treasure.age).toBe("number");
                        expect(typeof treasure.cost_at_auction).toBe("number");
                        expect(typeof treasure.shop_id).toBe("number");
                    })
                })
            })
describe("GET: /api/treasures/:treasure_id", () => {
        test("200: Tests whether we receive an individual object with the requested ID",() => {
            return request(app)
            .get('/api/treasures/12')
            .expect(200)
            .then(({ body }) => {
                    const treasure = body.treasure //indiv object item
                    console.log(treasure, "<<<<individual TREASURE")
                        expect(treasure.treasure_id).toBe(12);
                        expect(typeof treasure.treasure_name).toBe("string");
                        expect(typeof treasure.colour).toBe("string");
                        expect(typeof treasure.age).toBe("number");
                        expect(typeof treasure.cost_at_auction).toBe("number");
                        expect(typeof treasure.shop_id).toBe("number");
                    })
            })
        test("400: Responds with error if ID is not valid",() => {
                return request(app)
                 .get('/api/treasures/notValidId')
                 .expect(400)
                 .then(({body}) => {
                     expect(body.msg).toBe("bad request")
                         })
                         })
        test("404: Responds with error if treasure does not exist",() => {
                 return request(app)
                 .get('/api/treasures/99')
                 .expect(404)
                 .then(({body}) => {
                     expect(body.msg).toBe("treasure not found!")
                             })
                             })
                     })
describe("ANY: /notpath", ()=> {
        test("404: Responds with error if path not found",() => {
            return request(app)
                .get('/notpath')
                .expect(404)
                .then(({body}) => {
                    expect(body.msg).toBe("path not found!")
                            })
                            })
                })

                xtest("200: Tests so we can get an array sorted by age",() => {
                        })

                })
                