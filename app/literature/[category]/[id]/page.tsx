"use client"

import { Breadcrumb } from "@/components/ui/breadcrumb"
import { literatureData } from "@/data/literature-data"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Calendar, Users } from "lucide-react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export default function LiteratureDetailPage({ params }: { params: { category: string; id: string } }) {
  const { category, id } = params

  // Find the literature item
  const item = literatureData.find((item) => item.id.toString() === id && item.category === category)

  // If no matching item is found, return 404
  if (!item) {
    notFound()
  }

  const getCategoryName = (categoryId: string) => {
    switch (categoryId) {
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
        return categoryId
    }
  }

  const categoryName = getCategoryName(category)

  return (
    <>
      <Navigation />
      <div className="container mx-auto px-4 py-24">
        <Breadcrumb
          segments={[
            { name: "Literature", href: "/literature" },
            { name: categoryName, href: `/literature/${category}` },
            { name: item.title, href: `/literature/${category}/${id}` },
          ]}
          className="mb-8"
        />

        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden border border-slate-100">
          <div className="h-2 w-full bg-gradient-to-r from-primary/40 to-primary" />
          <div className="p-8">
            <div className="flex items-center justify-between mb-4">
              <Badge variant="outline">{categoryName}</Badge>
              <span className="text-sm text-slate-400 flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {item.year}
              </span>
            </div>

            <h1 className="text-2xl font-semibold mb-2">{item.title}</h1>
            <p className="flex items-center gap-1 text-slate-600 mb-6">
              <Users className="h-4 w-4" />
              <span>{item.authors}</span>
            </p>

            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-medium mb-2">Source</h2>
                <p className="text-slate-600">{item.source}</p>
              </div>

              <div>
                <h2 className="text-lg font-medium mb-2">Summary</h2>
                <p className="text-slate-600 whitespace-pre-line">{item.summary}</p>
              </div>

              <div>
                <h2 className="text-lg font-medium mb-2">Keywords</h2>
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
                  <h2 className="text-lg font-medium mb-2">Key Findings</h2>
                  <ul className="list-disc pl-5 space-y-2">
                    {item.keyFindings.map((finding, index) => (
                      <li key={index} className="text-slate-600">
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
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

