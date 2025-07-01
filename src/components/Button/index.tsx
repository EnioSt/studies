import React from "react";
import style from "./Button.module.scss";

interface Props {
  type?: "button" | "submit" | "reset" | undefined,
  onClick?: () => void,
  children?: React.ReactNode,
  disabled?: boolean
}

const Button = ({ onClick, type, children, disabled }: Props) => {
  return (
      <button
        onClick={onClick}
        type={type}
        className={style.botao}
        disabled={disabled}
      >
        {children}
      </button>
  )
}

export default Button;
