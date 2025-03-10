export const DefaultImage = `
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="200"
  height="200"
  viewBox="0 0 200 200"
  fill="none"
>
  <rect width="200" height="200" fill="#F5F5F5" />
  <g transform="translate(100 90)">
    <circle cx="0" cy="0" r="30" stroke="#E0E0E0" stroke-width="5" fill="none" />
    <path
      d="M0 -30 A30 30 0 0 1 30 0"
      stroke="#4A2C7B"
      stroke-width="5"
      fill="none"
      stroke-linecap="round"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0"
        to="360"
        dur="1s"
        repeatCount="indefinite"
        calcMode="ease-in-out"
      />
    </path>
  </g>
</svg>
`

export const getDefaultImageUrl = () => {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(DefaultImage)}`
}
