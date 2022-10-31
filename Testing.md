## Testing methods

### 1. Test for correctness (Unit testing)
1. We can use unit testing tools like jest, mocha to test for the correctness of the API and check if it is behaving in the required way.
2. These tools allow the developers to write independent unit tests for each feature in the application.
3. Assert certain conditions and see if they are satisified.
4. We can check for certain parameters, test function behaviour etc.

### 2. Integration testing
1. Apart certain node packages we are only reliant on the database.
2. So the tests including the performance of database are necessary too.
3. Just like unit testing, integration testing environment can be setup using Jest and Docker containers;

### 3. Test against load
1. It is important to test the server against load and large responses. 
2. In nodejs it could be done using a package called nodeload. 
3. nodeload allows us to write different tests for load and plots graphs of statistics like response time.
4. We can use different workloads. For eg in 10000 requests, 50% create,update,delete operations and 50% searching operations,
then we can analyse which API's take up more time.
5. In another test we can just check load against the different searching related API's
6. Same could be done using other tools like Postman, it also allows us to add assertions for the API responses.
