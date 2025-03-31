"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, BarChart2, Home } from "lucide-react"
import { cn } from "@/lib/utils"

export default function SidebarResourcesNav() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
      <div className="p-4 bg-slate-50">
        <h3 className="font-semibold text-slate-800">Resources</h3>
      </div>

      <div className="p-2">
        <Link href="/" passHref>
          <div className="flex items-center gap-3 p-3 rounded-md hover:bg-slate-100 transition-colors">
            <Home className="h-5 w-5" />
            <span>Home</span>
          </div>
        </Link>

        <Link href="/insights" passHref>
          <div
            className={cn(
              "flex items-center gap-3 p-3 rounded-md transition-colors",
              isActive("/insights") ? "bg-primary/10 text-primary" : "hover:bg-slate-100",
            )}
          >
            <BarChart2 className="h-5 w-5" />
            <span>Business Insights</span>
          </div>
        </Link>

        <Link href="/literature" passHref>
          <div
            className={cn(
              "flex items-center gap-3 p-3 rounded-md transition-colors",
              isActive("/literature") ? "bg-primary/10 text-primary" : "hover:bg-slate-100",
            )}
          >
            <BookOpen className="h-5 w-5" />
            <span>AI Literature Database</span>
          </div>
        </Link>
      </div>
    </div>
  )
}

