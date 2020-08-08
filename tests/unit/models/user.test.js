const User = require('../../../models/user')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');

describe('generate token', () => {
   it('should return a valid token', () => {
      const payload = { _id: new mongoose.Types.ObjectId().toHexString(), isAdmin: true }
      const user = new User(payload);
      const token = user.generateAuthToken();
      const decoded = jwt.verify(token, 'secret');

      expect(decoded).toMatchObject(payload);
   });
})