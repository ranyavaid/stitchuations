import { ScallopStrip } from './ScallopStrip'

export function ScallopedFooter() {
  return (
    <footer className="relative z-10 w-full">
      <p className="font-public pb-6 text-center text-sm text-[#f2f2f2] sm:text-[16px]">
        made with wonder ♡ Ranya vaid
      </p>
      <ScallopStrip variant="bottom" />
    </footer>
  )
}
