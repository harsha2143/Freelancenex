import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_TOKEN, {
        expiresIn: "7d"
    });

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, //Ms
        httpOnly: true, //prevents XSS attcks from cross-site scripting attacks ,can be works through only http requests not with javascript commands
        sameSite: "strict", // CSRF attcks corss-site request frogery attacks
        secure: process.env.NODE_ENV !== "development"
    });

    return token;
}