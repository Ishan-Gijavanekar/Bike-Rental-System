import jwt from 'jsonwebtoken'

const securedRoute = async(req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({message: "Unauthorized"});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.log(`Error in secureRoute: ${error}`);
    }
}

export {securedRoute}