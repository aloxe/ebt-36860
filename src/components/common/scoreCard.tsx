
export function ScoreCard({icon = "▥", score, label}:{icon: string, score: number, label: string}) {
    return (
          <div className="text-center text-lg font-bold leading-5 bg-white rounded-lg border border-blue-900 p-1 px-3">
            {icon}<br/>
            {score}<br/>
            <span className="text-sm font-normal">{label}</span>
          </div>
      );
    }
