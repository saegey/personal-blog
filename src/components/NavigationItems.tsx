import { Link as GatsbyLink } from 'gatsby'
import { Link } from 'theme-ui'
import { MyLinkProps } from '../common/types'

type MenuLinkProps = {
  title: string
  location: any
  borderTop: boolean
  setMenuOpen: (arg: boolean) => void
}

const MyLink = Link as any as (props: MyLinkProps) => JSX.Element

const MenuLink = ({ title, location, setMenuOpen, borderTop=false }: MenuLinkProps) => {
  return (
    <li
      sx={{
        borderBottomColor: 'mutedAccent',
        borderBottomStyle: 'solid',
        borderBottomWidth: '1px',
        borderTopColor: 'mutedAccent',
        borderTopStyle: 'solid',
        borderTopWidth: borderTop ? '1px' : '0px'
        ,
        width: '100%',
        paddingY: '10px'
      }}
    >
      <MyLink
        to={location}
        variant="menu"
        sx={{ textDecoration: 'none' }}
        activeClassName="active"
        as={GatsbyLink}
        onClick={() => setMenuOpen(false)}
      >
        {title}
      </MyLink>
    </li>
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
        width: '100%',
      }}
    >
      <ul
        sx={{
          listStyleType: 'none',
          paddingLeft: '45px',
          paddingRight: '45px',
          transition: 'all .2s ease-in-out',
          top: 0,
          left: 0,
          '.active': {
            color: 'headerForeground',
          },
        }}
      >
        <MenuLink location="/" title="Home" setMenuOpen={setMenuOpen} borderTop={true} />
        <MenuLink location="/about" title="About" setMenuOpen={setMenuOpen} />
        <MenuLink
          location="/race-journal"
          title="Race Journal"
          setMenuOpen={setMenuOpen}
        />
        <MenuLink
          location="/projects"
          title="Projects"
          setMenuOpen={setMenuOpen}
        />
      </ul>
    </div>
  )
}

export default NavigationItems
