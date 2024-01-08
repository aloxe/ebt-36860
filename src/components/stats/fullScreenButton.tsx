'use client'
import NormalScreen from "@/assets/normal-screen.svg";
import FullScreen from "@/assets/full-screen.svg";

export const FullScreenButton = () => {

  const defaultClass = "transition-{margin} duration-150 bg-white rounded-lg border border-blue-200 text-left text-black p-2 m-2 sm:p-4 sm:m-4"
  const fullScreenClass = "transition-{margin} duration-150 fixed top-0 bottom-0 left-0 right-0 bg-orange-400 text-left p-0 pt-[45px] m-0 h-[calc(100vh-45px)] w-[100vw] fullscreen"
  const defaultTitleClass = "transition-all duration-500 flex justify-between"
  const fullScreenTitleClass = "transition-all duration-500 flex justify-between absolute w-full px-14 pb-0 mt-6 text-xs z-[1000]"

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const isFull = event.currentTarget.children[0].className === "hidden";
  /* @ts-ignore */
  event.currentTarget.parentNode.parentNode.className = isFull ?
  defaultClass : fullScreenClass;
  /* @ts-ignore */
  event.currentTarget.parentNode.parentNode.className = isFull ?
  defaultClass : fullScreenClass;
  /* @ts-ignore */
  event.currentTarget.parentNode.className = isFull ?
  defaultTitleClass : fullScreenTitleClass;

  event.currentTarget.children[0].className = isFull ? "" : "hidden"
  event.currentTarget.children[1].className = isFull ? "hidden" : ""
  }

  return (
    <>
      <div className="text-right text-stone-400 text-sm cursor-pointer"
        /* @ts-ignore */
        onClick={handleClick}
      >
        <div className=""><FullScreen height="30px" width="40px" fill="rgb(146 64 14)" isFull={false}/></div>
        <div className="hidden"><NormalScreen height="30px" width="40px" fill="rgb(146 64 14)"  /></div>
      </div> 
    </>
  )
}
