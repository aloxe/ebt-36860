'use client'
import { useTranslation } from '@/i18n/client'

function ButtonDownload({ lang, visitedDepartements }: {lang: string, visitedDepartements: string[] }) {
    /* eslint-disable react-hooks/rules-of-hooks */
    const { t } = useTranslation(lang, 'stats')

    const handleClick = () => {
    console.log("click");
    var img = new Image();
    img.onload = function (){
        var canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        // canvas.width = 334;
        // canvas.height = 290;
        console.log("canvas", canvas);
        
        var ctxt = canvas.getContext("2d");
        if (ctxt) {
            ctxt.fillStyle = "#fff";
            ctxt.fillRect(0, 0, canvas.width, canvas.height);
            ctxt.drawImage(img, 0, 0);  
        }
        var a = document.createElement("a");
        a.href = canvas.toDataURL("image/png");
        a.download = "CARTE_DE_FRANCE.png"
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };
    // #CarteDeFranceSvg
    var innerSvg = document.querySelector("#CarteDeFranceSvg");

    if (innerSvg) {
        for(let i = 0; i < innerSvg.children.length; i++) {
        let regionSvg = innerSvg.children[i];
        for(let j = 0; j < regionSvg.children.length; j++) {
            let deptSvg = regionSvg.children[j]
            if (deptSvg.attributes.length > 0) {
            deptSvg.setAttribute("stroke-width", "1px")
            
            if (visitedDepartements.includes(deptSvg.attributes[1].value)) {
                deptSvg.setAttribute("fill", "royalblue")
                deptSvg.setAttribute("stroke", "navy")
            } else {
                deptSvg.setAttribute("fill", "aliceblue")
                deptSvg.setAttribute("stroke", "CornflowerBlue")
            }
            }
        }
        }
        var svgText = (new XMLSerializer()).serializeToString(innerSvg);
        img.src = "data:image/svg+xml;utf8," + encodeURIComponent(svgText);
    }
    }

    return (
        <button type="button" onClick={handleClick} className="btn mx-auto m-5 p-0 sm:btn-primary sm:px-4 sm:h-[40px] cursor-pointer text-right">{t('download-map')}</button>
  );
};

export default ButtonDownload;