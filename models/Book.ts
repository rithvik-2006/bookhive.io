
// import mongoose, { Schema, models } from "mongoose"

// const BookSchema = new Schema(
//   {
//     title: { type: String, required: true },
//     author: { type: String, required: true },
//     genre: { type: String, required: true },
//     description: { type: String, required: true },

//     // ✅ EXPLICIT USER FIELDS
//     userUid: { type: String, required: true, index: true },
//     userName: { type: String },
//     userEmail: { type: String },
//   },
//   { timestamps: true }
// )

// export const Book = models.Book || mongoose.model("Book", BookSchema)

import mongoose, { Schema, models } from "mongoose"

const BookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    description: { type: String, required: true },

    // ✅ NEW USER FIELDS (REPLACE createdBy)
    userUid: { type: String, required: true, index: true },
    userName: { type: String },
    userEmail: { type: String },
  },
  { timestamps: true }
)

export const Book = models.Book || mongoose.model("Book", BookSchema)
