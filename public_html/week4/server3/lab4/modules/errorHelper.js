//Example for how you can create your own modules

module.exports.notFound = function(){    
    //Table structure
    var errorPage = "<h1>Not Found</h1>"
    var numberToShow = 20 + Math.round(Math.random() * 31)
    var classes = ["shrink", "rotate", "still"]

    //Loop to add rows
    for (var i = 0; i < numberToShow; i++){
        errorPage += ("<div class='" + classes[Math.round(Math.random() * 2)] + "'>404</div>")
    }
    
    return errorPage
}