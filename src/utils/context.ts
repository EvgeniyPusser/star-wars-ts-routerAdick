import {createContext} from "react";
import {navItems} from "./constants.ts";

export const SWContext = createContext({
    page: navItems[0],
    changePage: (page: string) => console.log(page)
});