interface FullScreenIconProps { color?: string }

const FullScreenIcon = ({ color = 'currentColor' }: FullScreenIconProps) => (
  <svg viewBox="0 0 14 14" aria-hidden="true" width="16" height="16" fill={color}>
    <path d="M2 9H0v5h5v-2H2V9ZM0 5h2V2h3V0H0v5ZM12 12H9v2h5V9h-2v3ZM9 0v2h3v3h2V0H9Z" />
  </svg>
)

export default FullScreenIcon
