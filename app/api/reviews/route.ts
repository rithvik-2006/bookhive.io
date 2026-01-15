// import { NextResponse } from "next/server"
// import { connectDB } from "@/lib/mongodb"
// import { Review } from "@/models/Review"

// export async function POST(req: Request) {
//   const body = await req.json()

//   const { bookId, rating, text, user } = body

//   if (!bookId || !rating || !text || !user?.uid) {
//     return NextResponse.json({ message: "Missing fields" }, { status: 400 })
//   }

//   await connectDB()

//   const review = await Review.create({
//     bookId,
//     rating,
//     text,
//     user,
//   })

//   return NextResponse.json(review, { status: 201 })
// }

import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { Review } from "@/models/Review"

export async function POST(req: Request) {
  const body = await req.json()
  const { bookId, rating, text, user } = body

  if (!bookId || !rating || !text || !user?.uid) {
    return NextResponse.json({ message: "Missing fields" }, { status: 400 })
  }

  await connectDB()

  const review = await Review.create({
    bookId,
    rating,
    text,
    user,
  })

  return NextResponse.json(review, { status: 201 })
}
