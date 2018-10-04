const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const expect = chai.expect
const app = require('../app')
const client = require('../elasticsearch/client')
chai.use(chaiHttp)

describe("Address Book API", function() {

  describe("GET '/'", function() {
    it('should have status 200', function(done) {
      chai.request(app)
      .get('/')
      .then( function(res) { expect(res).to.have.status(200) })
      .catch( function(err) { console.error(err) })
      done()
    })
  })

  describe("GET '/contact'", function() {
    it('should return object', function(done) {
      chai.request(app)
      .get('/contact')
      .then( function(res) { res.should.be.an('object') })
      .catch( function(err) { console.error(err) })
      done()
    })
  })

}) 
