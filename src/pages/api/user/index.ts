import { User } from "@/models";
import dbConnect from "@/lib/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";
import config from "@/config";

let bcrypt = require("bcryptjs");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const { email, password } = JSON.parse(req.body);

        const salt = bcrypt.genSaltSync(config.saltRounds);
        const hash = bcrypt.hashSync(password, salt);

        await User.create({
          email,
          hash,
        });

        res.status(201).json({ res: "ok" });
      } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Inter server error" });
      }
      break;
    default:
      res.status(400).json({ message: "Not Found" });
      break;
  }
}
