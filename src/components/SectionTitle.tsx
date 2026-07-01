interface SectionTitleProps {
  label?: string
  title: string
  subtitle?: string
}

export default function SectionTitle({ label, title, subtitle }: SectionTitleProps) {
  return (
    <div className="mb-16 md:mb-20">
      {label && (
        <p className="text-xs tracking-widest uppercase text-stone-400 mb-5">{label}</p>
      )}
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-stone-900 leading-none mb-5">
        {title}
      </h1>
      {subtitle && (
        <p className="text-stone-500 text-base max-w-xl leading-relaxed">{subtitle}</p>
      )}
    </div>
  )
}
