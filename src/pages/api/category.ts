// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import dbConnect from "@/lib/dbConnect";
import { Category } from "@/models";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const category = await Category.find(
          {}
        ); /* find all the data in our database */
        res.status(200).json({ success: true, data: category });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const { title } = JSON.parse(req.body);

        const category = await Category.create({ title });

        res.status(201).json({ success: true, data: category });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    default:
      res.status(400).json({ success: false });
  }
}
