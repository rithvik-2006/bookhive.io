// import { NextResponse } from "next/server"
// import { connectDB } from "@/lib/mongodb"
// import { Book } from "@/models/Book"
// import { Review } from "@/models/Review"

// export async function GET() {
//   await connectDB()

//   const books = await Book.find().lean()

//   const booksWithStats = await Promise.all(
//     books.map(async (book) => {
//       const reviews = await Review.find({ bookId: book._id })
//       const avgRating =
//         reviews.reduce((a, r) => a + r.rating, 0) / (reviews.length || 1)

//       return {
//         id: book._id.toString(),
//         title: book.title,
//         author: book.author,
//         genre: book.genre,
//         rating: Number(avgRating.toFixed(1)),
//         reviewCount: reviews.length,
//       }
//     })
//   )

//   return NextResponse.json(booksWithStats)
// }

import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { Book } from "@/models/Book"
import { Review } from "@/models/Review"

// ✅ GET ALL BOOKS
export async function GET() {
  await connectDB()

  const books = await Book.find().lean()

  const booksWithStats = await Promise.all(
    books.map(async (book) => {
      const reviews = await Review.find({ bookId: book._id })
      const avgRating =
        reviews.reduce((a, r) => a + r.rating, 0) / (reviews.length || 1)

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

// ✅ POST ADD BOOK
export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { title, author, genre, description, user } = body

    if (!title || !author || !genre || !description || !user?.uid) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      )
    }

    await connectDB()

    const book = await Book.create({
      title,
      author,
      genre,
      description,

      // store UID directly for fast queries
      userUid: user.uid,
      userName: user.displayName || user.name,
      userEmail: user.email,
    })

    return NextResponse.json(book, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { message: "Failed to add book" },
      { status: 500 }
    )
  }
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

