import { env } from "@/env";
import { SignOptions } from "jsonwebtoken";

type JwtConfig = {
  secret: string;
  expiresIn: SignOptions["expiresIn"]; // <- tipo exato aceito pelo jsonwebtoken
};

export const authConfig: { jwt: JwtConfig } = {
  jwt: {
    secret: env.JWT_SECRET,
    expiresIn: "1d",
  },
};
