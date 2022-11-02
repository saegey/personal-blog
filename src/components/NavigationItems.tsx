import { Link as GatsbyLink } from "gatsby"
import { Link } from "theme-ui"
import { MyLinkProps} from "../common/types"

type MenuLinkProps = {
  title: string,
  location: any,
  setMenuOpen: (arg: boolean) => void
}

const MyLink = Link as any as (props: MyLinkProps) => JSX.Element

const MenuLink = ({ title, location, setMenuOpen }: MenuLinkProps) => {
  return (
    <li>
      <MyLink
        to={location}
        variant="menu"
        sx={{ textDecoration: "none" }}
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
        display: "flex",
        alignItems: "center",
      }}
    >
      <ul
        sx={{
          listStyleType: "none",
          paddingLeft: "45px",
          transition: "all .2s ease-in-out",
          top: 0,
          left: 0,
          ".active": {
            color: "headerForeground",
          },
        }}
      >
        <MenuLink location="/" title="Home" setMenuOpen={setMenuOpen} />
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
