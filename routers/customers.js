const express = require('express');
const router = express.Router();
const { customerValidation } = require('../middlewares')
// const Genres = require('../models/genres')
const Customers = require('../models/customers')


router.get('/', async (req, res) => {
   try {
      const allCustomers = await Customers.find().sort('name');
      if (!allCustomers || allCustomers.length < 1) return res.status(404)
         .send("No customers available");
      res.status(201).send(allCustomers);

   } catch (error) {
      console.error(error);
   }
})

router.post('/', async (req, res) => {
   const { error, value } = customerValidation(req.body)
   if (error) return res.status(404).send(error.details[0].message);

   try {
      const customer = new Customers({
         name: req.body.name,
         phone: req.body.phone,
         isGold: req.body.isGold,
      })
      if (!customer) return res.status(404).send("no customer to save");

      await customer.save();
      res.status(200).send(customer)

   } catch (error) {
      console.error('ERROR', error);
   }
});


router.put('/:id', async (req, res) => {
   const { error, value } = customerValidation(req.body)
   if (error) return res.status(404).send(error.details[0].message);

   const id = req.params.id;
   try {
      const updated = await Customers.findByIdAndUpdate(id, {
         $set: {
            name: req.body.name,
            phone: req.body.phone,

         }
      }, { new: true })
      if (!updated) return res.status(404).send("no customer to update");

      res.status(200).send(updated)
   } catch (error) {
      console.error(error);
   }
})

router.get('/:id', async (req, res) => {
   const id = req.params.id;
   try {
      const customer = await Customers.findById(id);
      if (!customer) return res.status(404).send("no customer for the ID");
      res.status(200).send(customer)

   } catch (error) {
      console.error(error);
   }
});


router.delete('/:id', async (req, res) => {
   const id = req.params.id;
   try {
      const deleteCustomer = await Customers.findByIdAndDelete(id);
      if (!deleteCustomer) return res.status(404).send('The customer with the given ID was not found.');
      res.status(200).send(deleteCustomer)

   } catch (error) {
      console.error('ERROR', error);
   }
})


module.exports = router;