//Example for how you can create your own modules

module.exports.build = function(size){    
    //Table structure
    var grid = "<table><tbody>"

    //Loop to add rows
    for (var i = 0; i < size; i++){
        grid += "<tr>"
        for (var j = 0; j < size; j++){
            var color = ((1<<24)*Math.random()|0).toString(16)
            grid += "<td style='background-color: #" + color + ";'>" + color + "<br /><span style='color: #ffffff;'>" + color + "</span></td>"
        }
        grid += "</tr>"
    }
    grid += "</tbody></table>"
    return grid
}