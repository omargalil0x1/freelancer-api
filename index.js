const express = require('express')

// import controllers.
const findJob = require('./controllers/findJob.js')

const app = express()

app.get('/api/find-job', findJob.index) // finding the first page jobs.
app.get('/api/find-job/:page_number', findJob.index) // search in specific page.

app.all("*", (request, response) => {
    response.status(404).json({
        'error 404': 'Endpoint not found'
    })
})

app.listen(5000, _ => {
    console.log("Server Started at Port 5000...")
})
