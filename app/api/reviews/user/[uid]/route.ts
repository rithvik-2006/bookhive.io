// import { NextResponse } from "next/server"
// import { connectDB } from "@/lib/mongodb"
// import { Review } from "@/models/Review"

// export async function GET(
//   _: Request,
//   { params }: { params: { uid: string } }
// ) {
//   await connectDB()

//   const reviews = await Review.find({ "user.uid": params.uid })
//     .sort({ createdAt: -1 })
//     .limit(10)
//     .lean()

//   return NextResponse.json(
//     reviews.map((r) => ({
//       username: r.user.name || "You",
//       avatar: r.user.name?.slice(0, 2).toUpperCase() || "U",
//       rating: r.rating,
//       text: r.text,
//       date: r.createdAt,
//     }))
//   )
// }

// export async function OPTIONS() {
//   return new NextResponse(null, {
//     status: 200,
//     headers: {
//       "Access-Control-Allow-Origin": "*",
//       "Access-Control-Allow-Methods": "GET, OPTIONS",
//       "Access-Control-Allow-Headers": "Content-Type",
//     },
//   })
// }

import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { Review } from "@/models/Review"

export async function GET(
  _req: Request,
  context: { params: Promise<{ uid: string }> }
) {
  const { uid } = await context.params   // ✅ IMPORTANT

  await connectDB()

  const reviews = await Review.find({ "user.uid": uid })
    .sort({ createdAt: -1 })
    .limit(10)
    .lean()

  return NextResponse.json(
    reviews.map((r) => ({
      username: r.user.name || "You",
      avatar: r.user.name?.slice(0, 2).toUpperCase() || "U",
      rating: r.rating,
      text: r.text,
      date: r.createdAt,
    }))
  )
}
