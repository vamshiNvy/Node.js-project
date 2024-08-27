● For a Node.js project, develop a set of APIs for managing a collection of cities. ● Add City API: Create an endpoint to add a new city to the collection. The request body should be in JSON format and contain details of the city including at least the following fields: 
1. name 
2. population 
3. country 
4. latitude 
5. longitude 
Ensure that city names are unique. Upon successful addition, return a success message along with the details of the newly added city. 
● Update City API: Implement an API to update an existing city in the collection. The request body should contain the updated city details in JSON format, along with an identifier to specify the city to be updated. Return a success message and the updated city object upon successful update. 
● Delete City API: Develop an endpoint to delete a city from the collection. It should accept the city name or an identifier as a parameter. Upon successful deletion, return a success message. 
● Get Cities API: Design an API to retrieve cities from the collection. Support pagination, filtering, sorting, searching, and projection. Support the following query parameters: 
1. page: Page number for pagination 
2. limit: Maximum number of cities per page 
3. filter: Filter cities based on specified criteria 
4. sort: Sort cities based on a specified field and order 
5. search: Search for cities based on a search term. 
6. projection: Specify which fields to include or exclude from the response
