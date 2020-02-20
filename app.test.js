app.get('/reviews', async (req, res) => {
    try {
        const yelp = await request
            .get(`https://api.yelp.com/v3/businesses/search?term=restaurants&latitude=${lat}&longitude=${lng}`)
            .set('Authorization', `Bearer ${process.env.YELP_API_KEY}`);
        const yelpStuff = yelp.body.businesses.map(business => {
            return {
                name: business.name,
                image: business.image_url,
                price: business.price,
                rating: business.rating,
                url: business.url,
            };
        });
        res.json(yelpStuff);
    } catch (err) {
        res.status(500).send('Sorry something went wrong, please try again');
    }
});
app.get('/events', async (req, res) => {
    try {
        const eventful = await request
            .get(`http://api.eventful.com/json/events/search?app_key=${process.env.EVENTBRITE_API_KEY}&where=${lat},${lng}&within=25`);
        const body = JSON.parse(eventful.text);
        const eventStuff = body.events.event.map(event => {
            return {
                link: event.url,
                name: event.title,
                date: event.start_time,
                summary: event.description,
            };
        });
        res.json(eventStuff);
    } catch (err) {
        res.status(500).send('Sorry something went wrong, please try again');
    }
});
app.get('/trails', async (req, res) => {
    try {
        const trails = await request
            .get(`https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${lng}&maxDistance=10&key=${process.env.TRAIL_API_KEY}`);
        // const body = JSON.parse(eventful.text);
        const trailStuff = trails.body.trails.map(trail => {
            return {
                name: trail.name,
                location: trail.location,
                length: trail.length,
                stars: trail.stars,
                star_votes: trail.starVotes,
                summary: trail.summary,
                trail_url: trail.url,
                conditions: trail.conditionStatus,
                condition_date: trail.conditionDate.substring(0, 10),
                condition_time: trail.conditionDate.substring(10),
            };
        });
        console.log(trails);
        res.json(trailStuff);
    } catch (err) {
        res.status(500).send('Sorry something went wrong, please try again');
    }
});

Kyle Devine (he/him)  12:38 PM
const request = require('supertest');
describe('GET LOCATION/ ', () => {
    test('It should respond with correctly formatted data', async (done) => {
        const response = await request(`https://sleepy-coast-13591.herokuapp.com`)
            .get('/location?search=Portland');
        expect(response.body).toEqual({
            formatted_query: expect.any(String),
            latitude: expect.any(String),
            longitude: expect.any(String)
        });
        expect(response.statusCode).toBe(200);
        done();
    });
});
describe('GET WEATHER/ ', () => {
    test('It should respond with correctly formatted data', async (done) => {
        const response = await request(`https://sleepy-coast-13591.herokuapp.com`)
            .get('/weather');
        expect(response.body[0]).toEqual({
            forecast: expect.any(String),
            time: expect.any(String)
        });
        expect(response.statusCode).toBe(200);
        done();
    });
});
describe('GET YELP / ', () => {
    test('It should respond with correctly formatted data', async (done) => {
        const response = await request(`https://sleepy-coast-13591.herokuapp.com`)
            .get('/reviews');
        expect(response.body[0]).toEqual({
            name: expect.any(String),
            image: expect.any(String),
            price: expect.any(String),
            rating: expect.any(Number),
            url: expect.any(String)
        });
        expect(response.statusCode).toBe(200);
        done();
    });
});
describe('GET TRAILS / ', () => {
    test('It should respond with correctly formatted data', async (done) => {
        const response = await request(`https://sleepy-coast-13591.herokuapp.com`)
            .get('/trails');
        expect(response.body[0]).toEqual({
            name: expect.any(String),
            location: expect.any(String),
            length: expect.any(Number),
            stars: expect.any(Number),
            star_votes: expect.any(Number),
            summary: expect.any(String),
            trail_url: expect.any(String),
            conditions: expect.any(String),
            condition_date: expect.any(String),
            condition_time: expect.any(String)
        });
        expect(response.statusCode).toBe(200);
        done();
    });
});
describe('GET EVENTS / ', () => {
    test('It should respond with correctly formatted data', async (done) => {
        const response = await request(`https://sleepy-coast-13591.herokuapp.com`)
            .get('/events');
        expect(response.body[0]).toEqual({
            link: expect.any(String),
            name: expect.any(String),
            date: expect.any(String),
            summary: null
        });
        expect(response.statusCode).toBe(200);
        done();
    });
});