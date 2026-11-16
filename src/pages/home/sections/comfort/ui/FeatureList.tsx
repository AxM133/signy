export const FeatureList = ({ items }: { items: string[] }) => (
  <ul className="flex flex-col gap-3 text-[17px] leading-7 text-ink lg:text-[18px]">
    {items.map((item) => (
      <li key={item} className="flex gap-3">
        <span aria-hidden="true" className="mt-[13px] h-[2px] w-2.5 shrink-0 rounded bg-brand" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
)
