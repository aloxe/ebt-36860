import { MouseEventHandler } from "react";

interface Props {
  label: string
  href?: string
  callback?: MouseEventHandler
}

function TitleButton({label, href, callback}: Props) {

return (
  <a
    onClick={callback}
    href={href ?? "#"}
    className=" block group bg-white rounded-lg border border-blue-200 text-left p-2 m-2 sm:p-4 sm:m-4 hover:border-blue-900 no-underline"
  >
    <h2 className="mb-1">
      {label} 
    <span className="inline-block transition-transform group-hover:translate-x-8 motion-reduce:transform-none">
        →
    </span>
    </h2>
  </a>
  );
};

export default TitleButton;
