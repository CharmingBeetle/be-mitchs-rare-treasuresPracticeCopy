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
                    expect(typeof treasure.shop_id).toBe("number");
                })
            })
        })
        test("200: Returns an array of objects sorted by age in ascending order",() => {
                return request(app)
                .get("/api/treasures")
                .expect(200)
                .then((response) => {
                    const treasures = response.body.treasures
                    // // console.log(treasures, "<<<< TREASURES")
                    // const ageArr = treasures.map(treasure => {
                    //     treasure.treasure.age
                    //     console.log(ageArr, "<<<< AGES")
                    //     return ageArr
                    // })
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
            test("200: Tests whether we receive an individual object with the requested ID",() => {
                return request(app)
                .get('/api/treasures/12')
                .expect(200)
                .then(({ body }) => {
                    const treasure = body.treasure
                        expect(treasure.treasure_id).toBe(12);
                        expect(typeof treasure.treasure_name).toBe("string");
                        expect(typeof treasure.colour).toBe("string");
                        expect(typeof treasure.age).toBe("number");
                        expect(typeof treasure.cost_at_auction).toBe("number");
                        expect(typeof treasure.shop_id).toBe("number");
                    })
                })
                // test("200: Tests whether we receive a sorted array of objects by age",() => {
                //     return request(app)
                //     .get('/api/treasures/age/9')
                //     .expect(200)
                //     .then(( {body} ) => {
                //         const treasure = body.treasure
                //         console.log(treasure, "<<<<< TREASURES")
                //             expect(typeof treasure.treasure_id).toBe("number");
                //             expect(typeof treasure.treasure_name).toBe("string");
                //             expect(typeof treasure.colour).toBe("string");
                //             expect(treasure.age).toBe(9);
                //             expect(typeof treasure.cost_at_auction).toBe("number");
                //             expect(typeof treasure.shop_id).toBe("number");
                //         })
                //         })
                    })
    })
