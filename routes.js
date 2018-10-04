const express = require('express')
const router = express.Router()
const elasticSearch = require('elasticsearch')
const client = require('./elasticsearch/client')
const {
  find,
  findOne,
  insert,
  update,
  remove
} = require('./elasticsearch/esHelpers')

const index = 'address_book' // all routes use address_book index
const type = 'contact' // address_book has one index type

// GET  '/'
//      testing express
router.get('/', (req, res) => 
  res.sendFile(__dirname + '/README.md'))

// GET  '/contact?pageSize={}&page={}&query={}'
//      pageSize: number of contacts displayed at a time, defaults to 20
//      page: number of contacts to skip, defaults to 0
//      query: Elasticsearch query, defaults to match_all
router.get('/contact', (req,res) => 
  find(client, index, req, res))

// GET  '/contact/{name}'
//      returns a contact by unique name
router.get('/contact/:name', (req, res) => 
  findOne(client, index, req, res))

// POST  '/contact'
//        create a new contact with unique name
router.post( '/contact', (req, res) => 
  insert(client, index, type, req, res))

// PUT  '/contact/{name}'
//      update the contact by unique name, ERROR if not found
router.put('/contact/:name', (req, res) => 
  update(client, index, req, res))

// DELETE  '/contact/{name}'
//         delete a contact by unique name, ERROR if not found
router.delete('/contact/:name', (req, res) => 
  remove(client, index, req, res))


module.exports = router