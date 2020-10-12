const notFound = (req,res,next)=>{
    const error = new Error(`Not found -${req.OriginalUrl}`)
    res.status(404)
    next(error)
}

// Error handling middleware 
const errorHandler = (req,res,next)=>{
    const statusCode = res.statusCode === 200 ? 500  : res.statusCode
    res.status(statusCode);
    res.json({
        message:error.message
    })
}

module.exports ={
    notFound,
    errorHandler
}