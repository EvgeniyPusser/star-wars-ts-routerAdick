// import type {ReactNode} from "react";

import React from "react";

type TextProps = {
    children: React.ReactNode;
}


const Text = ({children}: TextProps) => {
    return (
        <div>
            {
                children
            }
        </div>
    )
}

export default Text;