const Genres = require('../../models/genres')
const request = require('supertest');
let app = require('../../app');
const user = require('../../models/user');
const mongoose = require('mongoose');



describe('/api/genres', () => {
   afterEach(async () => { await Genres.deleteMany() })

   describe('Get /', () => {

      it('should get all available genres from DB', async () => {
         const genre = await new Genres({ name: 'genre41' }).save();

         const res = await request(app).get('/api/genres');
         expect(res.status).toBe(201)

      })

      it('should return 404 if no genres found', async () => {
         request(app)
            .get('/api/genres')
            .expect(404);
      })



      it('should return 404 if no genres found', async () => {
         await Genres.deleteMany()
         const res = await request(app).get('/api/genres')
         expect(res.status).toBe(404)
      })


   })


   describe(' GET api/:id', () => {

      it('should get a genre by ID', async () => {
         const genre = new Genres({ name: 'genre41' })
         await genre.save()

         const res = await request(app).get('/api/genres/' + genre._id);
         expect(res.status).toBe(200)
         expect(res.body).toHaveProperty('name', genre.name)
      })

      it('should return 404 for invalid ID', async () => {

         const res = await request(app).get('/api/genres/1');
         expect(res.status).toBe(404)
      })

      it('should return 404 if not found on ID', async () => {
         const id = mongoose.Types.ObjectId()
         const res = await request(app).get('/api/genres/' + id);
         expect(res.status).toBe(404)
      })
   })

   describe('POST /', () => {
      let token;
      let name;
      beforeEach(() => {
         token = new user({ name: 'john', email: 'lola@gmail.com', isAdmin: true, password: 123456 }).generateAuthToken()
         name = '419';
      })

      const exec = () => {
         return request(app)
            .post('/api/genres')
            .set('x-auth-token', token)
            .send({ name: name })
      }

      it('should post genres to DB', async () => {

         name = 'genre 419'
         await exec().expect(200)

      })

      it('should return 401 if user is not loggedin ', async () => {
         token = '';
         name = 'genre 419';
         await exec().expect(401)

      })

      it('should return 404 if gener is less than 5', async () => {

         await exec().expect(404)
      })

      it('should return 404 if gener is greater than 5', async () => {

         name = new Array(52).join('a')
         await exec().expect(404)
      })

      it('should return 404 if no genre provided', async () => {
         name = ''
         await exec()
            .expect(404)
            .expect((res) => { res.body.name === '' })
      })

      it('should return genre if its valid', async () => {

         name = 'genre112'
         await exec()
            .expect((res) => {
               res.body.name = 'genre112'
            })
            .expect(200)
      })

   })

   describe('PUT /', () => {
      let token;
      beforeEach(() => {
         token = new user({ name: 'john', email: 'lola@gmail.com', isAdmin: true, password: 123456 })
            .generateAuthToken()
      })

      it('should return 401 if token is not set ', async () => {
         const genre = new Genres({ name: 'genres0' })
         await genre.save()

         const res = await request(app)
            .put('/api/genres/' + genre._id)
            .send({ name: 'genres01' });
         expect(res.status).toBe(401);
         // expect(res.body).toHaveProperty('name', genre.name)

      })

      it('should return 404 if gener is less than 5', async () => {

         const genre = new Genres({ name: 'genres0' })
         await genre.save()

         const res = await request(app)
            .put('/api/genres/' + genre._id)
            .set('x-auth-token', token)
            .send({ name: 'genr' });
         expect(res.status).toBe(404);
      })

      it('should return 404 if gener is greater than 5', async () => {

         const name = new Array(52).join('a')

         const genre = new Genres({ name: 'genres0' })
         await genre.save()

         const res = await request(app)
            .put('/api/genres/' + genre._id)
            .set('x-auth-token', token)
            .send({ name: name });
         expect(res.status).toBe(404);
      })

      it('should return 404 nothing is updated', async () => {

         const genre = new Genres({ name: 'genres0' })
         await genre.save()

         const res = await request(app)
            .put('/api/genres/' + genre._id)
            .set('x-auth-token', token)
         expect(res.status).toBe(404);
      })

      it('should return 200 nothing is updated', async () => {

         const genre = new Genres({ name: 'genres0' })
         await genre.save()

         const res = await request(app)
            .put('/api/genres/' + genre._id)
            .set('x-auth-token', token)
            .send({ name: 'genres0' })
         expect(res.status).toBe(200);
      })

      it('should return 404 if not found on ID', async () => {
         const id = mongoose.Types.ObjectId()
         const genre = new Genres({ name: 'genres0' })
         await genre.save()

         const res = await request(app)
            .put('/api/genres/' + id)
            .set('x-auth-token', token)
            .send({ name: 'genres01' });
         expect(res.status).toBe(404);
      })

   })

   describe('DELETE /', () => {
      let token;
      beforeEach(() => {
         token = new user({ name: 'john', email: 'lola@gmail.com', isAdmin: true, password: 123456 })
            .generateAuthToken()
         name = '419';
      })


      it('should delete genres from DB by ID', async () => {

         const genre = new Genres({ name: 'genres0' })
         await genre.save()

         const res = await request(app)
            .delete('/api/genres/' + genre._id)
            .set('x-auth-token', token)
         expect(res.status).toBe(200)
      })

      it('should return 401 if token is not set ', async () => {
         const genre = new Genres({ name: 'genres0' })
         await genre.save()

         const res = await request(app)
            .delete('/api/genres/' + genre._id)
         expect(res.status).toBe(401);
      })

      it('should return 404 if not deleted  ID', async () => {
         const id = mongoose.Types.ObjectId()
         const genre = new Genres({ name: 'genres0' })
         await genre.save()

         const res = await request(app)
            .delete('/api/genres/' + id)
            .set('x-auth-token', token)
         expect(res.status).toBe(404);
      })
   })




})