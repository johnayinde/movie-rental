const express = require('express');
const router = express.Router();
const { customerValidation } = require('../validation')
// const Genres = require('../models/genres')
const Customers = require('../models/customers')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const _ = require('lodash')


router.get('/', async (req, res) => {
   const allCustomers = await Customers.find().sort('name');
   if (!allCustomers || allCustomers.length < 1) return res.status(404)
      .send("No customers available");
   res.status(201).send(allCustomers);

})

router.post('/', [auth, admin], async (req, res) => {
   const { error, value } = customerValidation(req.body)
   if (error) return res.status(404).send(error.details[0].message);

   const customer = new Customers(_.pick(req.body, ['name', 'phone', 'isGold']))
   if (!customer) return res.status(404).send("no customer to save");

   await customer.save();
   res.status(200).send(customer)

});


router.put('/:id', [auth, admin], async (req, res) => {
   const { error, value } = customerValidation(req.body)
   if (error) return res.status(404).send(error.details[0].message);

   const id = req.params.id;

   const updated = await Customers.findByIdAndUpdate(id, {
      $set: {
         name: req.body.name,
         phone: req.body.phone,

      }
   }, { new: true })
   if (!updated) return res.status(404).send("no customer to update");

   res.status(200).send(updated)

})

router.get('/:id', async (req, res) => {
   const id = req.params.id;

   const customer = await Customers.findById(id);
   if (!customer) return res.status(404).send("no customer for the ID");
   res.status(200).send(customer)
});


router.delete('/:id', [auth, admin], async (req, res) => {
   const id = req.params.id;

   const deleteCustomer = await Customers.findByIdAndDelete(id);
   if (!deleteCustomer) return res.status(404).send('The customer with the given ID was not found.');
   res.status(200).send(deleteCustomer)
})


module.exports = router;