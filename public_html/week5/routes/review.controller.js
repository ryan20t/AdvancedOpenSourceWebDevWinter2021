var Review = require('./review.model')
var debug = require('debug')('demo:review')

//JSON delivery function
function sendJSONresponse(res, status, content){
    res.status(status)
    res.json(content)
}

/**
 * ROUTE FUNCTIONS
 */

 //Get all reviews
module.exports.reviewsReadAll = (req, res) => {
    debug('Getting all reviews')
    Review.find().exec().then((results) => {
        sendJSONresponse(res, 200, results)
    }).catch((err) => {
        sendJSONresponse(res, 404, err)
    })
}

 //Get a single review
 module.exports.reviewsReadOne = (req, res) => {
    //validate ID
    if (req.params && req.params.reviewid){
        //search
        debug('Get single review with ID = ', req.params.reviewid)
        Review.findById(req.params.reviewid).exec().then((results) => {
            sendJSONresponse(res, 200, results)
        }).catch((err) => {
            sendJSONresponse(res, 404, {
                "message":"Review ID not found"
            })
        })
    }else{
        sendJSONresponse(res, 404, {
            "message":"Review ID not found."
        })
    }
}

//Post routes (/api/v1/reviews)
module.exports.reviewsCreate = (req, res) => {
    debug('Creating a review', req.body)
    Review.create({
        author: req.body.author,
        rating: req.body.rating,
        reviewText: req.body.reviewText
    }).then((dataSaved) => {
        debug(dataSaved)
        sendJSONresponse(res, 201, dataSaved)
    }).catch((err) => {
        debug(err)
        sendJSONresponse(res, 400, err)
    })
}

//Put route - update
module.exports.reviewsUpdateOne = (req, res) => {
    //validate we got the ID
    if (!req.params.reviewid){
        sendJSONresponse(res, 404, {
            "message": "Not found, review ID required"
        })
        return
    }
    //update
    Review.findById(req.params.reviewid).exec()
    .then((reviewData) => {
        reviewData.author = req.body.author
        reviewData.rating = req.body.rating
        reviewData.reviewText = req.body.reviewText
        return reviewData.save()
    }).then((data) => {
        sendJSONresponse(res, 200, data)
    }).catch((err) => {
        sendJSONresponse(res, 400, err)
    })
}

//Delete route
module.exports.reviewsDeleteOne = (req, res) => {
    //validate we got the ID
    if (!req.params.reviewid){
        sendJSONresponse(res, 404, {
            "message": "Not found, review ID required"
        })
        return
    }
    //delete
    Review.findByIdAndRemove(req.params.reviewid).exec()
    .then((data) => {
        debug("Review ID " + req.params.reviewid + " deleted")
        debug(data)
        sendJSONresponse(res, 204, null)
    }).catch((err) => {
        sendJSONresponse(res, 404, err)
    })
}