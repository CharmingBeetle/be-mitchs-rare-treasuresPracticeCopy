exports.handlePsqlErrors = (err, req, res, next)=> {
    if(err.code === "22P02") {
       return res.status(400).send({msg: "bad request"})
    }
    next(err)
}

exports.handleCustomErrors = (err, req, res, next)=> {
    if(err.status){ //if error object has status key
       return res.status(err.status).send({msg: err.msg})
    }
    next(err)
}

exports.handleServerErrors = (err, req, res, next)=> {
    // console.log(err)
    res.status(500).send({mgs: "Something broke!"})
}