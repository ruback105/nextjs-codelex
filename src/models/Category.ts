import { model, models, Schema, Document, Model } from "mongoose";

export interface ICategory extends Document {
  title: string;
}

const categorySchema: Schema = new Schema<ICategory>({
  title: {
    type: String,
    required: [true, "Please enter category title."],
  },
});

const Category: Model<ICategory> =
  models.Category || model<ICategory>("Category", categorySchema);

export default Category;
