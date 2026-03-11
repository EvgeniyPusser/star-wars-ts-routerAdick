import NavItem from "./NavItem.tsx";
import {navItems} from "../utils/constants.ts";

const Navigation = () => {
    return (
        <nav className="fixed top-2 left-12 flex gap-4">
            {navItems.map(item => <NavItem itemTitle={item} key={item}/>)}
        </nav>
    )
}

export default Navigation;