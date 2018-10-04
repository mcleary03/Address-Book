# Address Book API

## Requirements 
* [Node](https://nodejs.org/)
* [Express](expressjs.com/)
* [Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/index.html)
* [Mocha](https://mochajs.org/)

### Getting Started
* `npm install`
* `npm start`

### Running Tests
* `npm install mocha`
* `npm test`

### Setting host/port
The port for Express defaults to 3000, but can be changed using the node environment variable `EXPRESS_PORT`
The port for Elasticsearch defaults to 9200, but can be changed using the node environment variable `ES_PORT`

example:
```node
process.env.ES_PORT = somePortNumber
```

### Routes
| Method      |                 Route                  |                          Notes                        |
|-------------|----------------------------------------|-------------------------------------------------------|
| **GET**     | `/contact?pageSize={}&page={}&query={}`| paginated list of contacts with optional filter query |
| **POST**    | `/contact`                             | create new contact                                    |
| **GET**     | `/contact/{name}`                      | single contact's info                                 |
| **PUT**     | `/contact/{name}`                      | update a single contact                               |
| **DELETE**  | `/contact/{name}`                      | remove a single contact                               |
