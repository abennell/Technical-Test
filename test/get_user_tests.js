var config = require('../config')
var userModel = require('../models/user_model')
var mLog = require('mocha-logger')
var chakram = require('chakram'),
    expect = chakram.expect;

describe("GET User/{id} API End point tests", function() {
    var response;
    before(function() {
        response = chakram.get(config.baseUrl + '/user/1')
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
        return expect(response).to.have.schema(userModel.fullSchema)
    })
    
    it('should return a single user',function () {
        return expect(response).to.have.schema({minItems: 1, maxItems: 1})
    })

    //Check the data of the first user returned is correct
    it('should return a user with the correct data', function() {
        return expect(response).to.have.json(function (responseObj){
            expect(responseObj.id).to.equal(1)
            expect(responseObj.first_name).to.equal('Maurise')
            expect(responseObj.last_name).to.equal('Shieldon')
            expect(responseObj.email).to.equal('mshieldon0@squidoo.com')
            expect(responseObj.ip_address).to.equal('192.57.232.111')
            expect(responseObj.latitude).to.equal(34.003135)
            expect(responseObj.longitude).to.equal(-117.7228641)
            expect(responseObj.city).to.equal('Kax')
        })
    })

    //Performance test

    it('should allow checking maximum response time', function () {
        return expect(response).to.have.responsetime(500);
    })

    describe('GET User/{id} API End point negative tests', function () {
        
        //HTTP Code Response test
        it("should return a 404 response when I make a request with an invalid data type", function () {
            var response = chakram.get(config.baseUrl + 'user/abcd')
            return expect(response).to.have.status(404)
        })

        //HTTP Code Response test
        it("should return a 404 response when I make a request with a user id that doesnt exist", function () {
            var response = chakram.get(config.baseUrl + 'user/10000')
            return expect(response).to.have.status(404)
        })

        

    
    })


})