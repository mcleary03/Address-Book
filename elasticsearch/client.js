const elasticSearch = require('elasticsearch')
const PORT = process.env.ES_PORT || 9200

const client = new elasticSearch.Client({
  host: `http://localhost:${PORT}`,
  apiVersion: '6.3',
  log: ['trace', 'error']
})

module.exports = client