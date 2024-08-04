import { ButtonHTMLAttributes } from "react";


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  color?: string;
}

export default function Button({ text, color, ...props }: ButtonProps) {
  return (
    <button className="border border-as-black text-as-black min-w-60 hover:bg-as-blue hover:border-as-blue transition-all px-5 py-2" {...props}>{text}</button>
  )
}
