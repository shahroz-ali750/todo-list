module.exports = (req, res, next)=>{
    try {
        let userRole = req.user.userRole
        console.log(userRole)
        if(userRole !== "admin"){
            return res.status(403).json({ message: "Access denied. Admins only." });
        }
        next()
        
    } catch (error) {
        res.status(401).json({ message:"Only admin can access ." });
    }
}