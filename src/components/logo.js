import * as React from "react"

const Logo = ({ border, fillColor, width }) => {
  // const stroke = border ? 'stroke="black"' : ""
  const w = width ? width : "175"
  // const h = height ? height : "100"
  const fill = fillColor ? fillColor : "#444"
  return (
    <svg
      width={w}
      // height={h}
      viewBox="0 0 263 66"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M29.5 31.5V31H29H0.5V0.5H37.5V17.5H8.5H8V18V23V23.5H8.5H37.5V65.5H0.5V38.5H29H29.5V38V31.5Z"
        fill={fill}
        stroke="black"
        stroke-opacity={border ? "1.0" : "0"}
      />
      <path
        d="M44 1V65H52.5V53H64V65H82V1H44Z M52.5 44.5V10H64V44.5H52.5Z"
        fill={fill}
        stroke="black"
        stroke-opacity={border ? "1.0" : "0"}
        fill-rule="nonzero"
      />
      <path
        d="M125 18V1H87.5V26L111 33L87.5 40V65H125V47.5H95L125 37.5V28.5L95 18H125Z"
        fill={fill}
        stroke="black"
        stroke-opacity={border ? "1.0" : "0"}
      />
      <path
        d="M212.5 18V1H175V26L198.5 33L175 40V65H212.5V47.5H182.5L212.5 37.5V28.5L182.5 18H212.5Z"
        fill={fill}
        stroke="black"
        stroke-opacity={border ? "1.0" : "0"}
      />
      <path
        d="M169 1V21H152V9.5H140V56.5H152V50H146V42H169V65H131V1H169Z"
        fill={fill}
        stroke="black"
        stroke-opacity={border ? "1.0" : "0"}
      />
      <path
        d="M236 1H219V30H235L225 65H256L246.5 30H262V1H245V21H236V1Z"
        fill={fill}
        stroke="black"
        stroke-opacity={border ? "1.0" : "0"}
      />
    </svg>
  )
}
export default Logo
