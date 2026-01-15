"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { BookCard } from "@/components/book-card"
import { ChevronDown } from "lucide-react"



const genres = [
  "All",
  "Fiction",
  "Self-Help",
  "Science Fiction",
  "Mystery",
  "Memoir",
  "Historical Fiction",
  "Non-Fiction",
]

export default function Home() {
  const [selectedGenre, setSelectedGenre] = useState("All")
  const [isGenreOpen, setIsGenreOpen] = useState(false)
  const [books, setBooks] = useState<any[]>([])

  useEffect(() => {
    fetch("/api/books")
      .then((res) => res.json())
      .then(setBooks)
      .catch(() => setBooks([]))
  }, [])

  const filteredBooks =
    selectedGenre === "All" ? books : books.filter((book) => book.genre === selectedGenre)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 text-balance">
            Discover Books.
            <br />
            Share Reviews.
            <br />
            Read Better.
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Join a community of book lovers and discover your next favorite read
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex items-center gap-4 flex-wrap">
          <span className="text-sm font-medium text-muted-foreground">Filter by genre:</span>
          <div className="relative">
            <button
              onClick={() => setIsGenreOpen(!isGenreOpen)}
              className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg bg-card hover:bg-secondary transition-colors"
            >
              {selectedGenre}
              <ChevronDown size={16} />
            </button>
            {isGenreOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-10">
                {genres.map((genre) => (
                  <button
                    key={genre}
                    onClick={() => {
                      setSelectedGenre(genre)
                      setIsGenreOpen(false)
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-secondary transition-colors first:rounded-t-lg last:rounded-b-lg ${
                      selectedGenre === genre ? "bg-primary/10 text-primary font-semibold" : "text-foreground"
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            )}
          </div>
          <span className="text-sm text-muted-foreground ml-auto">{filteredBooks.length} books</span>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} {...book} />
          ))}
        </div>
      </main>
    </div>
  )
}
