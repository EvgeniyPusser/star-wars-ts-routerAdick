import Home from "./Home.tsx";
import AboutMe from "./AboutMe.tsx";
import Contact from "./Contact.tsx";
import StarWars from "./StarWars.tsx";
import {navItems} from "../utils/constants.ts";
// import {SWContext} from "../utils/context.ts";
// import {useContext} from "react";
import {Route, Routes} from "react-router";
import ErrorPage from "./ErrorPage.tsx";

const Main = () => {
    return (
        <Routes>
            {[`/`, `/${navItems[0]}`].map(path => <Route key={path} path={path} element={<Home/>}/>)}
            <Route path={`/${navItems[1]}/:heroId?`} element={<AboutMe/>}/>
            <Route path={`/${navItems[2]}`} element={<StarWars/>}/>
            <Route path={`/${navItems[3]}`} element={<Contact/>}/>
            <Route path={'*'} element={<ErrorPage/>}/>
        </Routes>
    )


}

export default Main;
