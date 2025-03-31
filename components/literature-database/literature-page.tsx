"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, BookOpen, Users, Briefcase, HeadphonesIcon, Package, RefreshCw, BarChart3, Shield } from "lucide-react"
import LiteratureCard from "@/components/literature-card"
import { literatureData } from "@/data/literature-data"
import { Button } from "@/components/ui/button"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export default function LiteraturePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")

  const filteredLiterature = literatureData.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.keywords.some((keyword) => keyword.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = activeCategory === "all" || item.category === activeCategory

    return matchesSearch && matchesCategory
  })

  const categories = [
    { id: "all", name: "All Categories", icon: <BookOpen className="h-4 w-4" /> },
    { id: "hr", name: "Human Resources", icon: <Users className="h-4 w-4" /> },
    { id: "leadership", name: "Leadership", icon: <Briefcase className="h-4 w-4" /> },
    { id: "operations", name: "Operations", icon: <Package className="h-4 w-4" /> },
    { id: "customer-service", name: "Customer Service", icon: <HeadphonesIcon className="h-4 w-4" /> },
    { id: "product-management", name: "Product Management", icon: <BarChart3 className="h-4 w-4" /> },
    { id: "organizational-change", name: "Organizational Change", icon: <RefreshCw className="h-4 w-4" /> },
    { id: "digital-transformation", name: "Digital Transformation", icon: <BarChart3 className="h-4 w-4" /> },
    { id: "data-ethics", name: "Data Ethics", icon: <Shield className="h-4 w-4" /> },
  ]

  return (
    <>
      <Navigation />
      <div className="container mx-auto px-4 py-24">
        <Breadcrumb segments={[{ name: "Literature", href: "/literature" }]} className="mb-8" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <h1 className="text-3xl font-light mb-4">
            AI Business <span className="font-semibold">Literature</span>
          </h1>
          <p className="text-slate-600 mb-8">
            Explore our curated collection of academic and industry resources on AI implementation across different
            business domains.
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

        <Tabs defaultValue="all" onValueChange={setActiveCategory}>
          <div className="overflow-x-auto pb-4 mb-8">
            <TabsList className="inline-flex w-auto p-1 bg-slate-100 rounded-full">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="rounded-full py-2 px-4 flex items-center gap-2 whitespace-nowrap"
                >
                  {category.icon}
                  <span>{category.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value="all" className="mt-0">
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
          </TabsContent>

          {categories.slice(1).map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-0">
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
            </TabsContent>
          ))}
        </Tabs>
      </div>
      <Footer />
    </>
  )
}

