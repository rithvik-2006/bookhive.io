

"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { onAuthStateChanged, User } from "firebase/auth"
import { auth } from "@/lib/firebase"

import { Navbar } from "@/components/navbar"
import { ReviewCard } from "@/components/review-card"
import { BookCard } from "@/components/book-card"

const userReviews = [
  {
    username: "You",
    avatar: "U",
    rating: 5,
    text: "Absolutely loved this book! The character development was outstanding.",
    date: "1 week ago",
  },
  {
    username: "You",
    avatar: "U",
    rating: 4,
    text: "Great read with some truly inspiring moments.",
    date: "2 weeks ago",
  },
]

const userBooksReviewed = [
  { id: "1", title: "The Midnight Library", author: "Matt Haig", genre: "Fiction", rating: 4.5, reviewCount: 1280 },
  { id: "2", title: "Atomic Habits", author: "James Clear", genre: "Self-Help", rating: 4.7, reviewCount: 2150 },
]

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/login")
        return
      }
      setUser(currentUser)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [router])

  if (loading || !user) {
    return null
  }

  const initials =
    user.displayName?.slice(0, 2).toUpperCase() ||
    user.email?.slice(0, 2).toUpperCase() ||
    "U"

  const joinedYear = user.metadata.creationTime
    ? new Date(user.metadata.creationTime).getFullYear()
    : "—"

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Profile Header */}
        <div className="bg-card border border-border rounded-lg p-6 sm:p-8 mb-8">
          <div className="flex items-start gap-6 mb-6">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl">
              {initials}
            </div>

            <div className="flex-1">
              <h1 className="text-3xl font-bold text-foreground mb-1">
                {user.displayName || "Anonymous Reader"}
              </h1>
              <p className="text-muted-foreground mb-4">
                {user.email}
              </p>

              <div className="flex gap-6 flex-wrap">
                <div>
                  <span className="block text-sm text-muted-foreground">
                    Books Reviewed
                  </span>
                  <span className="block text-2xl font-bold text-foreground">
                    {userReviews.length}
                  </span>
                </div>

                <div>
                  <span className="block text-sm text-muted-foreground">
                    Member Since
                  </span>
                  <span className="block text-2xl font-bold text-foreground">
                    {joinedYear}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Recent Reviews
          </h2>
          <div className="space-y-4">
            {userReviews.map((review, idx) => (
              <ReviewCard key={idx} {...review} />
            ))}
          </div>
        </div>

        {/* Books Reviewed */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Books Reviewed
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {userBooksReviewed.map((book) => (
              <BookCard key={book.id} {...book} />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
