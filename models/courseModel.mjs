import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
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
