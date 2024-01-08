'use client'
import { useState } from "react";
import Link from "next/link";
import { useTranslation } from '@/i18n/client'

function PostToForum({ lang, message, topic }: {lang: string, message: string, topic: string}) {
    /* eslint-disable react-hooks/rules-of-hooks */
     const { t } = useTranslation(lang, 'stats')
    const [copied, setCopied] = useState<boolean>(false);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const textarea = document.getElementById("message")
        if (textarea) {
            textarea.focus()
            /* @ts-ignore */
            textarea.select()
            document.execCommand('copy')
            setCopied(true)
        }
    }

    return (
    <>
        {/* TODO: check if there is a forum API to retrieve postId
        <form method="post" action="https://forum.eurobilltracker.com/posting.php?mode=reply&t=7171#preview" >
        <input type="hidden" name="topic_cur_post_id" value="" />
        <input type="submit" name="preview" value="Preview" className="btn max-w-min mx-auto m-5 p-0 sm:btn-primary sm:px-4 sm:h-[40px] cursor-pointer float-right"/> */}
        <h2 className="mb-0 mt-4 text-left">{t("share-on-forum")}</h2>
        <div className="float-right">
            <button type="button" onClick={handleClick} className="btn max-w-min mx-auto m-5 p-0 sm:btn-primary sm:px-4 sm:h-[40px] cursor-pointer">{t('copy')}</button>
            {!copied && <Link href="#" className={`btn max-w-min mx-5 m-5 p-3 sm:btn-primary sm:px-4 sm:h-[40px] no-underline cursor-not-allowed opacity-25 `} >{t('goto-forum')}</Link>}
            {copied && <Link href={`https://forum.eurobilltracker.com/posting.php?mode=reply&f=34&t=${topic}`} target="_blank" className={`btn max-w-min mx-5 m-5 p-3 sm:btn-primary sm:px-4 sm:h-[40px] no-underline cursor-pointer`} >{t('goto-forum')}</Link>}
        </div>
        <textarea
        id="message"
        rows={4}
        className="border border-solid border-emerald-950 w-full"
        defaultValue={message}
        >
        </textarea>
        {/* </form> */}
</>
  );
};

export default PostToForum;