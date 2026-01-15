"use client"

import { useState } from "react"
import { Star } from "lucide-react"

interface StarRatingProps {
  value: number
  onChange: (value: number) => void
}

export function StarRating({ value, onChange }: StarRatingProps) {
  const [hoverValue, setHoverValue] = useState(0)

  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => onChange(star)}
          onMouseEnter={() => setHoverValue(star)}
          onMouseLeave={() => setHoverValue(0)}
          className="transition-transform hover:scale-110"
        >
          <Star size={28} className={star <= (hoverValue || value) ? "fill-primary text-primary" : "text-border"} />
        </button>
      ))}
    </div>
  )
}
