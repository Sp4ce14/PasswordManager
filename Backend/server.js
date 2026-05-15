import express from 'express'
import 'dotenv/config'

console.log(`Hello ${process.env.HELLO}`)
const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
