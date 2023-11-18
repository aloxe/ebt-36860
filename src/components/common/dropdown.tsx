
export function Dropdown({label, array}:{label:string, array:any[]}) {
    return (
      <div className="h-3">
        <div className="flexrelative inline-block text-left dropdown">
          <button className="inline-flex  w-full px-4 py-2 leading-5 text-gray-700 transition duration-150 ease-in-out focus:outline-none focus:bg-slate-200"
            type="button" aria-haspopup="true">
            <span>{label}</span>
            <svg className="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
          </button>
          <div className="opacity-0 invisible dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2 scale-95 max-h-[200px]">
            {array.map((item) => {
              if (item && item.action) {
                return (<div className="py-1 bg-white hover:bg-slate-200" key={item.url}>
                  <button id={item.url} className="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left" role="menuitem" onClick={item.action} key={item.label}>{item.label}</button>
                  </div>)
              } else if (item && item.url) {
              return (<div className="py-1 bg-white hover:bg-slate-200" key={item.url}>
                <a className="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left" href="{item.url}"  >{item.label}</a>
              </div>)
              }
            })}
          </div>
        </div>
        </div>
      );
    }
