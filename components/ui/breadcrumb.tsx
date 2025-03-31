import type React from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface BreadcrumbSegment {
  name: string
  href: string
}

interface BreadcrumbProps {
  segments: BreadcrumbSegment[]
  className?: string
}

export function Breadcrumb({ segments, className = "" }: BreadcrumbProps) {
  return (
    <nav className={`flex items-center text-sm text-slate-500 ${className}`}>
      <ol className="flex items-center space-x-2">
        <li>
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
        </li>

        {segments.map((segment, index) => (
          <li key={index} className="flex items-center space-x-2">
            <ChevronRight className="h-4 w-4" />
            <Link
              href={segment.href}
              className={`hover:text-primary transition-colors ${
                index === segments.length - 1 ? "font-medium text-slate-900" : ""
              }`}
            >
              {segment.name}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  )
}

export const BreadcrumbList = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return <ol className={`flex items-center space-x-2 ${className}`}>{children}</ol>
}

export const BreadcrumbItem = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return <li className={`flex items-center space-x-2 ${className}`}>{children}</li>
}

export const BreadcrumbLink = ({
  href,
  children,
  className = "",
}: { href: string; children: React.ReactNode; className?: string }) => {
  return (
    <Link href={href} className={`hover:text-primary transition-colors ${className}`}>
      {children}
    </Link>
  )
}

export const BreadcrumbPage = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return <span className={`font-medium text-slate-900 ${className}`}>{children}</span>
}

export const BreadcrumbSeparator = ({ className = "" }: { className?: string }) => {
  return <ChevronRight className={`h-4 w-4 ${className}`} />
}

export const BreadcrumbEllipsis = ({ className = "" }: { className?: string }) => {
  return <span className={`text-slate-500 ${className}`}>...</span>
}

