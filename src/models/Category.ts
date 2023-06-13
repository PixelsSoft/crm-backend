import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Category name is required"],
  },
});

const Category = mongoose.model("Category", CategorySchema);

export default Category;
