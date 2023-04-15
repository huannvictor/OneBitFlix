import jwt from "jsonwebtoken";

const secret = "chave-do-jwt"; // essa chave será trocada no futuro. //!É uma falha de segurança deixar assim.

export const jwtService = {
  signToken: (payload: string | object | Buffer, expiration: string) => {
    return jwt.sign(payload, secret, {
      expiresIn: expiration,
    });
  },

  verifyToken: (token: string, callbackfn: jwt.VerifyCallback) => {
    jwt.verify(token, secret, callbackfn);
  },
};
