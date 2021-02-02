//Example for how you can create your own modules
function rando(){
    return Math.round(Math.random() * 4)
}

function betterRando(){
    return Math.round(Math.random() * 100)
}

module.exports.rando = rando()
module.exports.betterRando = betterRando()