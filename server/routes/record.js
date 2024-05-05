import express from "express"
// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb"

// This will help us connect to the database
import db from "../database/connect.js"

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router()

router.get("/", async (_request, response) => {
  const collection = db.collection("records")
  const results = await collection.find({}).toArray()
  response.send(results).status(200)
})

// This section will help you get a single record by id
router.get("/:id", async (request, response) => {
  const collection = db.collection("records")
  const query = { _id: new ObjectId(request.params.id) }
  const result = await collection.findOne(query)

  if (!result) response.send("Not found").status(404)
  else response.send(result).status(200)
})

router.post("/analyze", async (request, response) => {
  try {
    const message = {
      message: request.body.message,
      date_created: new Date().toISOString(),
    }
    const collection = db.collection("messages")
    const result = await collection.insertOne(message)
    response.send(result).status(204)
  } catch (err) {
    console.error(err)
    response.status(500).send("Error adding message")
  }
})

router.get("/", async (_request, response) => {
  try {
    const collection = db.collection("messages")
    const result = await collection.find({}).toArray()
    response.send(result).status(204)
  } catch (err) {
    console.error(err)
    response.status(500).send("Error fetching messages")
  }
})

// This section will help you deconste a record
router.delete("/:id", async (request, response) => {
  try {
    const query = { _id: new ObjectId(request.params.id) }

    const collection = db.collection("records")
    const result = await collection.deconsteOne(query)

    response.send(result).status(200)
  } catch (err) {
    console.error(err)
    response.status(500).send("Error deleting record")
  }
})

router.post("/clear", async (_request, response) => {
  try {
    db.collection("messages").deleteMany({})
    response.send("Records cleared").status(204)
  } catch (error) {
    console.error(error)
    response.status(500).send("Error clearing records")
  }
})

export default router
