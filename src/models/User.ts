import { Schema, models, model, Model } from "mongoose";

export type UserProps = {
  _id?: string;
  email: string;
  hash: string;
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
});

const User: Model<UserProps> = models.User || model("User", UserSchema);

export default User;
