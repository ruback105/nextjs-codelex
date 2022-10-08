import { Schema, models, model, Model } from "mongoose";

export type UserProps = {
  _id?: string;
  email: string;
  hash: string;
  name?: string;
};

const UserSchema = new Schema<UserProps>({
  email: {
    type: String,
    required: [true, "Please enter your email"],
  },
  hash: {
    type: String,
    required: [true, "No hash provided"],
  },
  name: {
    type: String,
    required: false,
  },
});

const User: Model<UserProps> = models.User || model("User", UserSchema);

export default User;
