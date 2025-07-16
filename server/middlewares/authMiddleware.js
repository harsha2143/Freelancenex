import jwt from "jsonwebtoken";
import Client from "../models/client.js";
import Freelancer from "../models/freelancer.js";

export const checkAuth = async (req, res, next) => {
    try {
        // Get token from cookies
        const token = req.cookies?.jwt;
        if (!token) {
            return res.status(401).json({ message: "No token, authorization denied" });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        const userId = decoded.userId;

        // Try to find user in Client or Freelancer collections
        let user = await Client.findById(userId).select("-password");
        if (!user) {
            user = await Freelancer.findById(userId).select("-password");
        }
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        // Attach user to request
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};
