import type { ButtonComponent } from "@/types/components";
import type { ButtonProps } from "@/types/props";

export const Button = ({
  id,
  ariaLabel,
  type,
  className,
  children,
  onClick,
}: ButtonProps): ButtonComponent => {
  const button = document.createElement("button") as ButtonComponent;
  button.id = id;
  button.setAttribute("aria-label", ariaLabel);
  button.className = className ?? "";
  button.innerHTML = children ?? "";
  button.type = type ?? "button";

  if (button.type === "button" && onClick) {
    button.addEventListener("click", onClick);

    button.cleanup = (): void => {
      button.removeEventListener("click", onClick);
    };
  }

  return button;
};
