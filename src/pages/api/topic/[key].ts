import dbConnect from "@/lib/dbConnect";
import { Topic } from "@/models";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const { query } = req;

  const { key, limit } = query;

  try {
    if (!key) {
      res.status(404).json({ message: "Category key missing", topics: [] });
    } else {
      const topics = await Topic.find({ category_key: key }).limit(
        Number(limit) ?? 12
      );

      res.status(200).json({ res: "ok", topics });
    }
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
}
