import Navigation from "./Navigation.tsx";
import {characters, navItems} from "../utils/constants.ts";
import {useMatch} from "react-router";

const Header = () => {
    const aboutMatch = useMatch(`/${navItems[1]}/:heroId`);
    const heroId = aboutMatch?.params.heroId;
    const title = heroId && heroId in characters
        ? characters[heroId as keyof typeof characters].name
        : characters.luke.name;

    return (
        <header className="rounded-t-3xl bg-gray">
            <Navigation/>
            <h1 className="text-center text-4xl py-6">{title}</h1>
        </header>
    )
}

export default Header;
