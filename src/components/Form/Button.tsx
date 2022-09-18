import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { }

export function Button(props: ButtonProps) {
    return (
        <button
            {...props}
            className='w-10 h-10 rounded bg-zinc-900'
        />
    )
}