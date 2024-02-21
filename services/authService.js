import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const data = {
  aud: "doordash",
  iss: process.env.developer_id,
  kid: process.env.key_id,
  exp: Math.floor(Date.now() / 1000 + 300),
  iat: Math.floor(Date.now() / 1000),
};

const headers = { algorithm: "HS256", header: { "dd-ver": "DD-JWT-V1" } };

const token = jwt.sign(
  data,
  Buffer.from(process.env.signing_secret, "base64"),
  headers
);
export { token };
