import FullScreenIcon from '../../icons/FullScreenIcon'

interface MaxProps {
  onClick: Function
}

const Maximize = ({ onClick }: MaxProps) => {
  return (
    <button
      aria-label="Maximize"
      title="Maximize"
      data-testid={'matches-burned-fullscreen'}
      className="inline-flex h-8 w-8 items-center justify-center border border-line text-ink transition-colors hover:border-ink"
      onClick={() => onClick(true)}
    >
      <FullScreenIcon />
    </button>
  )
}

export default Maximize
