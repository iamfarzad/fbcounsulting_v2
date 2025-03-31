export default function LogoFallback({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center bg-primary-50 dark:bg-primary-900/20 rounded-full ${className}`}>
      <div className="text-primary text-lg font-bold font-display">FB</div>
    </div>
  )
}

