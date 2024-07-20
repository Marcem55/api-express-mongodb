import mongoose from "mongoose";
const Schema = mongoose.Schema;

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  description: {
    type: String,
    required: false,
  },
  state: {
    type: Boolean,
    default: true,
  },
  image: {
    type: String,
    required: false,
    default: "../assets/courseImage.jpg",
  },
  students: {
    type: Number,
    default: 0,
  },
  raiting: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model("Course", courseSchema);
