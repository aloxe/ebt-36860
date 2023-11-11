export function ScoreCard({icon = "▥", score, label}:{icon: string, score: number | undefined, label: string}) {
  return (
    <div className="text-center text-lg font-bold leading-5 bg-white rounded-lg border border-blue-900 p-1 w-24 min-w-min m-2">
      {icon}<br/>
      {score ? score : "‽"}<br/>
      <span className="text-xs sm:text-sm font-normal m-0">
        {label}
      </span>
    </div>
);
}
