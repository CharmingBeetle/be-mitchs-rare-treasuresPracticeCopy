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
describe("Server Status", () => {
    test("200: Server responds with ok message", ()=> {
        return request(app)
        .get('/api')
        .expect(200)
        .then(({body:{msg}})=> {
            expect(msg).toBe("Server running ok.")
        })    
    })
})
describe("GET: /api/treasures", () => {
        
        test("200: Returns with an array of objects of all treasures requested",() => {
            return request(app)
            .get("/api/treasures")
            .expect(200)
            .then(({body}) => {
                const treasures = body.treasures
                // console.log(treasures, "<<<TREASURES")
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
                expect(treasures.length).toBeGreaterThan(0)
                // console.log(treasures, "<<<<<SORTED BY AGE")
                expect(treasures).toBeSortedBy('age');
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
            test("200: Returns an array of objects sorted by in descending order",() => {
                return request(app)
                .get("/api/treasures?order=desc")
                .expect(200)
                .then(({ body }) => {
                    const treasures = body.treasures //array of 
                    // object items
                    const ages = treasures.map(treasure => treasure.age);
                    // console.log(treasures, "<<<<<<DESCENDING")
                        expect(treasures.length).toBeGreaterThan(0)
                        expect(treasures).toBeSorted({ descending: true })
                        expect(ages).toBeSorted({descending:true})
                    })
                })
                test("200: Returns an array of objects of certain colour",() => {
                    return request(app)
                    .get("/api/treasures?colour=gold")
                    .expect(200)
                    .then(({ body }) => {
                        const treasures = body.treasures //array of 
                        // object items
                        const colours = treasures.map(treasure => treasure.colour);
                        console.log(colours, "<<<<<<GOLD")
                            expect(treasures.length).toBeGreaterThan(0)
                            treasures.forEach(treasure => {
                                expect(treasures.colour).toBe("gold")
                            })
                            
                        })
                    })
        test("200: Returns an array of treasures sorted by ascending age",() => {
            return request(app)
            .get('/api/treasures?sort_by=age')
            .expect(200)
            .then(({body})=> {
                const treasures = body.treasures
                expect(treasures.length).toBeGreaterThan(0)
                // console.log(treasures, "<<<<<SORTED BY AGE")
                expect(treasures).toBeSortedBy('age');
            })
        })
            test("200: Returns an array of treasures sorted by ascending cost",() => {
                return request(app)
                .get('/api/treasures?sort_by=cost_at_auction')
                .expect(200)
                .then(({body})=> {
                    const treasures = body.treasures
                    expect(treasures.length).toBeGreaterThan(0)
                    const costs = treasures.map((treasure) => treasure.cost_at_auction);
                        expect(costs).toBeSorted({ascending: true});
                        expect(treasures).toBeSortedBy('cost_at_auction');
                    })     
                })
            test("200: Returns an array of treasures sorted by ascending name",() => {
                return request(app)
                .get('/api/treasures?sort_by=treasure_name')
                .expect(200)
                .then(({body})=> {
                    const treasures = body.treasures
                    expect(treasures.length).toBeGreaterThan(0)
                    const names = treasures.map((treasure) => treasure.treasure_name);
                        expect(names).toBeSorted({ascending: true});
                        expect(treasures).toBeSortedBy('treasure_name');
                        })
                })
                test("400: Returns an error when invalid input",() => {
                    return request(app)
                    .get('/api/treasures?sort_by=')
                    .expect(400)
                    .then(({body})=> {
                        expect(body.msg).toBe("Invalid input")
                       
                            })
                    })
describe("GET: /api/treasures/:treasure_id", () => {
        test("200: Responds with an individual object with the requested treasure ID",() => {
            return request(app)
            .get('/api/treasures/12')
            .expect(200)
            .then(({ body }) => {
                    const treasure = body.treasure //indiv object item
                    // console.log(treasure, "<<<<individual TREASURE")
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
})