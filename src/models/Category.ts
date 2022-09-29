import { Schema, models, model, Model } from "mongoose";

export type CategoryProps = {
  _id?: string;
  title: string;
  key: Lowercase<string>;
};

const CategorySchema = new Schema<CategoryProps>({
  title: {
    type: String,
    required: [true, "Please provide category name"],
  },
  key: {
    type: String,
    required: [true, "Please provide category name"],
    lowercase: true,
    trim: true,
  },
});

const Category: Model<CategoryProps> =
  models.Category || model("Category", CategorySchema);

export default Category;
