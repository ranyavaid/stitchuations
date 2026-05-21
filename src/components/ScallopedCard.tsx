import type { ReactNode } from 'react'

type ScallopedCardProps = {
  children: ReactNode
  className?: string
}

export function ScallopedCard({ children, className = '' }: ScallopedCardProps) {
  return (
    <div className={`relative mx-auto max-w-3xl ${className}`}>
      <div className="bg-cream relative overflow-hidden rounded-[2rem] shadow-[0_10px_40px_rgba(92,40,40,0.1)]">
        <svg
          className="text-cream absolute top-0 right-0 left-0 -mt-px h-5 w-full"
          viewBox="0 0 1200 20"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M0,20 L1200,20 L1200,10
               C1180,10 1170,0 1150,10
               C1130,20 1110,0 1090,10
               C1070,20 1050,0 1030,10
               C1010,20 990,0 970,10
               C950,20 930,0 910,10
               C890,20 870,0 850,10
               C830,20 810,0 790,10
               C770,20 750,0 730,10
               C710,20 690,0 670,10
               C650,20 630,0 610,10
               C590,20 570,0 550,10
               C530,20 510,0 490,10
               C470,20 450,0 430,10
               C410,20 390,0 370,10
               C350,20 330,0 310,10
               C290,20 270,0 250,10
               C230,20 210,0 190,10
               C170,20 150,0 130,10
               C110,20 90,0 70,10
               C50,20 30,0 10,10
               C5,5 0,10 0,10
               Z"
            transform="scale(1,-1) translate(0,-20)"
          />
        </svg>

        <div className="relative px-8 py-9 sm:px-14 sm:py-11">{children}</div>

        <svg
          className="text-cream absolute right-0 -bottom-px left-0 h-5 w-full"
          viewBox="0 0 1200 20"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M0,0 L1200,0 L1200,10
               C1180,10 1170,20 1150,10
               C1130,0 1110,20 1090,10
               C1070,0 1050,20 1030,10
               C1010,0 990,20 970,10
               C950,0 930,20 910,10
               C890,0 870,20 850,10
               C830,0 810,20 790,10
               C770,0 750,20 730,10
               C710,0 690,20 670,10
               C650,0 630,20 610,10
               C590,0 570,20 550,10
               C530,0 510,20 490,10
               C470,0 450,20 430,10
               C410,0 390,20 370,10
               C350,0 330,20 310,10
               C290,0 270,20 250,10
               C230,0 210,20 190,10
               C170,0 150,20 130,10
               C110,0 90,20 70,10
               C50,0 30,20 10,10
               C5,15 0,10 0,10
               Z"
          />
        </svg>
      </div>
    </div>
  )
}
