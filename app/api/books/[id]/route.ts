import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { Book } from "@/models/Book"
import { Review } from "@/models/Review"

export async function GET(
  _: Request,
  { params }: { params: { id: string } }
) {
  await connectDB()

  const book = await Book.findById(params.id).lean()
  if (!book) {
    return NextResponse.json({ message: "Not found" }, { status: 404 })
  }

  const reviews = await Review.find({ bookId: book._id })
    .sort({ createdAt: -1 })
    .lean()

  const avgRating =
    reviews.reduce((a, r) => a + r.rating, 0) / (reviews.length || 1)

  return NextResponse.json({
    book: {
      id: book._id.toString(),
      title: book.title,
      author: book.author,
      genre: book.genre,
      description: book.description,
      rating: Number(avgRating.toFixed(1)),
      reviewCount: reviews.length,
    },
    reviews: reviews.map((r) => ({
      username: r.user.name || "Anonymous",
      avatar: r.user.name?.slice(0, 2).toUpperCase() || "U",
      rating: r.rating,
      text: r.text,
      date: r.createdAt,
    })),
  })
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  })
}
