'use client'
import { SyntheticEvent } from "react";
import AdminLinks from "@/components/common/adminLinks";

interface MouseEvent<T = Element> extends SyntheticEvent {
  relatedTarget: EventTarget | null;
  target: EventTarget & T;
}

const selectAll = (event: MouseEvent<HTMLTextAreaElement>) => {
  event.target.select();
  document.execCommand('copy');
}

const JsonTranslations = ({ transLang, ns, dbTranslations }: { transLang: string, ns: string, dbTranslations: any }) => {


  return (
    <>
    <AdminLinks lang={'en'} />
    <div className="bg-white rounded-lg border border-blue-200 text-left text-blue-900 p-2 m-2 sm:p-4 sm:m-4">
      <div className="text-stone-600 text-sm">
        <h2>Translation JSON</h2>
        <div key={ns}>
          <h3>{ns}.json</h3>
          <textarea 
            name={ns} rows={5}
            className="w-full font-mono text-xs"
            value={ JSON.stringify(dbTranslations, null, 2) } 
            /* @ts-ignore */
            onClick={selectAll}
          />
        </div>
      </div>
    </div>
    </>
  )
}

export default JsonTranslations;
