"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, BarChart2, ArrowRight, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export default function ResourcesNavigation() {
  const pathname = usePathname()
  const [isExpanded, setIsExpanded] = useState(true)

  const isActive = (path: string) => pathname === path

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div
        className="flex items-center justify-between p-4 cursor-pointer bg-slate-50"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="font-semibold text-slate-800">Explore Resources</h3>
        <ChevronDown
          className={cn("h-5 w-5 text-slate-500 transition-transform", isExpanded ? "transform rotate-180" : "")}
        />
      </div>

      {isExpanded && (
        <div className="p-2">
          <Link href="/insights" passHref>
            <div
              className={cn(
                "flex items-center gap-3 p-3 rounded-md transition-colors",
                isActive("/insights") ? "bg-primary/10 text-primary" : "hover:bg-slate-100",
              )}
            >
              <BarChart2 className="h-5 w-5" />
              <div className="flex-1">
                <p className="font-medium">Business Insights</p>
                <p className="text-sm text-slate-500">Industry evolution & future skills</p>
              </div>
              <ArrowRight className="h-4 w-4 opacity-50" />
            </div>
          </Link>

          <Link href="/literature" passHref>
            <div
              className={cn(
                "flex items-center gap-3 p-3 rounded-md transition-colors mt-2",
                isActive("/literature") ? "bg-primary/10 text-primary" : "hover:bg-slate-100",
              )}
            >
              <BookOpen className="h-5 w-5" />
              <div className="flex-1">
                <p className="font-medium">AI Literature Database</p>
                <p className="text-sm text-slate-500">Curated research & publications</p>
              </div>
              <ArrowRight className="h-4 w-4 opacity-50" />
            </div>
          </Link>
        </div>
      )}
    </div>
  )
}

