import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
}

export default handler;
