// "use client"

// import { useState } from "react"
// import { Navbar } from "@/components/navbar"
// import { ArrowLeft } from "lucide-react"
// import Link from "next/link"

// const genres = [
//   "Fiction",
//   "Science Fiction",
//   "Mystery",
//   "Self-Help",
//   "Memoir",
//   "Historical Fiction",
//   "Non-Fiction",
//   "Fantasy",
// ]

// export default function AddBookPage() {
//   const [title, setTitle] = useState("")
//   const [author, setAuthor] = useState("")
//   const [genre, setGenre] = useState(genres[0])
//   const [description, setDescription] = useState("")

//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />

//       <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
//         <Link
//           href="/"
//           className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8"
//         >
//           <ArrowLeft size={18} />
//           <span className="text-sm font-medium">Back to Books</span>
//         </Link>

//         <div className="bg-card border border-border rounded-lg p-8 shadow-sm">
//           <h1 className="text-3xl font-bold text-foreground mb-2">Add a New Book</h1>
//           <p className="text-muted-foreground mb-8">Share a book with the BookHive community</p>

//           <form className="space-y-6">
//             <div>
//               <label htmlFor="title" className="block text-sm font-medium text-foreground mb-2">
//                 Book Title *
//               </label>
//               <input
//                 id="title"
//                 type="text"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 placeholder="Enter book title"
//                 className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
//               />
//             </div>

//             <div>
//               <label htmlFor="author" className="block text-sm font-medium text-foreground mb-2">
//                 Author *
//               </label>
//               <input
//                 id="author"
//                 type="text"
//                 value={author}
//                 onChange={(e) => setAuthor(e.target.value)}
//                 placeholder="Enter author name"
//                 className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
//               />
//             </div>

//             <div>
//               <label htmlFor="genre" className="block text-sm font-medium text-foreground mb-2">
//                 Genre *
//               </label>
//               <select
//                 id="genre"
//                 value={genre}
//                 onChange={(e) => setGenre(e.target.value)}
//                 className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
//               >
//                 {genres.map((g) => (
//                   <option key={g} value={g}>
//                     {g}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label htmlFor="description" className="block text-sm font-medium text-foreground mb-2">
//                 Description *
//               </label>
//               <textarea
//                 id="description"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 placeholder="Write a brief description of the book..."
//                 className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
//                 rows={6}
//               />
//             </div>

//             <div className="flex gap-3 pt-4">
//               <button
//                 type="submit"
//                 className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
//               >
//                 Add Book
//               </button>
//               <Link
//                 href="/"
//                 className="flex-1 px-4 py-2 border border-border rounded-lg font-medium text-foreground hover:bg-secondary transition-colors text-center"
//               >
//                 Cancel
//               </Link>
//             </div>
//           </form>
//         </div>
//       </main>
//     </div>
//   )
// }

"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { onAuthStateChanged, User } from "firebase/auth"
import { auth } from "@/lib/firebase"

import { Navbar } from "@/components/navbar"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

const genres = [
  "Fiction",
  "Science Fiction",
  "Mystery",
  "Self-Help",
  "Memoir",
  "Historical Fiction",
  "Non-Fiction",
  "Fantasy",
]

export default function AddBookPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [genre, setGenre] = useState(genres[0])
  const [description, setDescription] = useState("")

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) router.push("/login")
      setUser(u)
    })
    return () => unsub()
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!title || !author || !description) {
      setError("All fields are required")
      return
    }

    try {
      setLoading(true)

      const res = await fetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          author,
          genre,
          description,
          user: {
            uid: user?.uid,
            name: user?.displayName,
            email: user?.email,
          },
        }),
      })

      if (!res.ok) throw new Error("Failed to add book")

      router.push("/")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8"
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Back to Books</span>
        </Link>

        <div className="bg-card border border-border rounded-lg p-8 shadow-sm">
          <h1 className="text-3xl font-bold mb-2">Add a New Book</h1>
          <p className="text-muted-foreground mb-8">
            Share a book with the BookHive community
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <input
              placeholder="Book Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />

            <input
              placeholder="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />

            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            >
              {genres.map((g) => (
                <option key={g}>{g}</option>
              ))}
            </select>

            <textarea
              rows={6}
              placeholder="Book description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />

            {error && (
              <p className="text-sm text-red-500 bg-red-500/10 p-2 rounded">
                {error}
              </p>
            )}

            <button
              disabled={loading}
              className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg disabled:opacity-60"
            >
              {loading ? "Adding..." : "Add Book"}
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}
