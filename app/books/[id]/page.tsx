"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { ReviewCard } from "@/components/review-card"
import { StarRating } from "@/components/star-rating"
import { Star, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"



export default function BookDetailsPage() {
  const { id } = useParams()

  const [rating, setRating] = useState(0)
  const [review, setReview] = useState("")
  const [book, setBook] = useState<any | null>(null)
  const [reviews, setReviews] = useState<any[]>([])
  const { user } = useAuth()

  useEffect(() => {
    if (!id) return
    fetch(`/api/books/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBook(data.book)
        setReviews(data.reviews)
      })
      .catch(() => {
        setBook(null)
        setReviews([])
      })
  }, [id])

  const handleSubmitReview = async () => {
    if (!id || !user) return

    await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bookId: id,
        rating,
        text: review,
        user: {
          uid: user.uid,
          name: user.displayName,
        },
      }),
    })

    setReview("")
    setRating(0)

    // re-fetch reviews
    fetch(`/api/books/${id}`)
      .then((res) => res.json())
      .then((data) => setReviews(data.reviews))
      .catch(() => {})
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">Loading...</main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8"
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Back to Books</span>
        </Link>

        {/* Book Header */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
          <div className="sm:col-span-1">
            <div className="aspect-[3/4] bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center text-foreground/30">
              <span className="text-6xl font-bold">{book.title[0]}</span>
            </div>
          </div>

          <div className="sm:col-span-2">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">{book.title}</h1>
            <p className="text-lg text-muted-foreground mb-4">{book.author}</p>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={i < Math.round(book.rating) ? "fill-primary text-primary" : "text-border"}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {book.rating} ({book.reviewCount} reviews)
              </span>
            </div>

            <div className="mb-6">
              <span className="inline-block px-3 py-1 bg-secondary/50 text-secondary-foreground text-sm rounded font-medium">
                {book.genre}
              </span>
            </div>

            <div>
              <h2 className="text-sm font-semibold text-foreground mb-3">About</h2>
              <p className="text-foreground leading-relaxed">{book.description}</p>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-foreground mb-6">Reviews</h2>
            <div className="space-y-4">
              {reviews.map((review, idx) => (
                <ReviewCard key={idx} {...review} />
              ))}
            </div>
          </div>

          {/* Write Review */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 sticky top-20">
              <h3 className="text-lg font-bold text-foreground mb-4">Write a Review</h3>

              <div className="mb-4">
                <label className="block text-sm font-medium text-foreground mb-3">Your Rating</label>
                <StarRating value={rating} onChange={setRating} />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-foreground mb-2">Your Review</label>
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Share your thoughts about this book..."
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm resize-none"
                  rows={5}
                />
              </div>

              <button
                onClick={handleSubmitReview}
                disabled={!user}
                className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-60"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
