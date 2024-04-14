const express = require('express')
const cors = require('cors')


// import controllers.
const findJob = require('./controllers/findJob.js')
const findFreelancer = require('./controllers/findFreelancer.js')

const app = express()

app.use(express.json())
app.use(cors())

app.get('/api/find-job', findJob.index) // finding the first page jobs.

app.get('/api/find-job/:page_number', findJob.index) // search in specific page.

app.get('/api/find-freelancers/:page_number', findFreelancer.index) // get freelancers.

app.all("*", (request, response) => {
    response.status(404).json({
        'error 404': 'Endpoint not found'
    })
})

app.listen(5000, _ => {
    console.log("Server Started at Port 5000...")
})
