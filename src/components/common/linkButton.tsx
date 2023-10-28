import { MouseEventHandler } from "react";

interface Props {
  label: string
  href?: string
  callback?: MouseEventHandler
}

function LinkButton({label, href, callback}: Props) {

return (
  <a
    onClick={callback}
    href={href ?? "#"}
    className="group block text-right p-2 mr-4 hover:border-dashed"
  >
    <div className="font-semibold text-sm text-blue-900 underline">
      {label} 
    <span className="inline-block transition-transform group-hover:translate-x-3 motion-reduce:transform-none">
        →
    </span>
    </div>
  </a>
  );
};

export default LinkButton;