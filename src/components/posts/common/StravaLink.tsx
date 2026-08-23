import StravaIcon from '../../icons/StravaIcon'

interface StravaLinkProps {
  stravaUrl: string
}

const StravaLink = ({ stravaUrl }: StravaLinkProps) => (
  <div className="my-8 border-y border-line py-5 text-center">
    <a
      href={stravaUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="View activity on Strava (opens in a new tab)"
      className="inline-flex items-center gap-2 font-condensed text-sm font-medium uppercase tracking-label underline decoration-line underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
    >
      <StravaIcon color="currentColor" />
      View activity on Strava
    </a>
  </div>
)

export default StravaLink
