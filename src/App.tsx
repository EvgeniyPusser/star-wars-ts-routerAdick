import Header from "./components/Header.tsx";
import Main from "./components/Main.tsx";
import Footer from "./components/Footer.tsx";
import {useState} from "react";
import {SWContext} from "./utils/context.ts";

function App() {
    const [page, setPage] = useState("Home");

    return (
        <div className={'mx-2'}>
            <SWContext value={{page, changePage: setPage}}>
                <Header/>
                <Main/>
                <Footer/>
            </SWContext>
        </div>
    )
}

export default App
