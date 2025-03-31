"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ExternalLink, Calendar, Users } from "lucide-react"
import type { LiteratureItem } from "@/types/literature"

interface LiteratureCardProps {
  item: LiteratureItem
}

export default function LiteratureCard({ item }: LiteratureCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "hr":
        return "👥"
      case "leadership":
        return "🚀"
      case "operations":
        return "⚙️"
      case "customer-service":
        return "🎧"
      case "product-management":
        return "📊"
      case "organizational-change":
        return "🔄"
      case "digital-transformation":
        return "💻"
      case "data-ethics":
        return "🛡️"
      default:
        return "📚"
    }
  }

  const getCategoryName = (category: string) => {
    switch (category) {
      case "hr":
        return "Human Resources"
      case "leadership":
        return "Leadership"
      case "operations":
        return "Operations"
      case "customer-service":
        return "Customer Service"
      case "product-management":
        return "Product Management"
      case "organizational-change":
        return "Organizational Change"
      case "digital-transformation":
        return "Digital Transformation"
      case "data-ethics":
        return "Data Ethics"
      default:
        return category
    }
  }

  const truncateSummary = (summary: string, maxLength = 150) => {
    if (summary.length <= maxLength) return summary
    return summary.substring(0, maxLength) + "..."
  }

  return (
    <>
      <Card className="h-full border-0 shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
        <div className="h-1 w-full bg-gradient-to-r from-primary/40 to-primary group-hover:from-primary group-hover:to-primary/80 transition-colors duration-300" />
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <Badge variant="outline" className="mb-2 flex items-center gap-1 hover:bg-slate-100 cursor-pointer">
              {getCategoryIcon(item.category)}
              <span>{getCategoryName(item.category)}</span>
            </Badge>
            <span className="text-sm text-slate-400 flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {item.year}
            </span>
          </div>
          <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
          <CardDescription className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            <span>{item.authors}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-600 mb-4">{truncateSummary(item.summary)}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {item.keywords.slice(0, 3).map((keyword, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {keyword}
              </Badge>
            ))}
            {item.keywords.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{item.keywords.length - 3} more
              </Badge>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex justify-between items-center w-full">
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(true)}>
              Read More
            </Button>
            {item.url && (
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={(e) => {
                  e.stopPropagation()
                  window.open(item.url, "_blank")
                }}
              >
                Source
                <ExternalLink className="h-3 w-3 ml-1" />
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">{item.title}</DialogTitle>
            <DialogDescription className="flex items-center justify-between">
              <span>
                {item.authors} ({item.year})
              </span>
              <Badge variant="outline">{getCategoryName(item.category)}</Badge>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Source</h4>
              <p className="text-sm text-slate-600">{item.source}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Summary</h4>
              <p className="text-sm text-slate-600 whitespace-pre-line">{item.summary}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Keywords</h4>
              <div className="flex flex-wrap gap-2">
                {item.keywords.map((keyword, index) => (
                  <Badge key={index} variant="secondary">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>

            {item.keyFindings && (
              <div>
                <h4 className="text-sm font-medium mb-2">Key Findings</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {item.keyFindings.map((finding, index) => (
                    <li key={index} className="text-sm text-slate-600">
                      {finding}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {item.url && (
              <div className="pt-4">
                <Button className="w-full" onClick={() => window.open(item.url, "_blank")}>
                  Visit Source
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

