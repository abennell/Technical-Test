## Overview

It is my professional opinion that the swagger documentation provided doesn't provide enough detail to be able to build a set of automated tests that would provide sufficient confidence in the API under test. I would be writing a series of tests based on how the API currently works rather than how it should work meaning I would be codifying the existing API errors in to the automated tests. This would give the belief the API works as intended when they pass. In order to produce these tests, I would need to know the following:

 - A functional specification, set of requirements or a data contract detailing what each end point should do and return
 - The intended model schema for each API endpoint including what headers should be returned
 - An overview of what headers should be sent with each request
 - An understanding of the data that each end point is expected to return; is it currently using a static data set?
 - An understanding of what will be consuming the API 
 - Who the intended reciept or user of these tests will be in order to choose the correct technical tool to solve the problem. For example:
    - Would they form part of a build pipeline?
    - Are these designed to be run by a non-technical member of staff?
    - Who will be maintaining them and what is their skill set?

I asked these questions in a response to the technical test but given the timescales for returning it, and not having had a response, I have put together a set of tests written in JS, based on the following assumptions. A number of these will currently fail due to the issues identified in the 'Potential Bugs' section.

- Each API end point is returning the expected set of results and each JSON object returned meets the expected data contract in terms of required key/value pairs and their expected type.
- Each API end point returns the same set of results each time it is called
- The 'GET instructions' API end point is out of scope and is only intended to provide the instructions for this technical test. 
- The response header values for 'server' and 'via' always return the same value.
- 500ms is an acceptable Non Functional Requirement (NFR) for the api to return a response in
- The language and tools used to complete the test are left to my discretion.


## Additional Questions/Observations


- Missing API endpoint: Should I wish to query the 'GET /city/{city}/user' endpoint, as a consumer of the API, I would have to query each user individually to build up a city list. This is inefficient, providing a GET city end point which returned a list of all cities would be useful. 
- Is it the intended behaviour for the 'GET city’ api endpoint to accept a string rather than an ID for the 'city' parameter? It seems inconsistent to use an ID to identify a user for the 'GET User' API end point but a string to identify the city in the 'GET city' call. If the API is returning international users, it's possible we could be retrieving users for the wrong city, in the wrong country.
- Is it the intended behaviour for the API to return user data without being authenticated? Typically, Personal Data is subject to increased levels of protection and it's unusual to be able to access it without some form of authentication and authorisation mechanism. 


## Potential Bugs

- GET instructions - Gramatical error: '...and that ensure that...'
- GET user - Incorrect data type returned - 'Latitude' and 'Longitude' are returned as a number for most users but as a string for others. This can be seen on the user with the id: '3'. This is likely to cause the consumer of the API to throw an exception when it attempts to parse the value. This causes the schema tests to fail in  'get_users_tests.js' and 'get_user_tests.js'
- GET user - Missing key/value pair - If I run a query for a single user, I recieve the key - 'city' plus a value. Given all other data for the user is returned, this suggests it should also be returned in the response. 
- All - I can query the API over HTTP. 

## Tests Tech Stack

The tests are written in Javscript using a library called 'Chakram' to handle making the HTTP requests. Mocha is used as the test runner, 'Chai' is used for the assertions library. A JSON validator library is used to validate all the JSON responses against the v4 standard.

If you wish to run the tests you will require the 'npm' package manager.

1. Clone the respository locally
2. Navigate to the root folder of the project in a terminal window and type 'npm install'. This will install all required dependencies
3. Once it has finished, you can run the tests using the command 'npm test'.
