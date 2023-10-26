import { MouseEventHandler } from "react";

interface Props {
  label: string
  callback: MouseEventHandler
}

function TitleButton({label, callback}: Props) {
  return (
  <a
    onClick={callback}
    href="#cities"
    className="group bg-white rounded-lg border border-blue-200 text-left  p-4 m-4 hover:border-blue-900"
  >
    <h2 className={`text-blue-900 text-lg font-semibold`}>
      {label}
    <span className="inline-block transition-transform group-hover:translate-x-3 motion-reduce:transform-none">
        →
    </span>
    </h2>
  </a>
  );
};

export default TitleButton;