import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
  },

  email: {
    type: String,
    unique: true,
    sparse: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },

  age: {
    type: Number,
    require: true,
  },

  password: {
    type: String,
    required: true,
    minlength: 6,
  },
});

export default mongoose.model("User", userSchema);
