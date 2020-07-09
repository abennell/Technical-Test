## Overview

It is my technical opinion that the swagger documentation provided doesnt provide sufficient detail to be able to build a set of automated tests that would provide sufficient confidence in the API under test. I would be writing a series of tests based on how the API currently works rather than how it should work meaning I would be codifying the existing API errors in to the automated tests. This would give the believe the API works as intended when they pass. In order to produce these tests, I would need to know the following:

 - A functional specification, set of requirements or a data contract detailing what each end point should do and return
 - The intended model schema for each API endpoint including what headers should be returned
 - An overview of what headers should be sent with each request
 - An understanding of the data that each end point is expected to return; is it currently using a static data set?
 - Who the intended reciept or user of these tests will be in order to choose the correct technical tool to solve the problem. For example:
    - Would they form part of a build pipeline?
    - Are these designed to be run by a non-technical member of staff?
    - Who will be maintaining them and what is their skill set?


## Additional Questions/Observations


- Is it the intended behaviour for the GET ‘city’ api endpoint to accept a string rather than an ID for the 'city' parameter? It seems inconsistent to use an ID to identify a user for the 'GET User' API end point but a string to identify the city in the 'GET City'. If the API is returning international users, it's possible we could be retrieving users for the wrong city, in the wrong country.
- Is it the intended behaviour for the API to return user data without being authenticated? Typically, Personal Data is subejct to increased levels of protection and it's unusual to be able to access it without some form of authentication and authorisation mechanism. 


## Potential Bugs

- GET USER - 'Latitude' is returned as a number for most users but as a string for others. This is likely to cause the consumer of the API to throw an exception when it attempts to parse the value.

