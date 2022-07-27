const express = require('express')
const cors = require('cors')
const { application } = require('express')
const data = require('./restaurants.json')
const fs = require('fs')

const app = express()
app.use(cors())
app.use(express.json())

app.listen(4000, () => console.log('Our API running on 4000'))

const handleWriteFiles = () => {
  const dataJson = JSON.stringify(data) //converting back to JSON
  fs.writeFile('restaurants.json', dataJson, (err) => console.err(err))
}

app.get('/', (req, res) => {
  res.send(data)
})

//add new restaurant
app.post('/add-restaurants', (req, res) => {
  data.push(req.body) //add new restaurant
  handleWriteFiles()
  res.send(data)
})

//find and update restaurant
app.patch('/update-restaurants', (req, res) => {
  const { name } = req.query //get the name
  const itemFound = data.find((eachRestaurant) => eachRestaurant.name === name) //compare name to everything in the array
  const indexOfItem = data.indexOf(itemFound) //get the index
  data[indexOfItem] = req.body //overwriting the item with body
  handleWriteFiles()
  res.send(data)
})

//find and delete restaurant
app.delete('/delete-restaurant', (req, res) => {
  const { name } = req.query
  const itemFound = data.find((eachRestaurant) => eachRestaurant.name === name)
  const indexOfItem = data.indexOf(itemFound)
  data.splice(indexOfItem, 1)
  res.send('What Have you done? You Killed Kenny')
})
