const request = require('supertest');
const app = require('./src/app');
const {seedRestaurant} = require('./seedData')

describe('app endpoints', ()=> {
    test("GET /restaurants", async() => {
        const response = await request(app).get("/restaurants");
        expect(Array.isArray(response.body)).toBe(true)
        expect(response.statusCode).toBe(200);
        expect(response.body.length > 1).toBe(true);
        expect(response.body[2].name).toEqual(seedRestaurant[2].name);
    })
    test("Get /restaurants:id", async() => {
        const response = await request(app).get("/restaurants/2");
        expect(response.body.name).toBe(seedRestaurant[1].name)
    })
    test("POST /restaurants", async() => {
        const response = await request(app)
                                .post('/restaurants')
                                .send({
                                    name: 'Texas Roadhouse', 
                                    location: 'Texas', 
                                    cuisine: 'Steakhouse'
                                })
        expect(response.body.name).toBe('Texas Roadhouse')
    });
    test("PUT /restaurant/:id", async() => {
        const response = await request(app)
                                .put('/restaurant/2')
                                .send({
                                    location: 'Southern USA'
                                })
                                // console.log(response.body)
        expect(response.statusCode).toBe(200)                       
    })
    
    test('DELETE /restaurant/:id', async() => {
        const response = await request(app).delete('/restaurant/17')
        expect(response.statusCode).toBe(200)
    })

    test("POST /restaurants receives an error is name, location, or cuisine is empty", async() => {
        const response1 = await request(app).post("/restaurants").send({
            "name": "",
            "location": "Texas",
            "cuisine": "American"
        });
        const response2 = await request(app).post("/restaurants").send({
            "name": "Chillis",
            "location": "",
            "cuisine": "American"
        })
        const response3 = await request(app).post("/restaurants").send({
            "name": "Chillis",
            "location": "Texas",
            "cuisine": ""
        })    
        // console.log(response1.body.error)
        expect(response1.body.error).toEqual([
            {
              type: 'field',
              value: '',
              msg: 'Invalid value',
              path: 'name',
              location: 'body'
            }
          ])
          expect(response2.body.error).toEqual([
            {
              type: 'field',
              value: '',
              msg: 'Invalid value',
              path: 'location',
              location: 'body'
            }
          ])
          expect(response3.body.error).toEqual([
            {
              type: 'field',
              value: '',
              msg: 'Invalid value',
              path: 'cuisine',
              location: 'body'
            }
          ])
    })
})