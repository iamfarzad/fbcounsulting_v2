"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import LiteratureCard from "@/components/literature-card"
import { literatureData } from "@/data/literature-data"
import { Button } from "@/components/ui/button"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { notFound } from "next/navigation"

export default function LiteratureCategoryPage({ params }: { params: { category: string } }) {
  const { category } = params
  const [searchQuery, setSearchQuery] = useState("")

  // Check if category exists
  const validCategories = [
    "hr",
    "leadership",
    "operations",
    "customer-service",
    "product-management",
    "organizational-change",
    "digital-transformation",
    "data-ethics",
  ]

  if (!validCategories.includes(category)) {
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

  const filteredLiterature = literatureData.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.keywords.some((keyword) => keyword.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = item.category === category

    return matchesSearch && matchesCategory
  })

  return (
    <>
      <Navigation />
      <div className="container mx-auto px-4 py-24">
        <Breadcrumb
          segments={[
            { name: "Literature", href: "/literature" },
            { name: categoryName, href: `/literature/${category}` },
          ]}
          className="mb-8"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <h1 className="text-3xl font-light mb-4">
            <span className="font-semibold">{categoryName}</span> Literature
          </h1>
          <p className="text-slate-600 mb-8">
            Explore our curated collection of resources on AI implementation in {categoryName.toLowerCase()}.
          </p>

          <div className="relative max-w-xl mx-auto mb-12">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <Input
              type="text"
              placeholder="Search by title, author, or keyword..."
              className="pl-10 py-6 rounded-full border-slate-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                onClick={() => setSearchQuery("")}
              >
                Clear
              </Button>
            )}
          </div>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredLiterature.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <LiteratureCard item={item} />
            </motion.div>
          ))}
        </div>

        {filteredLiterature.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500">No results found. Try adjusting your search criteria.</p>
          </div>
        )}
      </div>
      <Footer />
    </>
  )
}

