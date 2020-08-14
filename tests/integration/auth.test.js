const Genres = require('../../models/genres')
const request = require('supertest');
let app = require('../../app');
const user = require('../../models/user');


describe('Authorization testing', () => {
   let token;
   let name;
   beforeEach(() => {
      token = new user({
         name: 'john', email: 'lola@gmail.com',
         isAdmin: true,
         password: 123456
      }).generateAuthToken()
      name = '419';
   })
   afterEach(async () => { await Genres.deleteMany() })

   const exec = () => {
      return request(app)
         .post('/api/genres')
         .set('x-auth-token', token)
         .send({ name: name })
   }

   it('should return 401 if no token is set ', async () => {
      token = '';
      name = 'genre 419';
      await exec().expect(401)

   })

   it('should return 404 if user sent an invalid token', async () => {
      token = 'a';
      name = 'genre 419';
      await exec().expect(404)
   })

   it('should return 200 if token is valid', async () => {
      name = 'genre 419';
      await exec().expect(200)
   })
})

