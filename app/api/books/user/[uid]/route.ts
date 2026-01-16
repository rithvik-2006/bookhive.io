import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { Book } from "@/models/Book"
import { Review } from "@/models/Review"

export async function GET(
  _req: Request,
  context: { params: Promise<{ uid: string }> }
) {
  const { uid } = await context.params

  await connectDB()

  const books = await Book.find({ userUid: uid }).sort({ createdAt: -1 }).lean()

  const booksWithStats = await Promise.all(
    books.map(async (book) => {
      const reviews = await Review.find({ bookId: book._id }).lean()
      const avgRating =
        reviews.length === 0
          ? 0
          : reviews.reduce((a, r) => a + r.rating, 0) / reviews.length

      return {
        id: book._id.toString(),
        title: book.title,
        author: book.author,
        genre: book.genre,
        rating: Number(avgRating.toFixed(1)),
        reviewCount: reviews.length,
      }
    })
  )

  return NextResponse.json(booksWithStats)
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  })
}
