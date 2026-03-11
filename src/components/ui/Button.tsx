import type {ReactNode} from "react";

type ButtonProps = {
    children: ReactNode;
}

const Button = ({children} : ButtonProps) => {
    return (
        <div className="bg-danger rounded-md px-3 border cursor-pointer hover:bg-red-500 hover:text-white text-center">
            {children}
        </div>
    )
}

export default Button;
