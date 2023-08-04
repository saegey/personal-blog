import { Link as GatsbyLink } from 'gatsby'
import { Link } from 'theme-ui'
import { MyLinkProps } from '../common/types'

type MenuLinkProps = {
  title: string
  location: any
  setMenuOpen: (arg: boolean) => void
}

const MyLink = Link as any as (props: MyLinkProps) => JSX.Element

const MenuLink = ({
  title,
  location,
  setMenuOpen,
}: MenuLinkProps) => {
  return (
    <MyLink
      to={location}
      variant="menu"
      sx={{ textDecoration: 'none' }}
      activeClassName="active"
      as={GatsbyLink}
      onClick={() => setMenuOpen(false)}
    >
      <li
        sx={{
          ':hover': {
            background: 'mutedAccent',
            borderRadius: '5px',
          },
          paddingY: '5px',
          paddingX: '10px',
        }}
      >
        {title}
      </li>
    </MyLink>
  )
}

type NavItemsProps = {
  setMenuOpen: (arg: boolean) => void
}

const NavigationItems = ({ setMenuOpen }: NavItemsProps) => {
  return (
    <div
      sx={{
        // display: 'flex',
        alignItems: 'center',
        // width: '100%',
      }}
    >
      <ul
        sx={{
          listStyleType: 'none',
          paddingLeft: '20px',
          paddingRight: '20px',
          transition: 'all .2s ease-in-out',
          top: 0,
          left: 0,
          '.active': {
            color: 'headerForeground',
          },
        }}
      >
        <MenuLink
          location="/"
          title="Home"
          setMenuOpen={setMenuOpen}
        />
        <MenuLink location="/about" title="About" setMenuOpen={setMenuOpen} />
        <MenuLink
          location="/race-journal"
          title="Bike Races"
          setMenuOpen={setMenuOpen}
        />
      </ul>
    </div>
  )
}

export default NavigationItems
