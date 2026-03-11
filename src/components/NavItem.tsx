import Button from "./ui/Button.tsx";
import {NavLink} from "react-router";

const NavItem = ({itemTitle}: { itemTitle: string }) => {
    // const {changePage} = useContext(SWContext);
    return (
        <NavLink to={`/${itemTitle.toLowerCase()}`}>
            <Button>{itemTitle}</Button>
        </NavLink>
    )
}

export default NavItem;