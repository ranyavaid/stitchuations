type ScallopStripProps = {
  variant: 'top' | 'bottom'
  className?: string
}

export function ScallopStrip({ variant, className = '' }: ScallopStripProps) {
  const bandY = variant === 'top' ? 0 : 17
  const patternId = `scallop-${variant}`

  return (
    <svg
      width="100%"
      height="30"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`block ${className}`}
    >
      <defs>
        <pattern
          id={patternId}
          width="30"
          height="30"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="15" cy="15" r="15" fill="#983B3B" />
        </pattern>
      </defs>
      <rect width="100%" height="30" fill={`url(#${patternId})`} />
      <rect width="100%" y={bandY} height="13" fill="#983B3B" />
    </svg>
  )
}
