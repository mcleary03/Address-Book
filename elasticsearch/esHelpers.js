const exists = (client, index, name) => {
  const body = {
    query: { 
      match: { name }
    }
  }

  return client.search({ index, body }) 
  .then( resp => resp.hits.total>0 )
  .catch( err => console.error(err))
}


const validatePhone = number => {
  const re = /^(\+?\d{1,2}\s?)?\(?\d{0,3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
  return re.test(number) ? String(number) : undefined
}


const find = (client, index, req, res ) => {
  const size = req.query.pageSize || '20'
  const from = req.query.page || '0'
  const query = req.query.query || { match_all: {} }
  const body = { size, from, query }

  return client.search({ index, body })
  .then( resp => res.send(resp.hits.hits))
  .catch( err => res.send(err))
}


const findOne = (client, index, req, res ) => {
  const name = req.params.name
  const body = {
    query: { 
      match: { name }
    }
  }

  client.search({ index, body })
  .then( resp => {
    if (resp.hits.total>0) return client.search({ index, body })
    else return Promise.reject('Contact Not Found')})
  .then( resp => res.send(resp.hits.hits.map( result => result._source )))
  .catch( err => res.send(err))
}


const insert = (client, index, type, req, res) => {
  const name = req.body.name
  const phone = validatePhone(req.body.phone)
  const body = {
    query: {
      match: { name }
    }
  }

  if (phone) { // should be undefined if invalid
    client.search({ index, body })
    .then( resp => {
      if (!resp.hits.total) return client.index({ index, type, body: {name, phone} })
      else return Promise.reject(`${name} Contact Already Exists`)})
    .then( resp => res.send(`${name} Contact Created`))
    .catch( err => res.send(err))
  } else {
    res.send('Invalid Phone Number')
  }
}


const update = (client, index, req, res) => {
  const name = req.params.name
  const phone = req.body.phone
  const script = { inline: `ctx._source.phone = '${phone}'` }
  const body = {
    query: {
      match: { name }
    }
  }

  client.search({ index, body })
  .then( resp => {
    if (resp.hits.total) return client.updateByQuery({ index, type:'contact', body:{...body, script} })
    else return Promise.reject(`${name} Contact Not Found`)})
  .then( resp => res.send(`${name} Contact Updated`))
  .catch( err => res.send(err))
}


const remove = (client, index, req, res) => {
  const name = req.params.name
  const body = {
    query: {
      match: { name }
    }
  }

  client.search({ index, body })
  .then( resp => {
    if (resp.hits.total>0) return client.deleteByQuery({index, body})
    else return Promise.reject(`${name} Contact Not Found`)})
  .then( resp => res.send(`${name} Contact Deleted`))
  .catch( err => res.send(err))
}


module.exports = {
  find,
  findOne,
  insert,
  update,
  remove
}