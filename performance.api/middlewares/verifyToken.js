import jwt from "jsonwebtoken";

const verifyToken = async (ctx, next) => {
    const token = ctx.headers.authorization;

    if (!token) {
        ctx.body = {
            success: false,
            message: "Token inválido ou não existe!",
        };
        return (ctx.status = 401);
    }

    return jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            ctx.body = {
                success: false,
                message:
                    "Token não autorizado ou expirou, tente fazer o login novamente!",
            };
            return (ctx.status = 401);
        }

        ctx.status = 200;
        await next();
    });
};

export default verifyToken