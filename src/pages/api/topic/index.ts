import { Category, Topic } from "@/models";
import dbConnect from "@/lib/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";
import { TopicProps } from "@/models/Topic";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req;

  const { id } = query;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        if (!id) {
          res.status(400).json({ message: "Required param id is missing" });
        }

        const topic = await Topic.findById(id);

        res.status(200).json({ res: "ok", topic });
      } catch (e) {
        res.status(500).json({ message: "Inter server error" });
      }
      break;
    case "POST":
      try {
        const topicBody: TopicProps = JSON.parse(req.body);

        const topic = await Topic.create(topicBody);

        res.status(201).json({ res: "ok", topic });
      } catch (e) {
        res.status(500).json({ message: "Inter server error" });
      }
      break;
    default:
      res.status(400).json({ message: "Not Found" });
      break;
  }
}
