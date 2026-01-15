import { Star } from "lucide-react"

interface ReviewCardProps {
  username: string
  avatar: string
  rating: number
  text: string
  date: string
}

export function ReviewCard({ username, avatar, rating, text, date }: ReviewCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-4 sm:p-6">
      <div className="flex items-start gap-4 mb-3">
        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm flex-shrink-0">
          {avatar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h4 className="font-semibold text-foreground text-sm">{username}</h4>
            <span className="text-xs text-muted-foreground flex-shrink-0">{date}</span>
          </div>
          <div className="flex gap-1 mt-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} className={i < rating ? "fill-primary text-primary" : "text-border"} />
            ))}
          </div>
        </div>
      </div>
      <p className="text-sm text-foreground leading-relaxed">{text}</p>
    </div>
  )
}
