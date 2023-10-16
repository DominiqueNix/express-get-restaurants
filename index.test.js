const request = require('supertest');
const app = require('./src/app');
const {seedRestaurant} = require('./seedData')

describe('app endpoints', ()=> {
    test("GET /restaurants", async() => {
        const response = await request(app).get("/restaurants");
        expect(response.statusCode).toBe(200);
        // expect(response.body).toHaveLength(9);
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
                                console.log(response.body)
        expect(response.statusCode).toBe(200)                       
    })
    
    test('DELETE /restaurant/:id', async() => {
        const response = await request(app).delete('/restaurant/17')
        expect(response.statusCode).toBe(200)
    })
})