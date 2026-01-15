import mongoose, { Schema, models } from "mongoose"

const BookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    description: { type: String, required: true },

    createdBy: {
      uid: { type: String, required: true },
      name: { type: String },
      email: { type: String },
    },
  },
  { timestamps: true }
)

export const Book = models.Book || mongoose.model("Book", BookSchema)
