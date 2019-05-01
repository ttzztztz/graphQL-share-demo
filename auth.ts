import { AuthChecker } from "type-graphql";
import jwt from "jsonwebtoken";

const SECRET = "hzytql";

export const signJWT = function(uid: string, username: string, role: string) {
    return jwt.sign(
        {
            uid: uid,
            username: username,
            role: role
        },
        SECRET,
        {
            expiresIn: 86400
        }
    );
};

export const verifyJWT = function(token?: string) {
    if (!token) {
        throw new Error("No token provided");
    }
    if (token.indexOf("Bearer ") === 0) {
        token = token.replace("Bearer ", "");
    }
    return jwt.verify(token, SECRET) as any;
};

export const authChecker: AuthChecker = (context: any, roles) => {
    const { role } = verifyJWT(context.context.req.headers["Authorization"]);
    // some logics about role

    return true;
};
