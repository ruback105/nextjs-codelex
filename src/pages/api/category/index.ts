import { Category } from "@/models";
import dbConnect from "@/lib/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const categories = await Category.find({}).limit(
          query.limit ? Number(query.limit) : 12
        );
        res.status(200).json({ res: "ok", categories });
      } catch (e) {
        res.status(500).json({ message: "Inter server error" });
      }
      break;
    case "POST":
      try {
        const { title, key } = JSON.parse(req.body);

        const category = await Category.create({
          title,
          key: key.toLocaleLowerCase().trim(),
        });

        res
          .status(201)
          .json({ res: "ok", category, key: key || title.toLocaleLowerCase() });
      } catch (e) {
        res.status(500).json({ message: "Inter server error" });
      }
      break;
    default:
      res.status(400).json({ message: "Not Found" });
      break;
  }
}
