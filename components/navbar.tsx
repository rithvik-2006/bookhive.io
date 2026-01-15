// "use client"

// import Link from "next/link"
// import { Search } from "lucide-react"

// export function Navbar() {
//   return (
//     <nav className="sticky top-0 z-50 bg-background border-b border-border shadow-sm">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           <Link href="/" className="flex items-center gap-2">
//             <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-sm">
//               BH
//             </div>
//             <span className="font-bold text-lg hidden sm:inline">BookHive</span>
//           </Link>

//           <div className="flex-1 max-w-xs mx-4 sm:mx-8">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//               <input
//                 type="text"
//                 placeholder="Search books..."
//                 className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
//               />
//             </div>
//           </div>

//           <div className="flex items-center gap-4">
//             <Link
//               href="/books/add"
//               className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors hidden sm:inline"
//             >
//               Add Book
//             </Link>
//             <Link
//               href="/login"
//               className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
//             >
//               Login
//             </Link>
//             <Link
//               href="/profile"
//               className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xs"
//             >
//               JD
//             </Link>
//           </div>
//         </div>
//       </div>
//     </nav>
//   )
// }
"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Search } from "lucide-react"
import { onAuthStateChanged, signOut, User } from "firebase/auth"
import { auth } from "@/lib/firebase"

export function Navbar() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const handleLogout = async () => {
    await signOut(auth)
  }

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-sm">
              BH
            </div>
            <span className="font-bold text-lg hidden sm:inline">
              BookHive
            </span>
          </Link>

          {/* Search */}
          <div className="flex-1 max-w-xs mx-4 sm:mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search books..."
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
              />
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-4">
            <Link
              href="/books/add"
              className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors hidden sm:inline"
            >
              Add Book
            </Link>

            {!loading && !user && (
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                Login
              </Link>
            )}

            {!loading && user && (
              <>
                <Link
                  href="/profile"
                  className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xs"
                >
                  {user.displayName
                    ? user.displayName.slice(0, 2).toUpperCase()
                    : "U"}
                </Link>

                <button
                  onClick={handleLogout}
                  className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
