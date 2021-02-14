var Review = require('./employee.model')
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
module.exports.employeeReadAll = (req, res) => {
    debug('Getting all employees')

    //store params in variable
    var searchParams = req.query
    //pull out sort info
    var sort = null
    if (req.query._sort){
        sort = req.query._sort
    }
    //remove sort from params
    delete searchParams['_sort']

    //query
    Review.find(searchParams).sort(sort).exec().then((results) => {
        sendJSONresponse(res, 200, results)
    }).catch((err) => {
        sendJSONresponse(res, 404, err)
    })
}

 //Get a single review
 module.exports.employeeReadOne = (req, res) => {
    //validate ID
    if (req.params && req.params.employeeid){
        //search
        debug('Get single employee with ID = ', req.params.employeeid)
        Review.findById(req.params.employeeid).exec().then((results) => {
            sendJSONresponse(res, 200, results)
        }).catch((err) => {
            sendJSONresponse(res, 404, {
                "message":"Employee ID not found"
            })
        })
    }else{
        sendJSONresponse(res, 404, {
            "message":"Employee ID not found."
        })
    }
}

//Post routes (/api/employees)
module.exports.employeeCreate = (req, res) => {
    debug('Creating an employee', req.body)
    Review.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        department: req.body.department,
        startDate: req.body.startDate,
        jobTitle: req.body.jobTitle,
        salary: req.body.salary
    }).then((dataSaved) => {
        debug(dataSaved)
        sendJSONresponse(res, 201, dataSaved)
    }).catch((err) => {
        debug(err)
        sendJSONresponse(res, 400, err)
    })
}

//Put route - update
module.exports.employeeUpdateOne = (req, res) => {
    //validate we got the ID
    if (!req.params.employeeid){
        sendJSONresponse(res, 404, {
            "message": "Not found, employee ID required"
        })
        return
    }
    //update
    Employee.findById(req.params.employeeid).exec()
    .then((employeeData) => {
        employeeData.firstName = req.body.firstName
        employeeData.lastName = req.body.lastName
        employeeData.department = req.body.department,
        employeeData.startDate = req.body.startDate,
        employeeData.jobTitle = req.body.jobTitle,
        employeeData.salary = req.body.salary
        return employeeData.save()
    }).then((data) => {
        sendJSONresponse(res, 200, data)
    }).catch((err) => {
        sendJSONresponse(res, 400, err)
    })
}

//Delete route
module.exports.employeeDeleteOne = (req, res) => {
    //validate we got the ID
    if (!req.params.employeeid){
        sendJSONresponse(res, 404, {
            "message": "Not found, employee ID required"
        })
        return
    }
    //delete
    Employee.findByIdAndRemove(req.params.employeeid).exec()
    .then((data) => {
        debug("Employee ID " + req.params.employeeid + " deleted")
        debug(data)
        sendJSONresponse(res, 204, null)
    }).catch((err) => {
        sendJSONresponse(res, 404, err)
    })
}