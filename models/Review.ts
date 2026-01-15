import mongoose, { Schema, models } from "mongoose"

const ReviewSchema = new Schema(
  {
    bookId: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    rating: { type: Number, required: true },
    text: { type: String, required: true },
    user: {
      uid: { type: String, required: true },
      name: { type: String },
    },
  },
  { timestamps: true }
)

export const Review = models.Review || mongoose.model("Review", ReviewSchema)
