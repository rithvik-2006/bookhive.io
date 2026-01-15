import Link from "next/link"
import { Star } from "lucide-react"

interface BookCardProps {
  id: string
  title: string
  author: string
  genre: string
  rating: number
  reviewCount: number
}

export function BookCard({ id, title, author, genre, rating, reviewCount }: BookCardProps) {
  return (
    <Link href={`/books/${id}`}>
      <div className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 h-full flex flex-col cursor-pointer group">
        <div className="aspect-[3/4] bg-gradient-to-br from-primary/20 to-accent/20 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center text-foreground/20">
            <span className="text-4xl font-bold">{title[0]}</span>
          </div>
        </div>

        <div className="p-4 flex-1 flex flex-col">
          <h3 className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-1">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-1">{author}</p>

          <div className="flex items-center justify-between mt-auto mb-3">
            <span className="inline-block px-2 py-1 bg-secondary/50 text-secondary-foreground text-xs rounded font-medium">
              {genre}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={i < Math.round(rating) ? "fill-primary text-primary" : "text-border"}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground ml-1">
              {rating.toFixed(1)} ({reviewCount})
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
