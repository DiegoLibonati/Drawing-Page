import { ButtonProps } from "@src/entities/props";

export const Button = ({
  id,
  ariaLabel,
  type,
  className,
  children,
  onClick,
}: ButtonProps): HTMLButtonElement => {
  const button = document.createElement("button");
  button.id = id;
  button.setAttribute("aria-label", ariaLabel);
  button.className = `${className ?? ""}`;
  button.innerHTML = children ?? "";
  button.type = type ?? "button";

  if (button.type === "button" && onClick)
    button.addEventListener("click", onClick);

  return button;
};
