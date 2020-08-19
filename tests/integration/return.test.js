const request = require('supertest');
let app = require('../../app');
const Genre = require('../../models/genres')
const User = require('../../models/user');
const Rental = require('../../models/rental');
const Movie = require('../../models/movies');
const Customers = require('../../models/customers');
const mongoose = require('mongoose');
const moment = require('moment');
// const movies = require('../../models/movies');



describe('/api/genres', () => {
   let customerId = mongoose.Types.ObjectId();
   let movieId = mongoose.Types.ObjectId();
   let movieId2 = mongoose.Types.ObjectId();
   let genreId = mongoose.Types.ObjectId();
   let token;
   let rental;
   let movies;
   afterEach(async () => {
      await Rental.deleteMany()
      await Movie.deleteMany()
   })

   beforeEach(async () => {
      movies = new Movie({
         _id: movieId2,
         title: '123456',
         dailyRentalRate: 2,
         numberInStock: 10,
         genre: { _id: genreId, name: '12345' }

      })
      await movies.save();

      rental = new Rental({
         movie: {
            _id: movieId,
            title: '12345',
            dailyRentalRate: 2,
            rentalFee: 2,
            numberInStock: 10,
            // genre: {
            //    _id: genreId,
            //    name: '12345'
            // }
         },
         customer: {
            _id: customerId,
            name: '12345',
            phone: '123456'
         },
      })
      await rental.save();
      token = await new User().generateAuthToken()
   })

   const exec = () => {
      return request(app)
         .post('/api/returns')
         .set('x-auth-token', token)
         .send({ customerId, movieId });
   }

   it(' should return 401 if client is not loggedin', async () => {
      token = ''
      await exec().expect(401)
   })

   it(' should return 400 if customerID is not provided', async () => {
      const res = await request(app)
         .post('/api/returns')
         .set('x-auth-token', token)
         .send({ movieId });
      expect(res.status).toBe(400);
   })

   it(' should return 400 if movieId` is not provided', async () => {
      const res = await request(app)
         .post('/api/returns')
         .set('x-auth-token', token)
         .send({ customerId });
      expect(res.status).toBe(400);
   })

   it(' should return 404 if movno rental found with movieId/customerId provided', async () => {
      await Rental.deleteMany()

      const res = await exec()
      expect(res.status).toBe(404);
   })

   it(' should return 400 if rental already processed', async () => {
      rental.dateReturned = new Date()
      await rental.save()

      const res = await exec()
      expect(res.status).toBe(400);
      expect(res.body.dateReturned).not.toBeNull()
   })

   it(' should return 200 if rental already processed', async () => {

      const res = await exec()
      expect(res.status).toBe(200);
   })

   it(' should set the return date if input is valid', async () => {
      const res = await exec()
      const rentalDb = await Rental.findById(rental._id);
      const diff = new Date() - rentalDb.dateReturned
      expect(diff).toBeLessThan(10 * 1000);
   })

   it(' should return rental fee if input is valid', async () => {
      rental.dateOut = moment().add(-7, 'days').toDate()
      await rental.save();

      const res = await exec()
      const rentalDb = await Rental.findById(rental._id);
      expect(rentalDb.rentalFee).toBe(14)
   })

   // it(' should increase the movie in stock if input is valid', async () => {
   //    const res = await exec()
   //    const movieDb = await Movie.findById(movies._id);
   //    // expect(movieDb.numberInStock).toBe(11)
   //    expect(movieDb.numberInStock).toBe(movies.numberInStock + 1)
   // })

   it(' should return rental if input is valid', async () => {
      const res = await exec()
      const rentalDB = await Rental.findById(rental._id);
      expect(res.body).toHaveProperty('dateOut')
      expect(Object.keys(res.body)).toEqual(expect.arrayContaining(['dateOut', 'dateReturned', 'rentalFee']))
   })

})


