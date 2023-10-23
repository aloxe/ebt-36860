import { addSauPluriel } from "@/helpers/strings";

export function ScoreCard({icon = "▥", score, label}:{icon: string, score: number | undefined, label: string}) {
    return (
          <div className="text-center text-lg font-bold leading-5 bg-white rounded-lg border border-blue-900 p-1 px-3">
            {icon}<br/>
            {score ? score : "‽"}<br/>
            <span className="sm:text-sm font-normal xs:text-xs">{label}{addSauPluriel(score)}</span>
          </div>
      );
    }
