const adminAuth = (req,res,next)=>{
    const token='xyz'
    const isAuth=token==='xyz'
    if(!isAuth)
        res.status(401).send("unAuthorized Admin ")
    else 
        next()
}


const userAuth = (req,res,next)=>{
    const token='xyz'
    const isAuth=token==='xyz'
    if(!isAuth)
        res.status(401).send("unAuthorized User")
    else 
        next()
}


module.exports={userAuth,adminAuth} 