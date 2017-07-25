const express = require('express')

const app = express()

app.set('port', process.env.PORT || 3001)

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('./build'))
}

app.get('/api/user', (req, res) => {
  res.json({
    name: 'chris zhou',
    create_at: new Date(),
  })
})

app.post('/api/user', (req, res) => {
  res.json({
    name: 'chris zhou',
    create_at: new Date(),
  })
})

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`) // eslint-disable-line no-console
})
