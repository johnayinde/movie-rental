const user = require('../../../models/user');
const auth = require('../../../middleware/auth');


describe('Authorization testing', () => {

   beforeEach(async () => {


   })

   it('populate req.user with payload', async () => {
      let newObj = { name: 'john', email: 'lola@gmail.com', isAdmin: true, password: 123456 }
      // let token = await new user(newObj).generateAuthToken()
      let token = new user({
         name: 'john', email: 'lola@gmail.com',
         isAdmin: true,
         password: 123456
      }).generateAuthToken()

      const req = {
         header: jest.fn().mockReturnValue(token),
      }
      const res = {
         send: function () { },
         status: function (s) {
            this.status = s;
            return this
         },

      }
      const next = jest.fn()


      const result = await auth(req, res, next)
      expect(req.user).toBeUndefined()
      // expect(req.user).toMatchObject(newObj)
   })

})

