var config = require('../config')
var userModel = require('../models/user_model')
var mLog = require('mocha-logger')
var chakram = require('chakram'),
    expect = chakram.expect;

    //Positive Tests
describe("GET City/{city}/users API End point Positive tests", function() {
    var response;
    before(function() {
        response = chakram.get(config.baseUrl + 'city/Kax/users')
    })

    //HTTP Code Response test
    it("should return a 200 response when I make a request", function () {
            return expect(response).to.have.status(200)
    })

    //Response headers test
    it('should return with a connection header', function () {
        return expect(response).and.to.have.header('connection');
    })

    it('should return with a content-type header', function () {
        return expect(response).and.to.have.header('content-type', 'application/json');
    })

    it('should return with a date header', function () {
        return expect(response).and.to.have.header('date');
    })


    it('should return with a server header', function () {
        return expect(response).and.to.have.header('server', 'gunicorn/19.9.0');
    })

    it('should return with a via header', function () {
        return expect(response).and.to.have.header('via', '1.1\ vegur');
    })

    it('should not contain an X-Powered-By header', function() {
        return expect(response).and.to.not.have.header('X-Powered-By');
    })

    //Response body tests
    it('should match the schema', function () {
        return expect(response).to.have.schema(userModel.partialSchema)
    })
    
    it('should return a single user',function () {
        return expect(response).to.have.schema({minItems: 2, maxItems: 2})
    })

    //Check the data of the first user returned is correct
    it('should return a user with the correct data', function() {
        return expect(response).to.have.json(function (responseArray){
            expect(responseArray[0].id).to.equal(1)
            expect(responseArray[0].first_name).to.equal('Maurise')
            expect(responseArray[0].last_name).to.equal('Shieldon')
            expect(responseArray[0].email).to.equal('mshieldon0@squidoo.com')
            expect(responseArray[0].ip_address).to.equal('192.57.232.111')
            expect(responseArray[0].latitude).to.equal(34.003135)
            expect(responseArray[0].longitude).to.equal(-117.7228641)
        })
    })

    //Performance test
    it('should allow checking maximum response time', function () {
        return expect(response).to.have.responsetime(500);
    })


})

describe('GET City/{city}/users API End point negative tests', function () {

    //HTTP Code Response test
    it("Shouldn't throw an exception when I enter an invalid data type for the city name", function () {
        var response = chakram.get(config.baseUrl + 'city/1234/users')
        return expect(response).to.have.status(200)
    })

      //HTTP Code Response test
      it("Shouldn't throw an exception when I enter an invalid city name", function () {
        var response = chakram.get(config.baseUrl + 'city/abcd/users')
        return expect(response).to.have.status(200)
    })

})