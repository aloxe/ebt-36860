interface CarteDeFranceSvgProps  {
  visited: string[]
  // layerProps: any
}

const CarteDeFranceSvg = ({visited}:CarteDeFranceSvgProps) => {

  return (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="460px" height="410px"
    x="0"
    y="0"
    // viewBox="60 0 667 590"
    viewBox="60 0 667 590"
    xmlSpace="preserve"
    id="CarteDeFranceSvg"
  >
    <g
      className="region region-11"
      data-nom="Île-de-France"
      data-code_insee={11}
    >
      <title>Île-de-France</title>
      <path
        data-nom="Paris"
        data-numerodepartement="75"
        className={visited.includes('75') ? "departement visited" : "region-11 departement departement-75 departement-paris"}
        d="M641.8,78.3l-0.2,3.8l-1,2.6l-8.3-1.7l-6-0.6l-5.2,3h-4l-2.5-0.3l-0.4-0.1l-13.5-5l-3-3.8l-4.3-1.9l-0.5-0.2 l0.4-1.9l1.3-3.1l2.7-2.1l2.9-1.1l3.9,0.5h0.1l0.9-2.2l7.1-4.6l14-0.1l1.8,3.6l1.8,2.4l0.6,0.9l0.1,0.4L631,68l0.4,5.4l0.4,1.8v0.1 l-0.3,0.8l0.1,3.6l0.6-0.5l1.6-1.6l2-0.5l2-0.5L641.8,78.3z M396.8,154.7l-3.2-0.5l-2.5,1.7l3,3.5l5.3-0.1l-1.8-1.9L396.8,154.7z"
      ><title>
        75 Paris &#013;Île-de-France
        </title></path>
      <path
        data-nom="Seine-et-Marne"
        data-numerodepartement="77"
        className={visited.includes('77') ? "departement visited" : "region-11 departement departement-77 departement-seine-et-marne"}
        d="m441.1,176.1l-2.9,0.8l0.4,8.5l-15.4,3 l-0.2,5.8l-3.9,5.4l-11.2,2.7l-9.2-0.7l2.6-1.5l0.6-2.7l-4.2-4.3L397,190l3.4-4.8l4-17.2l-0.5-1l1.1-4.1l-0.3-2.9v-0.1l-1.3-4.7 l1.3-2.5l-1.7-5.1l0.1-0.1l1.7-2.3l-0.2-2l6.9,1l2-2.2l2.5,1.6l8.1-2.9l2.6,0.7l1.8,2.5l-0.7,2.8l3.9,4.2l9.3,6l-0.4,2l-2.6,2.2 l3.5,8.3l2.6,1.7L441.1,176.1z"
        ><title>
        77 Seine-et-Marne &#013;Île-de-France
        </title></path>
      <path
        data-nom="Yvelines"
        data-numerodepartement="78"
        className={visited.includes('78') ? "departement visited" : "region-11 departement departement-78 departement-yvelines"}
        d="m364.1,158.1l-3.6-6.6l-1.8-5.8l2.3-2.6 l3.8,0.1l9.5,0.8l9,3.6l5.5,6.1l-2,3.1l3.2,5.2l-7.1,5.4l-1.6,2.6l0.7,2.9l-4.6,8.6l-3.1,0.7L372,180l-1.2-5.6l-6.2-5.4L364.1,158.1z"
        ><title>
        78 Yvelines &#013;Île-de-France
        </title></path>
      <path
        data-nom="Essonne"
        data-numerodepartement="91"
        className={visited.includes('91') ? "departement visited" : "departement"}
        d="m401.6,164.8l2.3,2.2l0.5,1l-4,17.2L397,190 l-3.7-0.6l-2.8,1.8l-1.5-2.7l-1.9,2.9l-6.9,0.7l-2.8-10.6l4.6-8.6l-0.7-2.9l1.6-2.6l7.1-5.4v-0.1l3.7,1.6l5.1,2.1L401.6,164.8z"
        ><title>
        91 Essonne &#013;Île-de-France
        </title></path>
      <path
        data-nom="Hauts-de-Seine"
        data-numerodepartement="92"
        className={visited.includes('92') ? "departement visited" : "departement"}
        d="M391.1,155.9l3,3.5l-0.4,4.1l-3.7-1.6v0.1l-3.2-5.2l2-3.1l3.6-2.6l1.3,2l-0.1,1.1L391.1,155.9z M612.6,54.1 l1.6-0.7l0.7-1.9l0.5-1.8l-0.1-1.1l-0.2-1.4l-4.6-1.9l-4.6-0.9l-4,1.3l-7.6,5.6l-6.1,5.8l-5.3,3l-1,1l-3.75,7.4l1.79,7.17 l-0.06,0.07l0.01,0.06l-2.74,3.23l0.68,2.44l2.5,4.8l3.3-0.5l1,5.2l3.9-0.3l1.4,3.5l3.4,1.6l0.5,2.1l5.3,4.2l4.3,1.3l-0.1,4.9 l5.7,3.5l3.15-5.91l-0.7-5.46l0.72-1.2l0.4-1.3l0.7-2.1l-1.4-1.9l0.3-1.2l0.8-2.8l-1-2.6l0.5-0.3l0.5-0.3l0.9-0.5l0.7-1.1l-0.4-0.1 l-13.5-5l-3-3.8l-4.3-1.9l-0.5-0.2l0.3-1.9l1.4-3.1l2.7-2.1l2.8-1.1h0.1l3.9,0.5l0.9-2.2l7.2-4.6l-0.7-2l-0.6-2l1.4-0.7L612.6,54.1z"
        ><title>
        92 Hauts-de-Seine &#013;Île-de-France
        </title></path>
      <path
        data-nom="Seine-Saint-Denis"
        data-numerodepartement="93"
        className={visited.includes('93') ? "departement visited" : "departement"}
        d="M404.7,152.7l-1.3,2.5l1.3,4.7v0.1l-7.1-2.6l-0.8-2.7l-3.2-0.5l0.1-1.1l-1.3-2l3.3-1.3l2.6,1.1 c1.6-1.1,3.2-2.2,4.7-3.3L404.7,152.7z M663.2,73.89l0.06-0.08l-0.02-0.04l2.61-3.38l-3.95-0.3l-1.6-5.9l0.06-0.06l-0.02-0.06 l6.36-6.56l0.1-5.42l1.1-4l-1.2-3.4l-5.1-8l0.07-0.08l-0.03-0.04l2.65-3.33l-0.89-4.04l-4.5-2.9l-4.1,1.7l-6.4,8.8l-8.2,6.2 l-0.7-0.2l-7.8-1.1l-1.9,1l-5.1-4.6l-1.3-0.2l-1.9-0.7l-5.1,3l-1.6,2.7l-1-1.2l-5.9-2.1l-1.96,2.25v0.2l0.66,2.45l3.9,0.8l4.7,1.9 l0.1,1.4l0.1,1.1l-0.2,0.9l-0.3,0.9l-0.7,1.9l-1.6,0.7l-0.3,0.8l-1.4,0.7l0.6,2l0.7,2l13.9-0.2l0.1,0.1l1.8,3.6l1.8,2.4l0.6,0.8 l0.1,0.5L631,68l0.4,5.4l0.4,1.8l5.9-0.5l0.5-0.3c0.1,0,0.1,0,0.2,0l6.3-2.8l2.9,0.4l0.7,1.3l3,1.5l4,2.9c0,0.1,0.1,0.2,0.2,0.2 l0.7,0.5l6,6.2l0.8,0.6c0.1,0,0.2,0.1,0.3,0.1l3.6,2.6l0.04-0.13l0.43-1.3l0.23-0.68l-1.8-6L663.2,73.89z"
        ><title>
        93 Seine-Saint-Denis &#013;Île-de-France
        </title></path>
      <path
        data-nom="Val-de-Marne"
        data-numerodepartement="94"
        className={visited.includes('94') ? "departement visited" : "departement"}
        d="M404.7,160l0.3,2.9l-1.1,4.1l-2.3-2.2l-2.8,0.8l-5.1-2.1l0.4-4.1l5.3-0.1l-1.8-1.9L404.7,160z M668.09,102.2 h0.06l-0.02-0.12l3.31-0.19l-1.55-3.58l-3.69-2.41l0.8-8h-0.1l-3.6-2.6c-0.1,0-0.2-0.1-0.3-0.1l-0.8-0.6l-6-6.2l-0.7-0.5 c-0.1,0-0.2-0.1-0.2-0.2l-4-2.9l-3-1.5l-0.7-1.3l-2.9-0.4l-6.3,2.8c-0.1,0-0.1,0-0.2,0l-0.5,0.3l-5.9,0.5v0.1l-0.3,0.8l0.1,3.6 l0.6-0.5l1.6-1.7l2-0.4l2-0.5l4,1.7l-0.2,3.8l-1,2.6l-8.3-1.7l-6-0.6l-5.2,3h-4l-2.5-0.3l-0.6,1.1h-0.1l-0.9,0.5l-0.5,0.3l-0.5,0.3 l1,2.5v0.1l-0.8,2.8l-0.3,1.2l1.4,1.9l-0.7,2.1l-0.4,1.3l-0.7,1.2l0.78,5.38h0.06l2.1,0.2l4.7,2.8l3.1-2.2l0.1,5.5l3.3,2.4l4.9-1.8 l0.7,2.5l5.2-2.3l0.5,1.3l1.7,1.7l4.6-3.6l2.1-0.5l5.2-1.8l1.9,6.8l1.7,2.5l3.3,1.8l5.44,1.88l-0.68-5.05l0.05-0.08l-0.01-0.04 l2.5-4.2l2.73-2.74l-1.38-3.64l0.07-0.06l-0.03-0.07l2.35-1.96L668.09,102.2z"
        ><title>
        94 Val-de-Marne &#013;Île-de-France
        </title></path>
      <path
        data-nom="Val-d\u2019Oise"
        data-numerodepartement="95"
        className={visited.includes('95') ? "departement visited" : "departement"}
        d="m374.3,144l-9.5-0.8l4-9.5l1.6,3.2l5.6,1.1 l6.3-1.8l9.2,2.2l2.2-1.6l10.9,6.4l0.2,2l-1.7,2.3l-0.1,0.1c-1.5,1.1-3.1,2.2-4.7,3.3l-2.6-1.1l-3.3,1.3l-3.6,2.6l-5.5-6.1 L374.3,144z"
      ><title>
        95 Val-d\u2019Oise &#013;Île-de-France
      </title></path>
    </g>
    <g
      className="region region-24"
      data-nom="Centre-Val de Loire"
      data-code_insee={24}
    >
      <title>Centre-Val de Loire</title>
      <path
        data-nom="Cher"
        data-numerodepartement="18"
        className={visited.includes('18') ? "departement visited" : "departement"}
        d="m385.3,235.4l5-2.4l13.5,3.1l3.9,4.8l9-1.7l2,6.5l-1.7,5.8l2.7,2.1 l3.1,7.6l0.3,5.9l2.2,2l-0.2,5.8l-1.3,8.9h-0.1h-4l-4.8,3.7l-8.4,2.9l-2.3,1.9l1.7,5.3l-1.7,2.4l-8.7,1l-3.5,5.9v0.1l-4.9-0.2 l1.5-3.5l-0.9-8.9l-4.7-7.9l1.4-2.7l-2.3-2.2l2.5-5.1l-2.3-11.7l-11.6-1.6l2.8-5.5l2.8,0.1l0.6-2.8l9.7-2l-2.1-5.9l5.9-4.1 L385.3,235.4z"
      ><title>
        18 Cher &#013;Centre-Val de Loire
      </title></path>
      <path
        data-nom="Eure-et-Loir"
        data-numerodepartement="28"
        className={visited.includes('28') ? "departement visited" : "departement"}
        d="m333.1,200.9l-2.1-3.8l-1.1-7.5l7.5-5.1 l-0.5-4.6l0.2-4.5l-4.8-4.4l-0.1-3.2l2.4-2.6l6-1.1l5.3-3.2l2.8,1.6l6-1.3l-0.2-2.8l6-6.9l3.6,6.6l0.5,10.9l6.2,5.4l1.2,5.6l2.3,2.2 l3.1-0.7l2.8,10.6l-0.5,1.5l-4.8,10.8l-8.5,0.6l-6,2.8l0.2,2.8l-3.3-1.9l-5.5,3.5L339,201.4l-6.3,1.3L333.1,200.9z"
        ><title>
        28 Eure-et-Loir &#013;Centre-Val de Loire
      </title></path>
      <path
        data-nom="Indre"
        data-numerodepartement="36"
        className={visited.includes('36') ? "departement visited" : "departement"}
        d="m357.8,308.5l-2.8,2.9l-1.7-2.5l-5.8,1.1 l-2.6-1.1l1.5-2.8l-2.5-1.3l-2.6-5.4h-2.9l-4.6-4.4l0.8-5.8l-2.1-3l5.6-0.5l-1-2.7l3.3-11.9l5.1-2.7l2.3,1.7l2.6-3.5l2.5-2.1l-1-4.9 l6-3.2l2.5,1.3l1.5-2.6l6.4-0.9l5.2,3.5l-2.8,5.5l11.6,1.6l2.3,11.7l-2.5,5.1l2.3,2.2l-1.4,2.7l4.7,7.9l0.9,8.9l-1.5,3.5l-2.7,0.8 l-13.2-2.7l-1.9,2.5L357.8,308.5z"
        ><title>
        36 Indre &#013;Centre-Val de Loire
      </title></path>
      <path
        data-nom="Indre-et-Loire"
        data-numerodepartement="37"
        className={visited.includes('37') ? "departement visited" : "departement"}
        d="m303.9,263l-5.5-3.2v-0.1l5.8-15.3l1.7-9.3 l0.7-2.4l6.1,2.6l-0.5-3.3l2.8,0.3l7.7-4.5l10.5,0.5l-0.2,5.5l2.2-1.8l6,3.4l-0.7,2.7l3.4,5.1l-1.2,9.1l2.4,1.9l2.6-1.3l4.2,6.7 l1,4.9l-2.5,2.1l-2.6,3.5l-2.3-1.7l-5.1,2.7l-3.3,11.9l1,2.7l-5.6,0.5l-7.1-10l-0.3-3.1l-5.3-3l1.4,2.9l-10,0.4l-2.8-1.4l-1.3-6.1 l-2.9,0.3L303.9,263z"
        ><title>
        37 Indre-et-Loire &#013;Centre-Val de Loire
      </title></path>
      <path
        data-nom="Loir-et-Cher"
        data-numerodepartement="41"
        className={visited.includes('41') ? "departement visited" : "departement"}
        d="m357.9,256.4l-6,3.2l-4.2-6.7l-2.6,1.3 l-2.4-1.9l1.2-9.1l-3.4-5.1l0.7-2.7l-6-3.4l-2.2,1.8l0.2-5.5l-10.5-0.5l0.6-3.5l3.2-1.1l6.3-10.6l-0.4-5.5l-1.7-2.2l2-2.1v-0.1 l6.3-1.3l12.8,10.8l5.5-3.5l3.3,1.9l2.5,7.1l-1.8,3.2l1.7,5.6l3-1.3l2.4,1.5l1.1,3.8l2.9,0.6l1.9-2.3l15.2,1.6l0.8,2.6l-5,2.4 l5.1,7.6l-5.9,4.1l2.1,5.9l-9.7,2l-0.6,2.8l-2.8-0.1l-5.2-3.5l-6.4,0.9l-1.5,2.6L357.9,256.4z"
        ><title>
        41 Loir-et-Cher &#013;Centre-Val de Loire
      </title></path>
      <path
        data-nom="Loiret"
        data-numerodepartement="45"
        className={visited.includes('45') ? "departement visited" : "departement"}
        d="m393.3,189.4l3.7,0.6l0.7,3.1l4.2,4.3l-0.6,2.7 l-2.6,1.5l9.2,0.7l11.2-2.7l6.7,7.5l0.4,5.8l-4.6,4.9l1.1,2.9l-1.6,2.4l-5.3,3.3l3,2.8l2.2,6.9l-2.8,0.7l-1.5,2.4l-9,1.7l-3.9-4.8 l-13.5-3.1l-0.8-2.6l-15.2-1.6l-1.9,2.3l-2.9-0.6l-1.1-3.8l-2.4-1.5l-3,1.3l-1.7-5.6l1.8-3.2l-2.5-7.1l-0.2-2.8l6-2.8l8.5-0.6 l4.8-10.8l0.5-1.5l6.9-0.7l1.9-2.9l1.5,2.7L393.3,189.4z"
        ><title>
        45 Loiret &#013;Centre-Val de Loire
      </title></path>
    </g>
    <g
      className="region region-27"
      data-nom="Bourgogne-Franche-Comté"
      data-code_insee={27}
    >
      <title>Bourgogne-Franche-Comté</title>
      <path
        data-nom="C\xF4te-d\u2019Or"
        data-numerodepartement="21"
        className={visited.includes('21') ? "departement visited" : "departement"}
        d="m523.6,241.7l3.9,8.2l-1.2,1.3l-1.8,8.2 l-6.2,6.8l-1.1,4.1v-0.1l-15,1.5l-8.8,4.2l-5.6-6.3l-5.5-1.9l-1.3-2.6l-5.7-1.7l-2.4-2.6V260l0.4-3.2l-3.7-1.2l-1.3-6h0.1l-1.3-2.7 l1.3-8.1l6.7-10.4l-1.7-2.3l2.8-2.1l0.3-3.7l-3.1-3.9l1.9-3.1l2.2-2l6.1-0.9l4.7-3.9l3.9,0.5l3.5,0.7l0.5,2.7l2.6,1l-0.3,2.9 l2.9,0.3l1.8,2.2l1,3.1l-2.8,2.4l2.3,4.8l9.2,2l3,1.6v2.8l4.8-1.9h0.1l2.7-1.6l2,3l0.1,3.2l-4.6,4.1L523.6,241.7z"
        ><title>
        21 C\xF4te-d\u2019Or &#013;Bourgogne-Franche-Comté
      </title></path>
      <path
        data-nom="Doubs"
        data-numerodepartement="25"
        className={visited.includes('25') ? "departement visited" : "departement"}
        d="m590.1,245.2l-2.4,2.2l0.4,3l-4.8,6.2l-4.8,4 l-0.4,2.9l-2.5,2.7l-5.7,1.7l-0.3,0.3l-1.7,2.3l0.9,2.7l-0.7,4.5l0.5,2.5l-9.5,8.8l-2.9,5.2l-0.22,0.69l-3.68-3.49l3.6-7.4l2.1-2.3 l-4.2-4.1l-2.9-0.5l-5.8-10.1l-3,0.8l-1.5-2.5l-2,2.1l-1.2-2.5l3-5.1l-5.2-7.8l22.3-10.2l3-4.7l5.6-1.9l2.8,0.9l1.8-2.2l3.2-0.4 l0.5-2.8l5.9,0.8l0.2-0.1h0.1l5.9,2.7l-1.4,2.5l1.4,2.4l0.41-0.46l-0.11,0.16l-2.2,4.9l7-0.7L590.1,245.2z"
        ><title>
        25 Doubs &#013;Bourgogne-Franche-Comté
      </title></path>
      <path
        data-nom="Jura"
        data-numerodepartement="39"
        className={visited.includes('39') ? "departement visited" : "departement"}
        d="m552.3,291.4l3.68,3.49L553.4,303l-5.3,7.2 l-5.5,3.2l-3.8,0.2l-0.4-2.8l-3.4-1.6l-4,4.4l-2.9,0.1l-0.1-3h-2.9l-4.3-7.7l2.8-1.1l-0.8-5.3l2.8-5l-2.2-8.7l-2.5-1.6l5-3.7 l-8.3-4.4l-0.4-2.9l1.1-4.1l6.2-6.8l1.8-8.2l1.2-1.3l2.3,2l5.4,0.1l5.2,7.8l-3,5.1l1.2,2.5l2-2.1l1.5,2.5l3-0.8l5.8,10.1l2.9,0.5 l4.2,4.1l-2.1,2.3L552.3,291.4z"
        ><title>
        39 Jura &#013;Bourgogne-Franche-Comté
      </title></path>
      <path
        data-nom="Ni\xE8vre"
        data-numerodepartement="58"
        className={visited.includes('58') ? "departement visited" : "departement"}
        d="m462.8,250l5.5-0.4l1.3,6l3.7,1.2l-0.4,3.2v0.8 l-1.1,0.3l-2.7,0.4v1.3l-2.8,1l0.3,5.9l-2.1,1.7l4,7l-1.9,2.1l0.7,2.9l-11.3,5.7l-7-2.8l-5.9,6l-4.4-3.7l-2.8,1.7l-6.4-0.2l-5.7-6.3 l1.3-8.9l0.2-5.8l-2.2-2l-0.3-5.9l-3.1-7.6l-2.7-2.1l1.7-5.8l-2-6.5l1.5-2.4l2.8-0.7v0.1h3.4l7.4,4.8h6l4.6-4.3l3.9,5.6l5.5,3 l5.8-0.9l0.9,3.7l2.8-0.9L462.8,250z"
        ><title>
        58 Ni\xE8vre &#013;Bourgogne-Franche-Comté
      </title></path>
      <path
        data-nom="Haute-Sa\xF4ne"
        data-numerodepartement="70"
        className={visited.includes('70') ? "departement visited" : "departement"}
        d="m579.1,225.9l1.4,5.5l-0.2,0.1l-5.9-0.8 l-0.5,2.8l-3.2,0.4l-1.8,2.2l-2.8-0.9l-5.6,1.9l-3,4.7L535.2,252l-5.4-0.1l-2.3-2l-3.9-8.2l-2.6-1.4l4.6-4.1l-0.1-3.2l-2-3l-2.7,1.6 h-0.1l1.2-2.5l6.6-3.9l2.1,1.8l3.2-1l0.3-8.3l2-2.4l2.9,0.3l2.3-3.2l-0.2-1.4l8-5.8l7,4.3l5.8-1.6l4.9,3.6l5.1-2.2l8.4,6.6l-2.3,5.7 L579.1,225.9z"
        ><title>
        70 Haute-Sa\xF4ne &#013;Bourgogne-Franche-Comté
      </title></path>
      <path
        data-nom="Sa\xF4ne-et-Loire"
        data-numerodepartement="71"
        className={visited.includes('71') ? "departement visited" : "departement"}
        d="m517.2,270.2v0.1l0.4,2.9l8.3,4.4l-5,3.7 l2.5,1.6l2.2,8.7l-2.8,5l0.8,5.3l-2.8,1.1l-4.8-3.3l-5.4,1.3l-5.9-1.5l-5.9,20.9l-5.7-7.7l-1.6,2.3l-2.5-1.5l-2.2,1.6l-2.2-1.7 l-2.3,1.9l-0.29,2.91L482,318.2v0.1l-5.7,3.8l-2.1-2.1l-8,1.5l-5.2-3.3v-3l3.7-4.6l0.5-5.5l-1.6-2.4l-7.9-2.9l-6.7-13.5l7,2.8 l11.3-5.7l-0.7-2.9l1.9-2.1l-4-7l2.1-1.7l-0.3-5.9l2.8-1l2.7-1.7l1.1-0.3l2.4,2.6l5.7,1.7l1.3,2.6l5.5,1.9l5.6,6.3l8.8-4.2 L517.2,270.2z"
        ><title>
        71 Sa\xF4ne-et-Loire &#013;Bourgogne-Franche-Comté
      </title></path>
      <path
        data-nom="Yonne"
        data-numerodepartement="89"
        className={visited.includes('89') ? "departement visited" : "departement"}
        d="m425.8,207.1l-6.7-7.5l3.9-5.4l0.2-5.8l15.4-3 l3.6,1.5l4.5,5.5l2.5,8.3l2-2.2l3.6,4.1l5,10.9l12.6-1.6l2.9,1.4l-1.9,3.1l3.1,3.9l-0.3,3.7l-2.8,2.1l1.7,2.3l-6.7,10.4l-1.3,8.1 l1.3,2.7h-0.1l-5.5,0.4l-1.5-2.8l-2.8,0.9l-0.9-3.7l-5.8,0.9l-5.5-3l-3.9-5.6l-4.6,4.3h-6l-7.4-4.8H421v-0.1l-2.2-6.9l-3-2.8 l5.3-3.3l1.6-2.4l-1.1-2.9l4.6-4.9L425.8,207.1z"
        ><title>
        89 Yonne &#013;Bourgogne-Franche-Comté
      </title></path>
      <path
        data-nom="Territoire de Belfort"
        data-numerodepartement="90"
        className={visited.includes('90') ? "departement visited" : "departement"}
        d="m580.3,215.9l0.9-0.6l7.6,5l0.5,9l2.8-0.2l2,5 l-0.1,0.1l-2.79,0.39l-1.11-0.39l-3.19,4.34L586.5,239l-1.4-2.4l1.4-2.5l-5.9-2.7h-0.1l-1.4-5.5l-1.1-4.3L580.3,215.9z"
        ><title>
        90 Territoire de Belfort &#013;Bourgogne-Franche-Comté
      </title></path>
    </g>
    <g className="region region-28" data-nom="Normandie" data-code_insee={28}>
      <title>Normandie</title>
      <path
        data-nom="Calvados"
        data-numerodepartement="14"
        className={visited.includes('14') ? "departement visited" : "departement"}
        d="m316.9,148l-0.7,2.2l-5.6-1l-7,1.7l-7.2,5.4 l-2.9,0.3l-5.7-1.1l-2.6,1.7l-4.9-3l-6.4,2.3l-2.7-1.3l-0.9,2.7l-5.4,2.9l-9.7-2.1l-1.8-2.4l4.5-5.3l-1.6-2.3l8.1-4.9l-2.2-8.2 l2-2.6l-8.4-3.1l-0.5-6.6v-0.1l0.1-0.7l1.8,0.8l1.9-2.1l3.4-0.3l9.4,3.3l13.9,1.5l6.9,3.4l5.7-0.7l4.7-2.5l4.1-3.7l5.1-1.1l0.3,8.3 h2.9l-2.3,2.1l2.8,9.4l-1.4,3L316.9,148z"
        ><title>
        14 Calvados &#013;Normandie
      </title></path>
      <path
        data-nom="Eure"
        data-numerodepartement="27"
        className={visited.includes('27') ? "departement visited" : "departement"}
        d="m316.4,153.4l-0.2-3.2l0.7-2.2l-2.3-4.1l1.4-3l-2.8-9.4l2.3-2.1h-2.9 l-0.3-8.3l1.7-0.4l0.28-0.1h1.52l-0.9-0.2l0.8-0.3l-1.29-0.3l5.89-2.4l7.6,5l3.4-0.7l4.9,3l-1.9,2.4l2.1,2.1l5.4,2.4l1.4-2.7 l8.2-2.5l4.8-7l13.1,3.3l3.5,8.4l-4,2.6l-4,9.5l-3.8-0.1l-2.3,2.6l1.8,5.8l-6,6.9l0.2,2.8l-6,1.3l-2.8-1.6l-5.3,3.2l-6,1.1l-2.4,2.6 l-3.4-2.1l1.7-2.3l-7.8-9.5L316.4,153.4z"
        ><title>
        27 Eure &#013;Normandie
      </title></path>
      <path
        data-nom="Manche"
        data-numerodepartement="50"
        className={visited.includes('50') ? "departement visited" : "departement"}
        d="m255.2,158.7l9.7,2.1l4.1,4.2l-1.8,6.7 l-3.6,4.5h-0.1l-8.6-0.8l-5.4-2.3l-7.1,4.8l-2.7-1l-4.7-9.6l1.9-0.2l4.8,0.4l2.5-1.1l0.5-2.2l-2.4,1.3l-5.1-5.6l-0.3-5.3l2-6.1 l-0.3-4.9l-1.8-3.6l0.4-7.4l1.5-2l-2.5,0.3l-2-5l0.3-2.2l-2.4-1.2l-2.9-4.1l-0.7-5.9l-1.4-1.9l1.8-1.8l0.1-2.8l-0.5-2.3l-2.2-1.1 l-1-2.5l2.1-0.2l11.9,4.2h2.4l4-2.6l5.1,0.6l1.8,1.7l0.9,2.7l-3.2,5.2l4,6.5l1.1,4.3l-0.1,0.7v0.1l0.5,6.6l8.4,3.1l-2,2.6l2.2,8.2 l-8.1,4.9l1.6,2.3l-4.5,5.3L255.2,158.7z"
        ><title>
        50 Manche &#013;Normandie
      </title></path>
      <path
        data-nom="Orne"
        data-numerodepartement="61"
        className={visited.includes('61') ? "departement visited" : "departement"}
        d="m266.9,179.9l-3.3-3.7l3.6-4.5l1.8-6.7 l-4.1-4.2l5.4-2.9l0.9-2.7l2.7,1.3l6.4-2.3l4.9,3l2.6-1.7l5.7,1.1l2.9-0.3l7.2-5.4l7-1.7l5.6,1l0.2,3.2l6.3,0.5l7.8,9.5l-1.7,2.3 l3.4,2.1l0.1,3.2l4.8,4.4l-0.2,4.5l0.5,4.6l-7.5,5.1l1.1,7.5l-3.2-0.7l-3.1-3.5l-2.9,1l-7.2-5l-1.6-8.4l-2.8-1.5l-11,5.9l-3-0.1 v-0.1v-2.9l-3.3-1.6l-1.9-6l-2.7-0.2l-0.7,2.7h-9.1l-6.7,3.3l-2.5-1.7L266.9,179.9z"
        ><title>
        61 Orne &#013;Normandie
      </title></path>
      <path
        data-nom="Seine-Maritime"
        data-numerodepartement="76"
        className={visited.includes('76') ? "departement visited" : "departement"}
        d="m314.41,119.8l-7.61-1.8l-1.2-2l-0.1-2.3 l4.4-9.7l13.8-7.4L326,95l10.3-2.1l4.8-1.8l2.4,0.3L352,87l5.11-4.09l11.79,9.99l3.4,8.4l-3.1,4.7l1.4,8.7l-1.3,8l-13.1-3.3l-4.8,7 l-8.2,2.5l-1.4,2.7l-5.4-2.4l-2.1-2.1l1.9-2.4l-4.9-3l-3.4,0.7l-7.6-5L314.41,119.8z"
        ><title>
        76 Seine-Maritime &#013;Normandie
      </title></path>
    </g>
    <g
      className="region region-32"
      data-nom="Hauts-de-France"
      data-code_insee={32}
    >
      <title>Hauts-de-France</title>
      <path
        data-nom="Aisne"
        data-numerodepartement="02"
        className={visited.includes('02') ? "departement visited" : "departement"}
        d="m450.3,82.6l16.7,4.6l2.91,0.94L470.6,94l-1.3,3.5l1.3,3.1l-5,7.2 l-2.7,0.3l0.3,14.3l-1,2.8l-5.3-1.8l-8,4l-1.2,2.6l3.2,8l-5.5,2.3l1.6,2.4l-0.8,2.7l2.5,1.3l-7.7,10.2l-9.3-6l-3.9-4.2l0.7-2.8 l-1.8-2.5l-2.6-0.7l2.1-1.7l-0.5-2.8l-2.9-1.1l-2.4,1.5l-0.7-2.9l3,0.2l-2.9-4.5l2.6-1.7l2.4-5.7l2.6-1.1l-2.2-1.8l0.8-4.5 l-0.4-10.2l-2.3-7l3.9-8.1l0.4-3.8l12.6-0.6l2.6-2.2l2.3,1.7L450.3,82.6z"
        ><title>
        02 Aisne &#013;Hauts-de-France
      </title></path>
      <path
        data-nom="Nord"
        data-numerodepartement="59"
        className={visited.includes('59') ? "departement visited" : "departement"}
        d="m384.33,25.06l0.87-0.26l2,0.8l1.1-2.1l7.9-2.1 l2.9,0.3l4.4-1.9v-0.1l1.2,4.8l2.3,3.7l-1.6,1.9l0.6,0.8l1.2,5.8h3.4l2.7,5.1l3.1,1.5h2.1l0.6-2.4l8.1-3l3.8,7.5l0.1,1l1.3,5.2 l2,3.5h0.1l2.8,0.6l2.1-1.4l2.4-0.2l-0.5,2.2l2.2-0.7l2.8,1l1.8,4.4l-0.6,2.3l0.7,2.3l1.4,1.9l1.1-2.6l4.6-0.3l2.4,1.1L462,64l5.5,6 l2.3,0.2l-2.1,2.4l-1.4,4.7l2.6,0.2l1.4,3.3l-3.5,3.9l0.2,2.5l-16.7-4.6l-5.2,1.8l-2.3-1.7l-2.6,2.2l-12.6,0.6l-3.3-2.6l3.5-10.6 l-1.8-2.4l-3-0.4l0.7-2.7l-3.9-5.2l3.1-1.6l-3.8-5.3l-5.9-1l1-6.1l-1.3-2.5l-1.7,2.2l-11.6-0.5l-4.1-4.2l0.6-2.8l-5.5-2.6 L384.33,25.06z"
        ><title>
        59 Nord &#013;Hauts-de-France
      </title></path>
      <path
        data-nom="Oise"
        data-numerodepartement="60"
        className={visited.includes('60') ? "departement visited" : "departement"}
        d="m372.8,131.1l-3.5-8.4l1.3-8l-1.4-8.7l3.1-4.7 l4.1,3.7l3.1-1.2l14.4,2.2l12.8,6.7l8.6-6.8l10.3-1.5l0.4,10.2l-0.8,4.5l2.2,1.8l-2.6,1.1l-2.4,5.7l-2.6,1.7l2.9,4.5l-3-0.2l0.7,2.9 l2.4-1.5l2.9,1.1l0.5,2.8l-2.1,1.7l-8.1,2.9l-2.5-1.6l-2,2.2l-6.9-1l-10.9-6.4l-2.2,1.6l-9.2-2.2L376,138l-5.6-1.1l-1.6-3.2 L372.8,131.1z"
        ><title>
        60 Oise &#013;Hauts-de-France
      </title></path>
      <path
        data-nom="Pas-de-Calais"
        data-numerodepartement="62"
        className={visited.includes('62') ? "departement visited" : "departement"}
        d="m379.8,68.9l7.1,5.8l12-2.5l-2.6,5.7L398,81 l2.5-3.1l8.4,3.5l0.8-2.8l2.8,4.6l2.4-1.7l0.8,3.2l8.6-1.8l3.5-10.6l-1.8-2.4l-3-0.4l0.7-2.7l-3.9-5.2l3.1-1.6l-3.8-5.3l-5.9-1 l1-6.1l-1.3-2.5l-1.7,2.2l-11.6-0.5l-4.1-4.2l0.6-2.8l-5.5-2.6l-6.27-12.14L372.6,28.5l-6.4,5.4l0.9,5.6l-1.7,4.6l0.6,6.7l2,4.2 l-1.7-1.4l-0.3,9.7l2.27,1.58l10.53,1.02L379.8,68.9z"
        ><title>
        62 Pas-de-Calais &#013;Hauts-de-France
      </title></path>
      <path
        data-nom="Somme"
        data-numerodepartement="80"
        className={visited.includes('80') ? "departement visited" : "departement"}
        d="m424.3,82.9l3.3,2.6l-0.4,3.8l-3.9,8.1l2.3,7 l-10.3,1.5l-8.6,6.8l-12.8-6.7l-14.4-2.2l-3.1,1.2l-4.1-3.7l-3.4-8.4l-11.79-9.99L359.5,81l3.4-6.6l1.9-1.1l0.1-0.1l1.4,1.8l3.5,0.3 l-5.6-6l1.2-5.1l2.9,0.7l-0.03-0.02l10.53,1.02l1,3l7.1,5.8l12-2.5l-2.6,5.7L398,81l2.5-3.1l8.4,3.5l0.8-2.8l2.8,4.6l2.4-1.7 l0.8,3.2L424.3,82.9z"
        ><title>
        80 Somme &#013;Hauts-de-France
      </title></path>
    </g>
    <g className="region region-44" data-nom="Grand Est" data-code_insee={44}>
      <title>Grand Est</title>
      <path
        data-nom="Ardennes"
        data-numerodepartement="08"
        className={visited.includes('08') ? "departement visited" : "departement"}
        d="m469.91,88.14l0.79,0.26l9.8,0.4l7.3-3.2l1.1-6 l4-3.8l2.8-0.2v3.8L494,81l-0.6,5.2l3.3,4.5l-1,2.4l0.6,3.1l1.4,1.9l3.3-0.9l4.3,2.4l2.8,3.8l4.9,0.6l2,1.7l-0.9,2.4l2.1-0.13 l-1.6,1.13l-2,2.7l-5.7-2.1l-1.9,2l0.8,8.8l-3.2,5.1l1.4,2.5l-4.2,3.6v0.1l-20.1-1.9l-9.8-6.6l-6.7-0.9l-0.3-14.3l2.7-0.3l5-7.2 l-1.3-3.1l1.3-3.5L469.91,88.14z"
        ><title>
        07 Ardennes &#013;Grand Est
      </title></path>
      <path
        data-nom="Aube"
        data-numerodepartement="10"
        className={visited.includes('10') ? "departement visited" : "departement"}
        d="m442.2,186.9l-3.6-1.5l-0.4-8.5l2.9-0.8l3-5 l3.2,4.5l9,1.2v-3.3l9.5-7.6l6.5-0.9l3.1,0.5l0.4,6.1l2.6,2c1.9,0.8,3.8,1.5,5.6,2.3l2.5-1.5l3.3,1.1l-0.6,3.4l2.4,5.2l5.6,3 l0.5,9.9l-0.1,2.7l-5.6,2.5l0.2,4.8l-3.9-0.5l-4.7,3.9l-6.1,0.9l-2.2,2l-2.9-1.4l-12.6,1.6l-5-10.9l-3.6-4.1l-2,2.2l-2.5-8.3 L442.2,186.9z"
        ><title>
        10 Aube &#013;Grand Est
      </title></path>
      <path
        data-nom="Marne"
        data-numerodepartement="51"
        className={visited.includes('51') ? "departement visited" : "departement"}
        d="m440.6,158.9l0.4-2l7.7-10.2l-2.5-1.3l0.8-2.7 l-1.6-2.4l5.5-2.3l-3.2-8l1.2-2.6l8-4l5.3,1.8l1-2.8l6.7,0.9l9.8,6.6l20.1,1.9l2.2,9l-1,4.1l2.6,1.3l-0.6,3.9l-3.1,1.1l-1.1,5.8 l3.2,4.6l0.5,4.1l-8.6,2.2l2.2,2.5l-2.3,2.2l0.7,2.9h-4.7l-3.3-1.1l-2.5,1.5c-1.8-0.8-3.7-1.5-5.6-2.3l-2.6-2l-0.4-6.1l-3.1-0.5 l-6.5,0.9l-9.5,7.6v3.3l-9-1.2l-3.2-4.5l-2.6-1.7l-3.5-8.3L440.6,158.9z"
        ><title>
        51 Marne &#013;Grand Est
      </title></path>
      <path
        data-nom="Haute-Marne"
        data-numerodepartement="52"
        className={visited.includes('52') ? "departement visited" : "departement"}
        d="m493.9,167.9l8.6-2.2l3.4,5.2l16.9,10.4 l-2.4,2.3l12.7,9.5l-1.7,8.6l5.5,4.7l0.2,3.1l2.7-1.1l1.3,2.5v0.1l0.2,1.4l-2.3,3.2l-2.9-0.3l-2,2.4l-0.3,8.3l-3.2,1l-2.1-1.8 l-6.6,3.9l-1.2,2.5l-4.8,1.9v-2.8l-3-1.6l-9.2-2l-2.3-4.8l2.8-2.4l-1-3.1l-1.8-2.2l-2.9-0.3l0.3-2.9l-2.6-1l-0.5-2.7l-3.5-0.7 l-0.2-4.8l5.6-2.5l0.1-2.7l-0.5-9.9l-5.6-3l-2.4-5.2l0.6-3.4h4.7l-0.7-2.9l2.3-2.2L493.9,167.9z"
        ><title>
        52 Haute-Marne &#013;Grand Est
      </title></path>
      <path
        data-nom="Meurthe-et-Moselle"
        data-numerodepartement="54"
        className={visited.includes('54') ? "departement visited" : "departement"}
        d="m588.2,170.9l1.9,1.3l-1.5,0.4l-10.6,7.6l-6.1-1.6l-1.6-2.7l-5.3,3.8 l-6,1l-2.4-1.8l-5.4,2l-1.1,2.8l-5.7,0.7l-4.1-4.8l0.1-2.9l-5.8-0.6l0.2-2.9l-2.5-2l1.7-2.8l-1.3-8.6l2.2-13.8l0.9-2.7l-4.9-11.5 l1.5-5.9l-1.2-2.7l-4.4-4.8l-5.3,2l-0.7-5.3l4.8-1.7l2-1.9h6.8l2.54,2.31L539.6,124l2.5,1.6l1.2,3.6l-1.7,3.1l1,5.6l-2.8,0.1 l4.3,7.5l11.5,4l-0.3,2.9l2.7,5.1l8.5,1.5l5.3,3.9l14.4,5.3L588.2,170.9z"
        ><title>
        54 Meurthe-et-Moselle &#013;Grand Est
      </title></path>
      <path
        data-nom="Meuse"
        data-numerodepartement="55"
        className={visited.includes('55') ? "departement visited" : "departement"}
        d="m516.2,107.97l1.2-0.07l1.5,1.6l1.9,5.6 l0.7,5.3l5.3-2l4.4,4.8l1.2,2.7l-1.5,5.9l4.9,11.5l-0.9,2.7l-2.2,13.8l1.3,8.6l-1.7,2.8l2.5,2l-0.2,2.9l-1.9,2.3l-3-0.5l-6.9,3.4 l-16.9-10.4l-3.4-5.2l-0.5-4.1l-3.2-4.6l1.1-5.8l3.1-1.1l0.6-3.9l-2.6-1.3l1-4.1l-2.2-9v-0.1l4.2-3.6l-1.4-2.5l3.2-5.1l-0.8-8.8 l1.9-2l5.7,2.1l2-2.7L516.2,107.97z"
        ><title>
        55 Meuse &#013;Grand Est
      </title></path>
      <path
        data-nom="Moselle"
        data-numerodepartement="57"
        className={visited.includes('57') ? "departement visited" : "departement"}
        d="m539.6,124l-2.65-10.19l0.65,0.59h2.4l1.5,2.1 l2.3,0.7l2.3-0.5l1-2.3l2-1.2l2.2-0.2l4.5,2.3l4.9-0.1l3.1,3.8l2.3,1.9l-0.5,2l3.7,3.2l2.8,4.5v2.3l4.2,0.7l1.2-1.9l-0.3-2.4 l2.6-0.2l3.8,1.8l1.4,3.5l2.1-1.5l2.5,1.9l5.8-0.4l5.3-4.2l2.2,1.4l0.5,2.1l2.4,2.4l3.2,1.5h0.03l-1.73,4.4l-1.4,2.6l-8.9,0.3 l-9.1-4.6l-0.8-2.8l-5,10.8l5.5,2.4l-1.6,2.5l2.3,1.7l1.3-2.5l3,0.3l4.3,3.4l-3,13.3l-2.3,1.8l-3.4-0.3l-2-2.7l-14.4-5.3l-5.3-3.9 l-8.5-1.5l-2.7-5.1l0.3-2.9l-11.5-4l-4.3-7.5l2.8-0.1l-1-5.6l1.7-3.1l-1.2-3.6L539.6,124z"
        ><title>
        57 Moselle &#013;Grand Est
      </title></path>
      <path
        data-nom="Bas-Rhin"
        data-numerodepartement="67"
        className={visited.includes('67') ? "departement visited" : "departement"}
        d="m631.8,140.7l-2.8,9.4l-7.8,10.5l-2,1.5l-1.4,3.3l0.3,4.9l-2.4,7.2 l0.7,3.6l-1.5,2l-1.2,5.5l-3.16,6.23L605.9,193l-0.3-2.8l-8.5-5.6l-3.1-0.2l-5.2-2.2l1.3-10l-1.9-1.3l3.4,0.3l2.3-1.8l3-13.3 l-4.3-3.4l-3-0.3l-1.3,2.5l-2.3-1.7l1.6-2.5l-5.5-2.4l5-10.8l0.8,2.8l9.1,4.6l8.9-0.3l1.4-2.6l1.73-4.4l8.87,0.6l2.4-0.6 L631.8,140.7z"
        ><title>
        67 Bas-Rhin &#013;Grand Est
      </title></path>
      <path
        data-nom="Haut-Rhin"
        data-numerodepartement="68"
        className={visited.includes('68') ? "departement visited" : "departement"}
        d="m605.9,193l4.64,1.83l-0.04,0.07v5.3l1.6,1.9 l0.2,3.4l-2.2,11.1l0.1,6.7l1.8,1.5l0.6,3.5l-2.2,2l-0.2,2.3l-3.1,0.9l0.5,2.2l-1.5,1.6h-2.7l-3.8,1.4l-3-1.1l0.3-2.5l-2.4-1.1 l-0.4,0.1l-2-5l-2.8,0.2l-0.5-9l-7.6-5l2.8-2.4v-6.2l4.8-7.8l4.1-13.5l1.1-1l3.1,0.2l8.5,5.6L605.9,193z"
        ><title>
        68 Haut-Rhin &#013;Grand Est
      </title></path>
      <path
        data-nom="Vosges"
        data-numerodepartement="88"
        className={visited.includes('88') ? "departement visited" : "departement"}
        d="m520.4,183.6l2.4-2.3l6.9-3.4l3,0.5l1.9-2.3 l5.8,0.6l-0.1,2.9l4.1,4.8l5.7-0.7l1.1-2.8l5.4-2l2.4,1.8l6-1l5.3-3.8l1.6,2.7l6.1,1.6l10.6-7.6l1.5-0.4l-1.3,10l5.2,2.2l-1.1,1 l-4.1,13.5l-4.8,7.8v6.2l-2.8,2.4l-0.9,0.6l-8.4-6.6l-5.1,2.2l-4.9-3.6l-5.8,1.6l-7-4.3l-8,5.8v-0.1l-1.3-2.5l-2.7,1.1l-0.2-3.1 l-5.5-4.7l1.7-8.6L520.4,183.6z"
        ><title>
        88 Vosges &#013;Grand Est
      </title></path>
    </g>
    <g
      className="region region-52"
      data-nom="Pays de la Loire"
      data-code_insee={52}
    >
      <title>Pays de la Loire</title>
      <path
        data-nom="Loire-Atlantique"
        data-numerodepartement="44"
        className={visited.includes('44') ? "departement visited" : "departement"}
        d="m213.1,265.2l1.8-1l-2.8-4.1l-7.8-3l3-1.3 l0.6-2.2l-0.5-2.5l1.4-2.1l5.8-1.1l-5.5-0.7l-6.6,3.7l-4.1-3.2l-2.2,1l-2.2-1.2l-0.5-4.9l0.9-2.5l3-0.5l-0.9-2.2l-0.18-0.31 l13.18-3.89l0.4-6l5.2-3.4l13.2-0.4l1.6-2.9l9-3.9l6.8,3.6l7.2,13.3l-2.7-0.4l-1.9,2.4l8.5,3.3l0.3,5.9l-14.3,2.1l-2.9,2.2l3,0.8 l3.6,4.7l0.8,2.8l-2.8,4.5l2.8,1.4l0.4,3l-4.8-3.5l-1.5,2.4l-3.2,0.7l0.5,3l-2.4,2.1l-2.3-1.7v-3.1l-3.4,0.2l-0.2,9.5l-11.7-5 L213.1,265.2z"
        ><title>
        44 Loire-Atlantique &#013;Pays de la Loire
      </title></path>
      <path
        data-nom="Maine-et-Loire"
        data-numerodepartement="49"
        className={visited.includes('49') ? "departement visited" : "departement"}
        d="m270.6,269.2l-12.3,0.8l-10.6-3.8l-0.4-3 l-2.8-1.4l2.8-4.5l-0.8-2.8l-3.6-4.7l-3-0.8l2.9-2.2l14.3-2.1l-0.3-5.9l-8.5-3.3l1.9-2.4l2.7,0.4l-7.2-13.3l0.4-2.2l10.5,3.5 l2.1-1.9l8.7,3.6l3,0.4l5.9-2.7l5.1,1.7l0.6,2.7l6.7-0.2l0.2,3.5l2,2l3.1-1.3l5.2,3.3l7.4,0.1l-0.7,2.4l-1.7,9.3l-5.8,15.3v0.1 l-6.6,5.9l-2.3-2.3l-9.6,0.2l-5.6,0.8L270.6,269.2z"
        ><title>
        49 Maine-et-Loire &#013;Pays de la Loire
      </title></path>
      <path
        data-nom="Mayenne"
        data-numerodepartement="53"
        className={visited.includes('53') ? "departement visited" : "departement"}
        d="m256.6,221.5l-10.5-3.5l3.6-8.6l5.5-2.2 l-1.9-17.3l1.5-2.4l0.1-12.1l8.6,0.8h0.1l3.3,3.7l2.4-1.6l2.5,1.7l6.7-3.3h9.1l0.7-2.7l2.7,0.2l1.9,6l3.3,1.6v2.9v0.1l-4.3,2.7 l0.3,6.9l-4.4,4l1.2,2.9l-5,4.6l1.4,3.4l-5.5,7.7l1.5,5.6l-5.1-1.7l-5.9,2.7l-3-0.4l-8.7-3.6L256.6,221.5z"
        ><title>
        53 Mayenne &#013;Pays de la Loire
      </title></path>
      <path
        data-nom="Sarthe"
        data-numerodepartement="72"
        className={visited.includes('72') ? "departement visited" : "departement"}
        d="m312.7,235.3l-6.1-2.6l-7.4-0.1l-5.2-3.3 l-3.1,1.3l-2-2l-0.2-3.5l-6.7,0.2l-0.6-2.7l-1.5-5.6l5.5-7.7l-1.4-3.4l5-4.6l-1.2-2.9l4.4-4l-0.3-6.9l4.3-2.7l3,0.1l11-5.9l2.8,1.5 l1.6,8.4l7.2,5l2.9-1l3.1,3.5l3.2,0.7l2.1,3.8l-0.4,1.8v0.1l-2,2.1l1.7,2.2l0.4,5.5l-6.3,10.6l-3.2,1.1l-0.6,3.5l-7.7,4.5l-2.8-0.3 L312.7,235.3z"
        ><title>
        72 Sarthe &#013;Pays de la Loire
      </title></path>
      <path
        data-nom="Vend\xE9e"
        data-numerodepartement="85"
        className={visited.includes('85') ? "departement visited" : "departement"}
        d="m269.3,305.1l0.2-7.4l-4.7-17.9l-4.2-4.1l-2.3-5.7l-10.6-3.8l-4.8-3.5l-1.5,2.4l-3.2,0.7 l0.5,3l-2.4,2.1l-2.3-1.7v-3.1l-3.4,0.2l-0.2,9.5l-11.7-5l-5.6-5.6l-0.3,0.1l-0.8,2.6l-3.4,4.3l-1.2,2.3l0.2,2.4l8.7,9.5l2.7,5.6 l1.2,5.3l8,5.4l3.4,0.5l3.9,4.3l2.9-0.1l2,1.2l1.8,2.5l-0.9-2.1l3.9,3.3l0.5-2.7l2.4,0.3l7.1-2.7l-1.4,2.9l6.5-0.3l2.4,1.8l9.1-4.5 L269.3,305.1z"
        ><title>
        85 Vend\xE9e &#013;Pays de la Loire
      </title></path>
    </g>
    <g className="region region-53" data-nom="Bretagne" data-code_insee={53}>
      <title>Bretagne</title>
      <path
        data-nom="C\xF4tes-d\u2019Armor"
        data-numerodepartement="22"
        className={visited.includes('22') ? "departement visited" : "departement"}
        d="m208.7,188.9l-4.9,7.1l-2.9,1.1l-1.5-2.7 l-3.5-0.9l-6.2,7.5l-1.8-6l-3,0.9l-12.9-6.5l-7.9,3l-12.46-3.29l2.06-4.11l-2.5-9.3l2.5-8.3l-3.6-4.7l1.1-4.3l1.2,1.4l3.2-0.4 l1.1-7.7l1.5-1.6l2.2-0.6l1.9,1.4h2.5l2.1-1l2.2,0.3l1.5-1.8l0.9,2L170,153l3-3.6l2.9-0.8l-0.1,2.3l-1.2,4.4l1.7-3.1l2.6-0.5l-1.1,2 l7.2,7.8l2.2,5.4l3,2l0.8,3.7l0.7-2.2l3-1l2.4-2.7l8.1-3.3l2.7-0.2l-2,2.5l2.9-1.1l1.8,4.4l1.3-1.9l2.5,0.2v-0.09l1.6,3.99h-0.3h0.3 l2.5,0.3l0.7,0.2l0.4,1.7l-1.9,13L208.7,188.9z"
        ><title>
        22 C\xF4tes-d\u2019Armor &#013;Bretagne
      </title></path>
      <path
        data-nom="Finist\xE8re"
        data-numerodepartement="29"
        className={visited.includes('29') ? "departement visited" : "departement"}
        d="m151.6,210.1l2,3.4l-0.8,1.4l-5.5-1.2l-1.2-1.9 l2.2-0.7l-3,0.8l-0.3-2.7v2.7l-2.5,0.7l-2.2-1l-4.2-6.1l-0.8,2.5l-2.3,0.2l-3.5-3.1l1.6-4.6l-2.4,4.3l1.3,1.9l-2.2,1l-1,2.8 l-5.9-0.2l-2.1-1.6l1.5-1.6l-1.5-5.5l-2.4-3.1l-2.8-1.8l1.6-1.7l-2.1,1.4l-7.5-2.2l2.2-1.3l12.5-1.8l1.8,1.8l2-1.3l0.7-2.5l-1.6-3.6 l-6.8-2.5l-1.5,2.6l-2.6-4.2l1.3-1.8l-0.3-2.2l1.7,2.3l4.9,1l4.6-0.8l2.1,3.1l5.4,1l-3.7-0.9l-2.8-2l2.2-0.5l-4.2-2l2-1.5l-2.6-0.2 l-2.7,0.8l-0.8-2.2l7.1-4.5l-4.4,2.2l-2.3,0.1l-7.5,2.9l-2.7-1.2l-2.7,1.2l-1.5-1.8l0.6-5.3l2.5-1.6l-2.2-0.9l0.8-2.6l1.8-1.6 l2.1-0.8l5.1,1.5l-1.9-1.1l2.5-1.2l1.6,1.4l-1.9-1.7l1.2-1.9l2.9-0.1l3.8-2l2.3,2.6l6.7-3.1l3,1.6l1-2.2l2.9-0.5l0.4,5l2.2-1.5 l1.3,2.5l1.2-4.5l4.7,0.3l1.2,1.7l-1.1,4.3l3.6,4.7l-2.5,8.3l2.5,9.3l-2.06,4.11l-0.04-0.01v0.1l-6.8,3.2l0.5,3.5l3.4,5.5l8.1,1.3 l0.1,5.4l-2.5,2.8L151.6,210.1z"
        ><title>
        29 Finist\xE8re &#013;Bretagne
      </title></path>
      <path
        data-nom="Ille-et-Vilaine"
        data-numerodepartement="35"
        className={visited.includes('35') ? "departement visited" : "departement"}
        d="m255.2,207.2l-5.5,2.2l-3.6,8.6l-0.4,2.2 l-6.8-3.6l-9,3.9l-1.6,2.9l-13.2,0.4l-5.2,3.4l-1-5.8l3-0.7l-2.8-1.5l2.4-2.2l1-3.2l-2.4-1.7l1.6-2.6l-1.2-2.5l-5.1-2.8l-0.5-2.8 l3.5-0.9l-3.6-0.1l-1-4.4l4.9-7.1l9-2.5l1.9-13l-0.4-1.7l-0.7-0.2l-2.5-0.3l-1.6-3.99l0.05-0.86l0.05-0.85l0.7-0.1h2.1v0.1l1.7,4.4 l1.3,2l-0.5,2.1l1.4-2.1l-2.3-5.1l0.7-2.5l2.2-1.5l2.3-0.6l2.2,1l-1.5,2.3l2.9,2.4l7.3-0.6l4.7,9.6l2.7,1l7.1-4.8l5.4,2.3l-0.1,12.1 l-1.5,2.4L255.2,207.2z"
        ><title>
        35 Ille-et-Vilaine &#013;Bretagne
      </title></path>
      <path
        data-nom="Morbihan"
        data-numerodepartement="56"
        className={visited.includes('56') ? "departement visited" : "departement"}
        d="M167.7,242.6l2.9,1.2l-1.1,2.1l-5.1-1.2l-1.3-2.7l0.4-3l2.1,1.4L167.7,242.6z M209.1,219.2l2.4-2.2l1-3.2 l-2.4-1.7l1.6-2.6l-1.2-2.5l-5.1-2.8l-0.5-2.8l3.5-0.9l-3.6-0.1l-1-4.4l-2.9,1.1l-1.5-2.7l-3.5-0.9l-6.2,7.5l-1.8-6l-3,0.9 l-12.9-6.5l-7.9,3l-12.46-3.29l-0.04,0.09l-6.8,3.2l0.5,3.5l3.4,5.5l8.1,1.3l0.1,5.4l-2.5,2.8l-2.8-0.8l2,3.4l0.1,1.5l2.9,4.4 l2.3-0.2l1.5-1.7l-0.8-5.1l0.6,2.4l1.7,1.7l1.9-1.7l-2.5,4.2l2.2,1.4l-2.3-0.6l3.2,1.9l0.1,0.1l1.6,1l1.7-2.5l-1.6,3.1l2.1,2.6 l0.6,3.5l-0.9,2.8l2.1,1.1l-1.2-3l0.5-3.8l2.2,1.6l5.1,0.1l-0.7-5l1.4,2l2.1,1.5l4.8-0.5l2.1,2.4l-1,2.2l-2.1-0.6l-4.8,0.4l3.8,3.3 l12.9-0.9l3.1,1.5l-3.4,0.1l1.42,2.39l13.18-3.89l0.4-6l-1-5.8l3-0.7L209.1,219.2z"
        ><title>
        56 Morbihan &#013;Bretagne
      </title></path>
    </g>
    <g
      className="region region-75"
      data-nom="Nouvelle-Aquitaine"
      data-code_insee={75}
    >
      <title>Nouvelle-Aquitaine</title>
      <path
        data-nom="Charente"
        data-numerodepartement="16"
        className={visited.includes('16') ? "departement visited" : "departement"}
        d="m294.8,379.2l-2,2v-0.1l-6.3-6.3l-6-1.2l1.7-3l-2.3-2l2.4-1.7l-1.5-2.6 l1.7-2.6l-2.4-1.7l-0.3-3l-5-3.1l2.2-2.1l-3.2-5.6l8.1-3.3l2.3,2l2.7-0.1l2.7-11.6l2.7-1.6l0.3-3l5.8-2.5l3.5,0.4l0.8-0.8h0.1l9.1,3 l2.9-0.8l-1.4-2.4l2.2-1.8l4.1,3.9l3.8-1.4l1.3-2.5l4.8,0.6l-0.2,5.1l4.7,3.6l-0.6,3.2l-2.6,1.1l-4,8l-2.8,0.6l-3.4,3.8h0.1 l-5.7,6.1l-2.1,5.3l-7.9,5.9l-0.7,5.7l-4.1,5.8L294.8,379.2z"
        ><title>
        16 Charente &#013;Nouvelle-Aquitaine
      </title></path>
      <path
        data-nom="Charente-Maritime"
        data-numerodepartement="17"
        className={visited.includes('17') ? "departement visited" : "departement"}
        d="M242.8,341.1l-1.4-5l-3.5-3l-1.3-2.3l1.5-3.6l1.7,1.8l2.9,0.5l1.4,8.4L242.8,341.1z M241.9,318.9l-5.8-4.5 l-4.4-1.5l-0.6,2.9l2.7,0.1l4.8,3.3L241.9,318.9z M286.5,374.8l-6-1.2l1.7-3l-2.3-2l2.4-1.7l-1.5-2.6l1.7-2.6l-2.4-1.7l-0.3-3 l-5-3.1l2.2-2.1l-3.2-5.6l8.1-3.3l2.3,2l2.7-0.1l2.7-11.6l-3.6-4.7l-17.4-6.7l-5.9-6.5v-3.7l-2.4-1.8l-6.5,0.3l1.4-2.9l-7.1,2.7 l0.5,0.1l-0.6,3.4l-4.5,5.9l2.4,0.3l2.2,1.7l3,7.2l-1.5,1.9l-0.2,5.1l-3.3,3.1l-0.1,2.6l-2.2,0.4l-1.5,1.7l1.1,4.3l9,6.5l1.5,2.6 l4.3,2.7l3.7,4.8l1.81,7.3l3.79-0.5l0.7,2.8l6.4,1.7l0.6,5.8l6.1,4.3l9.4,1l2-5l0.1-0.4v-0.1L286.5,374.8z"
        ><title>
        17 Charente-Maritime &#013;Nouvelle-Aquitaine
      </title></path>
      <path
        data-nom="Corr\xE8ze"
        data-numerodepartement="19"
        className={visited.includes('19') ? "departement visited" : "departement"}
        d="m363.6,392.3l-8.1,0.8l-3.5-7l-3.2-0.7l-0.2-3 l-2.3-1.5l2-1.8l-1.7-3l3.6-4.6l-2.9-4.7l1.6-2.7l2.5,1.2l4.7-4l5.7-1.3l4.9-4.6l8.7-4l7-3.4l11.2,5.2l2.3-2.6l2.7,0.8l2.4-2.4 l1.2,5.6l-1.7,2.4l1.2,7.9l0.7,6l-6.2-2l-0.6,3.5l-7.6,9.5l1.8,2.2l-2.3,1.9l-0.3,3.5l-3.1,1.1l1.5,3.4l-3.2,1.9h-0.1l-6.7-0.2 l-5.3,2.7L363.6,392.3z"
        ><title>
        19 Corr\xE8ze &#013;Nouvelle-Aquitaine
      </title></path>
      <path
        data-nom="Creuse"
        data-numerodepartement="23"
        className={visited.includes('23') ? "departement visited" : "departement"}
        d="m396.6,343.5l4.4,5.5l-2.4,2.4l-2.7-0.8 l-2.3,2.6l-11.2-5.2l-7,3.4l-0.6-5.9l-4.7-3l-6.4-0.5l-0.1-2.8l-2.9-1.5l0.9-3.4l-1.8-5.2l-6.6-9.8l3-5.3l-1.2-2.6l2.8-2.9l11.5-1.1 l1.9-2.5l13.2,2.7l2.7-0.8l4.9,0.2l1.1,3.9c2.5,1.6,4.9,3.2,7.4,4.8l3.6,8.4l-0.5,4.1l2.3,6.7L396.6,343.5z"
        ><title>
        23 Creuse &#013;Nouvelle-Aquitaine
      </title></path>
      <path
        data-nom="Dordogne"
        data-numerodepartement="24"
        className={visited.includes('24') ? "departement visited" : "departement"}
        d="m307.7,414.3l-2.8-6.4l-1-1.3l0.9-2.9l-2.4-2.6l-2,3.2l-9.8-2.3l2-2 l0.2-5.7l2.8-5.5l-1.2-2.8l-3.7,0.6l2-5l0.1-0.4l2-2l5.5-0.7l4.1-5.8l0.7-5.7l7.9-5.9l2.1-5.3l5.7-6.1l6.2,3l-0.1,4.7l9.5-1.1 l7.2,5.6l-2,2.7l5.7,2.2l2.9,4.7l-3.6,4.6l1.7,3l-2,1.8l2.3,1.5l0.2,3l3.2,0.7l3.5,7l-0.7,5l-1.4,5.3l-4.5,3.2l0.6,3.6l-6,3.4 l-4.7,6.5l-4.2-4.2l-5.4,2.7l-1.5-6l-6.1,1l-2.2-1.8l-2.8,2L307.7,414.3z"
        ><title>
        24 Dordogne &#013;Nouvelle-Aquitaine
      </title></path>
      <path
        data-nom="Gironde"
        data-numerodepartement="33"
        className={visited.includes('33') ? "departement visited" : "departement"}
        d="m243.9,420.1l-5.8,2.6v-4.6l2.2-3.2l0.5-2.3 l1.9-1.7l1.8,1.4l3.1-0.2l-1.1-4.6l-3.5-3.4l-2.8,4l-1.2,3.8l6.2-50l0.9-2.8l3.3-3.4l1.4,4.7l9,9l2.8,7.6l1.7-3.1l-0.59-2.4 l3.79-0.5l0.7,2.8l6.4,1.7l0.6,5.8l6.1,4.3l9.4,1l3.7-0.6l1.2,2.8l-2.8,5.5l-0.2,5.7l-2,2l9.8,2.3l2-3.2l2.4,2.6l-0.9,2.9l1,1.3 l-3.1-0.1l-1.2,2.5l-2.7-0.9l-1.1,3.3l2.9,1.4l-8.5,8.6l-0.6,8.9l-3,2.3l1.5,2.5l-4.5,4l-2.1-2.7l-1.6,3.6h-6.4l-0.6-4.7l-11-7.7 l0.4-2.8l-17.2,0.7l1.5-5.4L243.9,420.1z"
        ><title>
        33 Gironde &#013;Nouvelle-Aquitaine
      </title></path>
      <path
        data-nom="Landes"
        data-numerodepartement="40"
        className={visited.includes('40') ? "departement visited" : "departement"}
        d="m222.32,481.21l1.08-1.51l3.9-7.1l8.8-37.8 l2-11.7v-0.4l5.8-2.6l3.7,1.3l-1.5,5.4l17.2-0.7l-0.4,2.8l11,7.7l0.6,4.7h6.4l1.6-3.6l2.1,2.7l0.4,4.6l11.7,2.9l-3.6,5.2l0.7,2.6 l-0.4,2.9l-2.5,1.3l-0.6-3l-9.4,2.7l0.5,6.4l-4.2,11.1l1.6,2.7l-8.6,1.5l-3.3-1.1l-4.8,1.9l-2.2-2l-2.3,1.5l-2.5-2.3l-9.8,2 l-1.6,2.2l-2.5-1.4l-2.7,1.3l-1.2-2.8l-11,2.5L222.32,481.21z"
        ><title>
        40 Landes &#013;Nouvelle-Aquitaine
      </title></path>
      <path
        data-nom="Lot-et-Garonne"
        data-numerodepartement="47"
        className={visited.includes('47') ? "departement visited" : "departement"}
        d="m293.8,455.6v0.1l-0.7-2.6l3.6-5.2L285,445 l-0.4-4.6l4.5-4l-1.5-2.5l3-2.3l0.6-8.9l8.5-8.6l-2.9-1.4l1.1-3.3l2.7,0.9l1.2-2.5l3.1,0.1l2.8,6.4l8.9-0.5l2.8-2l2.2,1.8l6.1-1 l1.5,6l5.4-2.7l4.2,4.2l-3.4,3.1l2.7,9.1l-7.5,2v2.9l2.4,1.4l-4.4,5.5l1.3,2.7l-2.8-0.2l-3.6,4.7l-2.7,1.3l-8.6-1l-5,2.9l-8.3-0.7 l-1.4,2.5L293.8,455.6z"
        ><title>
        47 Lot-et-Garonne &#013;Nouvelle-Aquitaine
      </title></path>
      <path
        data-nom="Pyr\xE9n\xE9es-Atlantiques"
        data-numerodepartement="64"
        className={visited.includes('64') ? "departement visited" : "departement"}
        d="m276.9,513.4l3.4-0.8l-0.4-2.9l8-9.3l-0.8-3.1 l2.7-1.4l-0.5-7.2h-2.9l1.5-2.8l-2.5-5.8l-6.6-0.3l-8.6,1.5l-3.3-1.1l-4.8,1.9l-2.2-2l-2.3,1.5l-2.5-2.3l-9.8,2l-1.6,2.2l-2.5-1.4 l-2.7,1.3l-1.2-2.8l-11,2.5l-3.98-1.89l-3.52,4.89l-2.7,1.9l-4.5,0.9l1.9,4.5l4.5-0.2l0.2,2.2l2.4,1l2.2-2.1l2.4,1.3l2.5,0.1 l1.4,2.8l-2.5,6.7l-2.1,2.2l1.3,2.2l4.3-0.1l0.7-3.4l2.3-0.1l-1.3,2.4l5.9,2.3l1.5,1.8h2.5l6.1,3.8l5.8,0.4l2.3-1l1.4,2.1l0.3,2.8 l2.7,1.3l3.9,4l2.1,0.9l1.1-2.1l2.7,2.1l3.6-1.1l0.19-0.16l1.41-9.34L276.9,513.4z"
        ><title>
        64 Pyr\xE9n\xE9es-Atlantiques &#013;Nouvelle-Aquitaine
      </title></path>
      <path
        data-nom="Deux-S\xE8vres"
        data-numerodepartement="79"
        className={visited.includes('79') ? "departement visited" : "departement"}
        d="m292.3,331.6l-2.7,1.6l-3.6-4.7l-17.4-6.7 l-5.9-6.5v-3.7l9.1-4.5l-2.5-2l0.2-7.4l-4.7-17.9l-4.2-4.1l-2.3-5.7l12.3-0.8l3.7-4.8l5.6-0.8l9.6-0.2l2.3,2.3l3.4,9l-0.8,3l2.7,1.2 l-4.5,14.1l2.7-0.9l1.5,3l-3.4,5.5l0.5,5.8l2.1,2l-0.1,2.8l6.4,0.2l-3.2,8.5l4.5,3l-0.8,2.8h-0.1l-0.8,0.8l-3.5-0.4l-5.8,2.5 L292.3,331.6z"
        ><title>
        79 Deux-S\xE8vres &#013;Nouvelle-Aquitaine
      </title></path>
      <path
        data-nom="Vienne"
        data-numerodepartement="86"
        className={visited.includes('86') ? "departement visited" : "departement"}
        d="m329.6,320.8v3.5l-4.8-0.6l-1.3,2.5l-3.8,1.4 l-4.1-3.9l-2.2,1.8l1.4,2.4l-2.9,0.8l-9.1-3l0.8-2.8l-4.5-3l3.2-8.5l-6.4-0.2l0.1-2.8l-2.1-2l-0.5-5.8l3.4-5.5l-1.5-3l-2.7,0.9 l4.5-14.1l-2.7-1.2l0.8-3l-3.4-9l6.6-5.9l5.5,3.2l0.3,3.2l2.9-0.3l1.3,6.1l2.8,1.4l10-0.4l-1.4-2.9l5.3,3l0.3,3.1l7.1,10l2.1,3 l-0.8,5.8l4.6,4.4h2.9l2.6,5.4l2.5,1.3l-1.5,2.8l-0.8-0.3l-1.3,2.4l-3.3-0.9l-1.3,3l-5.6,2.7L329.6,320.8z"
        ><title>
        86 Vienne &#013;Nouvelle-Aquitaine
      </title></path>
      <path
        data-nom="Haute-Vienne"
        data-numerodepartement="87"
        className={visited.includes('87') ? "departement visited" : "departement"}
        d="m348.9,364.1l-1.6,2.7l-5.7-2.2l2-2.7l-7.2-5.6 l-9.5,1.1l0.1-4.7l-6.2-3h-0.1l3.4-3.8l2.8-0.6l4-8l2.6-1.1l0.6-3.2l-4.7-3.6l0.2-5.1v-3.5l3-5l5.6-2.7l1.3-3l3.3,0.9l1.3-2.4 l0.8,0.3l2.6,1.1l5.8-1.1l1.7,2.5l1.2,2.6l-3,5.3l6.6,9.8l1.8,5.2l-0.9,3.4l2.9,1.5l0.1,2.8l6.4,0.5l4.7,3l0.6,5.9l-8.7,4l-4.9,4.6 l-5.7,1.3l-4.7,4L348.9,364.1z"
        ><title>
        87 Haute-Vienne &#013;Nouvelle-Aquitaine
      </title></path>
    </g>
    <g className="region region-76" data-nom="Occitanie" data-code_insee={76}>
      <title>Occitanie</title>
      <path
        data-nom="Ari\xE8ge"
        data-numerodepartement="09"
        className={visited.includes('09') ? "departement visited" : "departement"}
        d="m369.82,543.59l0.78-0.89l-2.6-1.1l-2-2.1 l-3.7-0.1l-1.7-1.7l-2.8,0.4l-1.3,2.1l-2.4-0.8l-2.8-5.9l-10-0.6l-1.3-2.8l-13.2-3.9l-0.5-1.4l3.8-5.2l2.8-1v-5.9l3.9-4l2.8-1.1 l6.2,4.1l-0.4-5.6l5.4-1.6l-3-4.8l2.8-1.1l3.4,5.5l2.8-0.5l0.6-2.8l5.7,2.2l2-2.3l2.2,5.5l8.7,3.9l2.2,5.2l0.2,3.1l-2.2,2.3l2.4,2.5 l-1.2,3l-3.2,0.6l0.8,5.7l3.4,1.5l3.3-1.2l4.8,5.6l-7.4,0.2l-1.3,2.6L369.82,543.59z"
        ><title>
        09 Ari\xE8ge &#013;Occitanie
      </title></path>
      <path
        data-nom="Aude"
        data-numerodepartement="11"
        className={visited.includes('11') ? "departement visited" : "departement"}
        d="m435.07,504.37l-1.47,1.53l-5.2,9.3l-0.9,3.5 l0.15,9.57l-9.45-5.57l-8.2,5.4l-13.6-1l-2.7,1.4l1.4,6l-8.6,3.9l-4.8-5.6l-3.3,1.2l-3.4-1.5l-0.8-5.7l3.2-0.6l1.2-3l-2.4-2.5 l2.2-2.3l-0.2-3.1l-2.2-5.2l-8.7-3.9l-2.2-5.5l8.4-10l1.4,2.7l5.2-1.8l0.5-0.8l1.8,2.3l6.3,0.9l1.1-3.3l2.8-0.5l12,1.4l-0.5,2.8 l3.5,5l2.5-1.6l1.4,2.9l3.1-0.8l3.8-5.3l1,2.9l13.8,4.7l1.7,2L435.07,504.37z"
        ><title>
        11 Aude &#013;Occitanie
      </title></path>
      <path
        data-nom="Aveyron"
        data-numerodepartement="12"
        className={visited.includes('12') ? "departement visited" : "departement"}
        d="m430.8,440.7l9.4,4.5l-2,3.9l-2.8,1.1l8.4,4.1 l-4.3,5.3l0.3,1.5l-3.7,1l-3,5.3l-6.3-1.3l-0.1,8.7l-5.7-0.1l-1.3-2.8l-11.1-1.3l-4.2-5l-4.3-11.5l-4.8-4.3L385,444l-6.1,2.8 l-4.3-3.6l2.3-2.4l-3.1-2.7l0.4-3l-0.8-9.1l7.6-5l5.9-1.4l1.7-1.5h0.1l5.1-3.2l6.4,1.5l3.8-4.8l3-9.1l4.7-4.2l5.2,4l1.3,4.2l2.4,1.6 l-0.5,3l2.6,5.1v0.1l4.2,4.5l2.9,8.8l-0.5,8.7L430.8,440.7z"
        ><title>
        12 Aveyron &#013;Occitanie
      </title></path>
      <path
        data-nom="Gard"
        data-numerodepartement="30"
        className={visited.includes('30') ? "departement visited" : "departement"}
        d="m480,487.2l-2.8-0.6l-1.9-1.6l-1.1-3.4h-0.1 l3.3-4.4l-1.5-3l-6.1-6.7l-3-0.2l-0.2-3l-6.8-1.4l0.9-2.7l-1.9-2.6l-3.9,0.6l-4.2,3.9l-0.1,2.8l-5.3-2.5l-2.2,1.7l-0.4-2.9l-2.9-0.1 l-0.3-1.5l4.3-5.3l-8.4-4.1l2.8-1.1l2-3.9l7.8,3.4l3.9-0.5l0.1-3.3l8.7,2.2l6.3-1.8l-1.4-3l1.2-2.9l-3.9-7.7l3.6-2.5l1.1-2.1 l2.7,5.9l7.8,5l7.1-4.3l0.1,3.1l2.5-2.3h2.8l6,3.5l2.6,4.4l0.2,5.5l6.3,6.4l-4.5,5l-3.9,4.1l-1.9,10.6l-3.3-0.9l-4.2,4.8l1,2.7 l-5.8,1.8L480,487.2z"
        ><title>
        30 Gard &#013;Occitanie
      </title></path>
      <path
        data-nom="Haute-Garonne"
        data-numerodepartement="31"
        className={visited.includes('31') ? "departement visited" : "departement"}
        d="m326.8,526.2l-5.5-1.5l-1.2,2.4l0.2,7.6 l-8.8-0.7l-1.7,0.3l-0.6-7l5.5-3.2l2.6-5.3l-0.8-2.7l-3.1,0.3l0.6-3.5l-4.6-4l7.1-11.2l3.1-1.1l3.5-5.3l11.4,2.5l0.7-5.8l6.5-6.1 l-9.1-13.3l9.9-0.9l1.7,2.3l5.8-2.5l-2.2-2.3l11.7-4.3l1.4,6.3l2.6,1.2l0.2,2.8l2.3,2.1l-0.7,5.4l14.3,9.3l1,2.8l-0.5,0.8l-5.2,1.8 l-1.4-2.7l-8.4,10l-2,2.3l-5.7-2.2l-0.6,2.8l-2.8,0.5l-3.4-5.5l-2.8,1.1l3,4.8l-5.4,1.6l0.4,5.6l-6.2-4.1l-2.8,1.1l-3.9,4v5.9 l-2.8,1l-3.8,5.2L326.8,526.2z"
        ><title>
        31 Haute-Garonne &#013;Occitanie
      </title></path>
      <path
        data-nom="Gers"
        data-numerodepartement="32"
        className={visited.includes('32') ? "departement visited" : "departement"}
        d="m330.6,461.7l2,6.9l9.1,13.3l-6.5,6.1l-0.7,5.8 l-11.4-2.5l-3.5,5.3l-3.1,1.1l-12.4-2.2l-1.4-3l-5.5,0.6l-2.6-8.7l-3.3-1.3l-2-3.5l-3.9,0.5l-6.6-0.3l-1.6-2.7l4.2-11.1l-0.5-6.4 l9.4-2.7l0.6,3l2.5-1.3l0.4-2.9v-0.1l3.7,0.7l1.4-2.5l8.3,0.7l5-2.9l8.6,1l2.7-1.3l5.3,1.7l-3.3,4.6L330.6,461.7z"
        ><title>
        32 Gers &#013;Occitanie
      </title></path>
      <path
        data-nom="H\xE9rault"
        data-numerodepartement="34"
        className={visited.includes('34') ? "departement visited" : "departement"}
        d="m474.1,481.6l-2.4-0.1l-5.9,2.6l-3.6,3.2 l-7.2,4.6l-4.3,4.2l2.1-3.5l-4.3,6.6h-6.8l-5.5,4l-1.13,1.17l-0.17-0.17l-1.7-2l-13.8-4.7l-1-2.9l-3.8,5.3l-3.1,0.8l-1.4-2.9 l-2.5,1.6l-3.5-5l0.5-2.8l3.4-2l0.8-3l-0.7-9.7l6.1,2.2c2.3-1.5,4.6-2.9,6.8-4.4l5.7,0.1l0.1-8.7l6.3,1.3l3-5.3l3.7-1l2.9,0.1 l0.4,2.9l2.2-1.7l5.3,2.5l0.1-2.8l4.2-3.9l3.9-0.6l1.9,2.6l-0.9,2.7l6.8,1.4l0.2,3l3,0.2l6.1,6.7l1.5,3L474.1,481.6z"
        ><title>
        34 H\xE9rault &#013;Occitanie
      </title></path>
      <path
        data-nom="Lot"
        data-numerodepartement="46"
        className={visited.includes('46') ? "departement visited" : "departement"}
        d="m385.4,413.1l3.3,5h-0.1l-1.7,1.5L381,421 l-7.6,5l0.8,9.1l-6.2,0.8l-7.5,5.5l-2.6-2.3l-8.7,2.5l-0.5-4l-2.4,1.5l-2.7-1l-4.5-4l2.1-2.3l-3.1,0.5l-2.7-9.1l3.4-3.1l4.7-6.5 l6-3.4l-0.6-3.6l4.5-3.2l1.4-5.3l0.7-5l8.1-0.8l6.7,6.1l5.3-2.7l6.7,0.2l1,5.4l3.8,6L385.4,413.1z"
        ><title>
        46 Lot &#013;Occitanie
      </title></path>
      <path
        data-nom="Loz\xE8re"
        data-numerodepartement="48"
        className={visited.includes('48') ? "departement visited" : "departement"}
        d="m463.4,418.7l4.2,8.3l-1.1,2.1l-3.6,2.5 l3.9,7.7l-1.2,2.9l1.4,3l-6.3,1.8l-8.7-2.2l-0.1,3.3l-3.9,0.5l-7.8-3.4l-9.4-4.5l-1.5-2.4l0.5-8.7l-2.9-8.8l-4.2-4.5v-0.1l6.9-15.9 l1.7,2.3l6.8-5.7l1-1l2.3,1.7l1.5,5.7l6.4,1.2l0.1-2.8l2.9,0.2l9,7.7L463.4,418.7z"
        ><title>
        48 Loz\xE8re &#013;Occitanie
      </title></path>
      <path
        data-nom="Hautes-Pyr\xE9n\xE9es"
        data-numerodepartement="65"
        className={visited.includes('65') ? "departement visited" : "departement"}
        d="m314.7,524.1l-5.5,3.2l0.6,7l-0.7,0.2l-2.3-1.6 l-2.4,1.8l-2.5-0.5l-1.9-1.7l-3.9-0.3l-6.9,2.1l-2.2-0.9l-2.1-1.7l-1.1-2.5l-7.8-5.5l-2.11,1.84l1.41-9.34l1.6-2.8l3.4-0.8l-0.4-2.9 l8-9.3l-0.8-3.1l2.7-1.4l-0.5-7.2h-2.9l1.5-2.8l-2.5-5.8l3.9-0.5l2,3.5l3.3,1.3l2.6,8.7l5.5-0.6l1.4,3l12.4,2.2l-7.1,11.2l4.6,4 l-0.6,3.5l3.1-0.3l0.8,2.7L314.7,524.1z"
        ><title>
        65 Hautes-Pyr\xE9n\xE9es &#013;Occitanie
      </title></path>
      <path
        data-nom="Pyr\xE9n\xE9es-Orientales"
        data-numerodepartement="66"
        className={visited.includes('66') ? "departement visited" : "departement"}
        d="m427.65,528.27l0.25,15.63l3.9,3.3l1.9,3.8 h-2.3l-8.1-2.7l-6.9,3.9l-3-0.2l-2.4,1.1l-0.6,2.4l-2.1,1.2l-2.4-0.7l-2.9,1l-4-3.1l-7-2.9l-2.5,1.4h-3l-1,2.1l-4.6,2l-1.9-1.7 l-1.7-4.8l-7.5-2l-2-2.1l2.02-2.31l7.98-2.39l1.3-2.6l7.4-0.2l8.6-3.9l-1.4-6l2.7-1.4l13.6,1l8.2-5.4L427.65,528.27z"
        ><title>
        66 Pyr\xE9n\xE9es-Orientales &#013;Occitanie
      </title></path>
      <path
        data-nom="Tarn"
        data-numerodepartement="81"
        className={visited.includes('81') ? "departement visited" : "departement"}
        d="m419.7,471.9l1.3,2.8c-2.2,1.5-4.5,2.9-6.8,4.4 l-6.1-2.2l0.7,9.7l-0.8,3l-3.4,2l-12-1.4l-2.8,0.5l-1.1,3.3l-6.3-0.9l-1.8-2.3l-1-2.8l-14.3-9.3l0.7-5.4l-2.3-2.1l-0.2-2.8l-2.6-1.2 l-1.4-6.3l0.5-2.8l4.8-3.2l1-2.7L364,450l3-1.1l2.7,1.1l9.2-3.2l6.1-2.8l10.3,5.8l4.8,4.3l4.3,11.5l4.2,5L419.7,471.9z"
        ><title>
        81 Tarn &#013;Occitanie
      </title></path>
      <path
        data-nom="Tarn-et-Garonne"
        data-numerodepartement="82"
        className={visited.includes('82') ? "departement visited" : "departement"}
        d="m360,458.1l-0.5,2.8l-11.7,4.3l2.2,2.3 l-5.8,2.5l-1.7-2.3l-9.9,0.9l-2-6.9l-5.1-4.1l3.3-4.6l-5.3-1.7l3.6-4.7l2.8,0.2l-1.3-2.7l4.4-5.5l-2.4-1.4v-2.9l7.5-2l3.1-0.5 l-2.1,2.3l4.5,4l2.7,1l2.4-1.5l0.5,4l8.7-2.5l2.6,2.3l7.5-5.5l6.2-0.8l-0.4,3l3.1,2.7l-2.3,2.4l4.3,3.6l-9.2,3.2l-2.7-1.1l-3,1.1 l1.8,2.2l-1,2.7L360,458.1z"
        ><title>
        82 Tarn-et-Garonne &#013;Occitanie
      </title></path>
    </g>
    <g
      className="region region-84"
      data-nom="Auvergne-Rh\xF4ne-Alpes"
      data-code_insee={84}
    >
      <title>Auvergne-Rhône-Alpes</title>
      <path
        data-nom="Ain"
        data-numerodepartement="01"
        className={visited.includes('01') ? "departement visited" : "departement"}
        d="m542,347l-5.7,6.7l-11.2-15.2l-2.8,0.7l-3,5.1 l-6-2l-6.4,0.5l-3.7-5.7l-2.8,0.5l-3.1-9.2l1.5-8l5.9-20.9l5.9,1.5l5.4-1.3l4.8,3.3l4.3,7.7h2.9l0.1,3l2.9-0.1l4-4.4l3.4,1.6 l0.4,2.8l3.8-0.2l5.5-3.2l5.3-7.2l4.5,2.7l-1.8,4.7l0.3,2.5l-4.4,1.5l-1.9,2l0.2,2.8l0.46,0.19l-4.36,4.71h-2.9l0.8,9.3L542,347z"
        ><title>
        01 Ain &#013;Auvergne-Rhône-Alpes
      </title></path>
      <path
        data-nom="Allier"
        data-numerodepartement="03"
        className={visited.includes('03') ? "departement visited" : "departement"}
        d="m443.1,292.3l5.9-6l6.7,13.5l7.9,2.9l1.6,2.4l-0.5,5.5l-3.7,4.6 l-3.9,1.3l-0.5,3l1.5,12.4l-5.5,4.8l-3.5-4.3l-6.4-0.4l-1.4-3.2l-13.1-0.5l-1.6-2.5l-3.3,0.5l-4.4-4.5l1.2-2.8l-2.3-1.7l-11.2,8 l-2.5-1.2l-3.6-8.4c-2.5-1.6-4.9-3.2-7.4-4.8L392,307v-0.1l3.5-5.9l8.7-1l1.7-2.4l-1.7-5.3l2.3-1.9l8.4-2.9l4.8-3.7h4h0.1l5.7,6.3 l6.4,0.2l2.8-1.7L443.1,292.3z"
        ><title>
        03 Allier &#013;Auvergne-Rhône-Alpes
      </title></path>
      <path
        data-nom="Ard\xE8che"
        data-numerodepartement="07"
        className={visited.includes('07') ? "departement visited" : "departement"}
        d="m496.5,434.2l0.1,3.7l-6-3.5h-2.8l-2.5,2.3 l-0.1-3.1l-7.1,4.3l-7.8-5l-2.7-5.9l-4.2-8.3l-2.1-9.1l6.7-6.4l5.9-1.9l3.4-5.9l3.4-0.4l-0.7-2.8l2.6-2.3l1.5-5.2l2.6,1.2v-3.1 l0.9-4.1l3.5-0.8l3.2-4.9l5-2.7l2,4.2l0.5,10.3l3.8,11.3l-1.5,6.2l-3.5,4.5l1,7.1l-3,5.9L496.5,434.2z"
        ><title>
        07 Ard\xE8che &#013;Auvergne-Rhône-Alpes
      </title></path>
      <path
        data-nom="Cantal"
        data-numerodepartement="15"
        className={visited.includes('15') ? "departement visited" : "departement"}
        d="m435.6,387.9l3.5,8l-1,1l-6.8,5.7l-1.7-2.3 l-6.9,15.9l-2.6-5.1l0.5-3l-2.4-1.6l-1.3-4.2l-5.2-4l-4.7,4.2l-3,9.1l-3.8,4.8l-6.4-1.5l-5.1,3.2l-3.3-5l1.7-5.8l-3.8-6l-1-5.4h0.1 l3.2-1.9l-1.5-3.4l3.1-1.1l0.3-3.5l2.3-1.9l-1.8-2.2l7.6-9.5l0.6-3.5l6.2,2l-0.7-6l7.5,3.5l1.5,2.5l6.7,0.3l6.5,5.4l3.7-4.1v3.9 l5.5,1.5l3.3,8.7l2.6,1.1L435.6,387.9z"
        ><title>
        15 Cantal &#013;Auvergne-Rhône-Alpes
      </title></path>
      <path
        data-nom="Dr\xF4me"
        data-numerodepartement="26"
        className={visited.includes('26') ? "departement visited" : "departement"}
        d="m535.1,404.4l-3,0.5l-0.8-17.5l-3,1.7l-8.2-1.9 l-2.7,1l1.1-6.3l-3.3-7.8l-4.9-2.7l-9,3.1l0.5,10.3l3.8,11.3l-1.5,6.2l-3.5,4.5l1,7.1l-3,5.9l-2.1,14.4l5.9,0.7l3.5,4.2l8.7-3.9 l2.4,1.4l2.5-2.2l0.5,5.8l9.3,0.9l0.1,2.8l5.2,2.3l4.3-4.8l2.3-0.1l1-0.2l0.2-4.7l-10-5.7l-1.5-2.6l3.2-5.1l4.2,1.4l2.5-2.5l-3-2.3 l2.5-6.7l5.8-0.3l0.3-3.4l-5.9-0.8L535.1,404.4z"
        ><title>
        26 Dr\xF4me &#013;Auvergne-Rhône-Alpes
      </title></path>
      <path
        data-nom="Is\xE8re"
        data-numerodepartement="38"
        className={visited.includes('38') ? "departement visited" : "departement"}
        d="m513.6,349.4l-0.3-7.1l6,2l3-5.1l2.8-0.7 l11.2,15.2l6.5,10.5l6.2,0.2l0.3-2.8l9.4,2.1l2.7,6.3l-2.3,5.5l1,5.4l5.2,1.5l-1.6,3.8l1.8,4.2l4.4,3.1l-0.4,5.8l-3.1-1.1l-12.6,3.9 l-0.9,2.8l-5.5,1.2l-1,3.1l-5.9-0.8l-5.4-4l-3,0.5l-0.8-17.5l-3,1.7l-8.2-1.9l-2.7,1l1.1-6.3l-3.3-7.8l-4.9-2.7l-9,3.1l-2-4.2v-4.4 l-0.2-1.1h0.1l4.4-3.9l-1.9-2.5l2.5-2.5l6.9-1.5L513.6,349.4z"
        ><title>
        38 Is\xE8re &#013;Auvergne-Rhône-Alpes
      </title></path>
      <path
        data-nom="Loire"
        data-numerodepartement="42"
        className={visited.includes('42') ? "departement visited" : "departement"}
        d="m499.3,365.9v4.4l-5,2.7l-3.2,4.9l-3.5,0.8 l-2.2-2.4l-2.6,1l-0.7-5.5l-6-2.2l-6.2,3l-2.8,0.4l-2.3-2l-2.8,0.8l3-7.1l-2.7-7.5l-4.6-3.8l-4.7-7.7l2.1-6.3l-2.5-2.7l5.5-4.8 l-1.5-12.4l0.5-3l3.9-1.3v3l5.2,3.3l8-1.5l2.1,2.1l5.7-3.8l0.01-0.09l2.09,2.99l-4.9,3.5l-1.6,8.6l5.2,6.7l-1.7,5.9l2.3,1.6 l-1.3,2.5l1.1,3l4.6,4.1l5.9,2.1l0.9,3l4.6,2.6h-0.1L499.3,365.9z"
        ><title>
        42 Loire &#013;Auvergne-Rhône-Alpes
      </title></path>
      <path
        data-nom="Haute-Loire"
        data-numerodepartement="43"
        className={visited.includes('43') ? "departement visited" : "departement"}
        d="m485.4,376.3l2.2,2.4l-0.9,4.1v3.1l-2.6-1.2 l-1.5,5.2l-2.6,2.3l0.7,2.8l-3.4,0.4l-3.4,5.9l-5.9,1.9l-6.7,6.4l-9-7.7l-2.9-0.2l-0.1,2.8l-6.4-1.2l-1.5-5.7l-2.3-1.7l-3.5-8 l3.4-0.2l-2.6-1.1l-3.3-8.7l-5.5-1.5v-3.9v-0.1l9.6-3.2l8.5,0.1l5.2,3.2l11.1-0.7l2.8-0.8l2.3,2l2.8-0.4l6.2-3l6,2.2l0.7,5.5 L485.4,376.3z"
        ><title>
        43 Haute-Loire &#013;Auvergne-Rhône-Alpes
      </title></path>
      <path
        data-nom="Puy-de-D\xF4me"
        data-numerodepartement="63"
        className={visited.includes('63') ? "departement visited" : "departement"}
        d="m449.1,332.4l3.5,4.3l2.5,2.7l-2.1,6.3l4.7,7.7 l4.6,3.8l2.7,7.5l-3,7.1l-11.1,0.7l-5.2-3.2l-8.5-0.1l-9.6,3.2v0.1l-3.7,4.1l-6.5-5.4l-6.7-0.3l-1.5-2.5l-7.5-3.5l-1.2-7.9l1.7-2.4 L401,349l-4.4-5.5l9.3-8.6l-2.3-6.7l0.5-4.1l2.5,1.2l11.2-8l2.3,1.7l-1.2,2.8l4.4,4.5l3.3-0.5l1.6,2.5l13.1,0.5l1.4,3.2L449.1,332.4z"
        ><title>
        63 Puy-de-D\xF4me &#013;Auvergne-Rhône-Alpes
      </title></path>
      <path
        data-nom="Rh\xF4ne"
        data-numerodepartement="69"
        className={visited.includes('69') ? "departement visited" : "departement"}
        d="m493.1,312.7l5.7,7.7l-1.5,8l3.1,9.2l2.8-0.5 l3.7,5.7l6.4-0.5l0.3,7.1l-2.5,5l-6.9,1.5l-2.5,2.5l1.9,2.5l-4.4,3.9l-4.6-2.6l-0.9-3l-5.9-2.1l-4.6-4.1l-1.1-3l1.3-2.5l-2.3-1.6 l1.7-5.9l-5.2-6.7l1.6-8.6l4.9-3.5l-2.09-2.99l0.29-2.91l2.3-1.9l2.2,1.7l2.2-1.6l2.5,1.5L493.1,312.7z"
        ><title>
        69 Rh\xF4ne &#013;Auvergne-Rhône-Alpes
      </title></path>
      <path
        data-nom="Savoie"
        data-numerodepartement="73"
        className={visited.includes('73') ? "departement visited" : "departement"}
        d="m603.7,362l-1,10.3l-3.1,1.4l-2.2,0.7l-4.5,3.4 l-1.5,2.4l-2.5-1.4l-5.1,1.3l-2,1.8v0.1l-6.8,1.9l-2,2l-7.7-3.5l-5.2-1.5l-1-5.4l2.3-5.5l-2.7-6.3l-9.4-2.1l-0.3,2.8l-6.2-0.2 l-6.5-10.5l5.7-6.7l2.3-13.6l2.7,6.7l2.7,0.9l1.3,2.5l3,1.7l2.6-1.6l3.2,0.8l4.6,3.6l9.4-13.9l2.4,1.6l-0.6,3l2.3,1.8l6.2,2.3 l2.2-1.5l0.62-0.76l1.88,4.66l2.7,1.1l1.5,1.9l2.8,0.4l-0.7,3l1.3,5.2l5.1,4L603.7,362z"
        ><title>
        73 Savoie &#013;Auvergne-Rhône-Alpes
      </title></path>
      <path
        data-nom="Haute-Savoie"
        data-numerodepartement="74"
        className={visited.includes('74') ? "departement visited" : "departement"}
        d="m547,340.1l-2.7-6.7l-0.8-9.3h2.9l4.36-4.71 l2.24,0.91l2.3-1l2.3,0.1l3.4-3.5l2.1-1l1-2.3l-2.8-1.3l1.8-5.1l2.4-0.8l2.3,1l3.6-2.9l9.5-1.3l3.2,0.6l-0.5,2.7l4.2,4.1l-2.1,6.4 l-0.6,1.5l4.6,1.7l-0.1,4.8l2-1.4l4.6,6.6l-1.3,5l-2.5,1.7l-4.9,0.9l-0.6,3.7l0.02,0.04l-0.62,0.76l-2.2,1.5l-6.2-2.3l-2.3-1.8 l0.6-3l-2.4-1.6l-9.4,13.9l-4.6-3.6l-3.2-0.8l-2.6,1.6l-3-1.7l-1.3-2.5L547,340.1z"
        ><title>
        74 Haute-Savoie &#013;Auvergne-Rhône-Alpes
      </title></path>
    </g>
    <g
      className="region region-93"
      data-nom="Provence-Alpes-Côte d&#39;Azur"
      data-code_insee={93}
    >
      <title>Provence-Alpes-Côte d&#39;Azur</title>
      <path
        data-nom="Alpes-de-Haute-Provence"
        data-numerodepartement="04"
        className={visited.includes('04') ? "departement visited" : "departement"}
        d="m596.5,409.9l0.57-0.5l-0.37,4.5l-2.2,1.5 l-0.6,2.9l3.5,4l-1.8,4.8l0.19,0.21L589,435.1l-2,5.3l4.3,8.5l7,7.7l-5.2-0.6l-5.2,3.8l1.2,2.6l-3,1.4l-9.8,0.4l-1.2,3.5l-5.9-3.6 l-10.1,8.5l-4-4.8l-2.7,1.8l-5.3-0.2l-6.1-6l-3.4-1.1l1.7-2.5l-3.7-5.2l1.2-3l-2.2-5.4l4.3-4.8l2.3-0.1l1-0.2l5.9-1.4l3.8,1 l-3.4-4.9l3.9,1.1l1.4-8.6l5.3-4l3.3-0.7l3.5,4.5l0.7-3.8l3.8-4.2l11.1,3.3l9-10.2L596.5,409.9z"
        ><title>
        04 Alpes-de-Haute-Provence &#013;Provence-Alpes-Côte d&#39;Azur
      </title></path>
      <path
        data-nom="Hautes-Alpes"
        data-numerodepartement="05"
        className={visited.includes('05') ? "departement visited" : "departement"}
        d="m597.1,409l-0.03,0.4l-0.57,0.5l-6,3.3l-9,10.2 l-11.1-3.3l-3.8,4.2l-0.7,3.8l-3.5-4.5l-3.3,0.7l-5.3,4l-1.4,8.6l-3.9-1.1l3.4,4.9l-3.8-1l-5.9,1.4l0.2-4.7l-10-5.7l-1.5-2.6 l3.2-5.1l4.2,1.4l2.5-2.5l-3-2.3l2.5-6.7l5.8-0.3l0.3-3.4l1-3.1l5.5-1.2l0.9-2.8l12.6-3.9l3.1,1.1l0.4-5.8l-4.4-3.1l-1.8-4.2 l1.6-3.8l7.7,3.5l2-2l6.8-1.9l1.8,4.5l2.4,0.6l1.1,2l0.4,3l1.2,2.2l3,2.3l5.7,0.5l2.2,1.3l-0.7,2.1l3.2,4.7l-3,1.5L597.1,409z"
        ><title>
        05 Hautes-Alpes &#013;Provence-Alpes-Côte d&#39;Azur
      </title></path>
      <path
        data-nom="Alpes-Maritimes"
        data-numerodepartement="06"
        className={visited.includes('06') ? "departement visited" : "departement"}
        d="m605.3,477.1l-3.2-0.1l-1.3,1.8l-0.1,2.2 l-0.42,0.77l-2.18-3.97l0.8-2.9l-5.6-2.6l-1.7-5.6l-5.5-2.9l3-1.4l-1.2-2.6l5.2-3.8l5.2,0.6l-7-7.7l-4.3-8.5l2-5.3l6.79-7.79 l6.91,7.79l6.9,1.6l4.2,2.8l2.5-0.4l1.8,1.4l10.3-2.4l2.7-1.8l-0.3,2.6l1.5,2.2l0.3,3.2l-1.6,1.9l-0.2,2.3l-2.7,1.6l-3.3,5l-0.5,1.6 l1.1,2.7l-1.1,2.7l-3.5,2.9l-2.3,0.5l-0.9,2.4l-3-0.9l-1.5,2.1l-2.3,0.5L609,472l0.1,2.8l-2.4,0.6L605.3,477.1z"
        ><title>
        06 Alpes-Maritimes &#013;Provence-Alpes-Côte d&#39;Azur
      </title></path>
      <path
        data-nom="Bouches-du-Rh\xF4ne"
        data-numerodepartement="13"
        className={visited.includes('13') ? "departement visited" : "departement"}
        d="m545,500.2l2.5-2l-2.2-6.3l1.1-2.6l2.7-0.5 l-5.5-9.1l2-5.3l3.3-0.8l-1.9-3.8l-0.1-0.1l-6.6,4.3l-3.2,0.2l-12-4.8l-3.5,0.7l-4.5-2.3l-5.5-5.7l-10.4-2.9l-3.9,4.1l-1.9,10.6 l-3.3-0.9l-4.2,4.8l1,2.7l-5.8,1.8l-3.1,4.9l0.2,0.1h13.2l2.2,0.9l1,2.2l-1.6,1.5l2.2,1.4l7.4,0.1l3.2,1.3l1.8-1.7l-1.5-2.8l0.4-2.4 l4.9,1l3,5.3l10-0.8l2.6-1.1l1.8,2l-0.2,2.5l1,2l-1.2,2.2h9.2l1.3,2l2.2-0.8l1.7,0.2L545,500.2z"
        ><title>
        13 Bouches-du-Rh\xF4ne &#013;Provence-Alpes-Côte d&#39;Azur
      </title></path>
      <path
        data-nom="Var"
        data-numerodepartement="83"
        className={visited.includes('83') ? "departement visited" : "departement"}
        d="m600.28,481.77l-1.38,2.53l-6.8,1.7l-0.7,2.5 l-5.5,5.7l5,0.7l-2,4.8l-4,0.2l-4.8,2.5l-3.5,1.1l0.1,2.7l-4.9-1.5l-2.7,0.5l-1.6,1.6l-0.4,2.3l-2.2,1.6l1.4-1.8l-2.4-1.7l-2.2,0.7 l-1.6-1.6l-3.1,0.1l0.9,2.2l-2.3-0.4l-1.5,1.7l-3-1.1l0.6-2.3l-6.4-4.1l-0.5-0.1l0.2-2.1l2.5-2l-2.2-6.3l1.1-2.6l2.7-0.5l-5.5-9.1 l2-5.3l3.3-0.8l-1.9-3.8l0.1-0.4l5.3,0.2l2.7-1.8l4,4.8l10.1-8.5l5.9,3.6l1.2-3.5l9.8-0.4l5.5,2.9l1.7,5.6l5.6,2.6l-0.8,2.9 L600.28,481.77z"
        ><title>
        83 Var &#013;Provence-Alpes-Côte d&#39;Azur
      </title></path>
      <path
        data-nom="Vaucluse"
        data-numerodepartement="84"
        className={visited.includes('84') ? "departement visited" : "departement"}
        d="m541,463.4l6.1,6l-0.1,0.4l-0.1-0.1l-6.6,4.3 l-3.2,0.2l-12-4.8l-3.5,0.7l-4.5-2.3l-5.5-5.7l-10.4-2.9l4.5-5l-6.3-6.4l-0.2-5.5l-2.6-4.4l-0.1-3.7l5.9,0.7l3.5,4.2l8.7-3.9 l2.4,1.4l2.5-2.2l0.5,5.8l9.3,0.9l0.1,2.8l5.2,2.3l2.2,5.4l-1.2,3l3.7,5.2l-1.7,2.5L541,463.4z"
        ><title>
        84 Vaucluse &#013;Provence-Alpes-Côte d&#39;Azur
      </title></path>
    </g>
    <g className="region region-94" data-nom="Corse" data-code_insee={94}>
      <title>Corse</title>
      <path
        data-nom="Corse-du-Sud"
        data-numerodepartement="2A"
        className={visited.includes('2A') ? "departement visited" : "departement"}
        d="m640.5,554.2l3.2-1.7l0.7,8.4l-0.15,0.54 l-1.85,4.86l-2.7,1.9l3.3,0.4l-5.8,14.7l-3.1-1.2l-1.2-2.8l-11.2-3.4l-4.8-4.4l0.2-3l4.9-3.3l-9.5-1.9l2.7-7l-0.9-5.8l-7.3,2.6 l3-8.4l2.6-1.6l-7.9-4.4l-1.1-5.5l5.3-3.8l-3.8-4.2l-2.6,1l0.5-2.7l13.6,2.1l1.2,3.5l6,3.4l6,5.9l0.5,3.2l2.7,1.1l3.7,11 L640.5,554.2z"
        ><title>
        2A Corse-du-Sud &#013;Corse
      </title></path>
      <path
        data-nom="Haute-Corse"
        data-numerodepartement="2B"
        className={visited.includes('2B') ? "departement visited" : "departement"}
        d="m643.7,551.5v1l-3.2,1.7l-3.8-0.5l-3.7-11 l-2.7-1.1l-0.5-3.2l-6-5.9l-6-3.4l-1.2-3.5l-13.6-2.1v-0.2l3.9-5l-0.3-3.4l2.2-2.8l2.8-0.3l0.9-2.9l10.7-4.2l3.5-4.9l8.6,1.3 l-0.5-17.4l2.4-2l2.9,1.1l0.18,0.89l1.52,8.21l-0.5,10.6l4,5.6l3.8,26l-5.4,11.9V551.5L643.7,551.5z"
        ><title>
        2B Haute-Corse &#013;Corse
      </title></path>
    </g>
  </svg>
)};
export default CarteDeFranceSvg;
