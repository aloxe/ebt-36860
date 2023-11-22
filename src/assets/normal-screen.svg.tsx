interface ScreenProps  {
  height: string
  width: string
  fill: string
  isFull?:boolean
}

const NormalScreen = ({height, width, fill}: ScreenProps) => (
  <svg
    fill={fill}
    height={height}
    width={width}
    id="Capa_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 512 512"
    xmlSpace="preserve"
  >
    <g>
      <path d="M192,64c-17.672,0-32,14.328-32,32v64H32c-17.672,0-32,14.328-32,32s14.328,32,32,32h160c17.672,0,32-14.328,32-32V96 C224,78.328,209.672,64,192,64z" />
      <path d="M320,224h160c17.672,0,32-14.328,32-32s-14.328-32-32-32H352V96c0-17.672-14.328-32-32-32s-32,14.328-32,32v96 C288,209.672,302.328,224,320,224z" />
      <path d="M480,288H320c-17.672,0-32,14.328-32,32v96c0,17.672,14.328,32,32,32s32-14.328,32-32v-64h128c17.672,0,32-14.328,32-32 S497.672,288,480,288z" />
      <path d="M192,288H32c-17.672,0-32,14.328-32,32s14.328,32,32,32h128v64c0,17.672,14.328,32,32,32s32-14.328,32-32v-96 C224,302.328,209.672,288,192,288z" />
    </g>
  </svg>
);
export default NormalScreen;