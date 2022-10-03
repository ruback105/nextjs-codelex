import { User } from "@/models";
import dbConnect from "@/lib/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";
import { UserProps } from "@/models/User";

export type ResponseProps = {
  message?: string;
  user?: UserProps;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseProps>
) {
  const { query } = req;

  if (!query?.email) {
    res.status(400).json({ message: "No email provided" });
  }

  await dbConnect();

  try {
    const { email } = query;

    const user = (await User.findOne({ email })) as UserProps;

    res.status(200).json({ user });
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}
