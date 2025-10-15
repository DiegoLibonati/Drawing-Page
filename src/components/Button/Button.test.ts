import { screen } from "@testing-library/dom";
import user from "@testing-library/user-event";

import { ButtonProps } from "@src/entities/props";

import { Button } from "@src/components/Button/Button";

type RenderComponent = {
  props: ButtonProps;
  container: HTMLButtonElement;
};

const renderComponent = (
  id: string,
  ariaLabel: string,
  type?: "button" | "submit" | "reset",
  children?: string,
  className?: string,
  onClick?: jest.Mock
): RenderComponent => {
  const props: ButtonProps = {
    id,
    ariaLabel,
    type,
    children,
    className,
    onClick: onClick ?? jest.fn(),
  };

  const container = Button({
    id: props.id,
    ariaLabel: props.ariaLabel,
    type: props.type,
    children: props.children,
    className: props.className,
    onClick: props.onClick,
  });

  document.body.appendChild(container);

  return { props: props, container: container };
};

describe("Button.ts", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("General Tests.", () => {
    const baseProps = {
      id: "test-btn",
      ariaLabel: "Test Button",
      children: "Click me",
      className: "custom-class",
    };

    test("It should render a button element with correct attributes", () => {
      const { container } = renderComponent(
        baseProps.id,
        baseProps.ariaLabel,
        undefined,
        baseProps.children,
        baseProps.className
      );

      expect(container).toBeInstanceOf(HTMLButtonElement);
      expect(container.id).toBe(baseProps.id);
      expect(container.getAttribute("aria-label")).toBe(baseProps.ariaLabel);
      expect(container.innerHTML).toBe(baseProps.children);
      expect(container.type).toBe("button");
      expect(container.className).toBe(baseProps.className);
    });

    test("It should be accessible via getByRole", () => {
      renderComponent(
        baseProps.id,
        baseProps.ariaLabel,
        undefined,
        baseProps.children
      );

      const button = screen.getByRole("button", { name: baseProps.ariaLabel });
      expect(button).toBeInTheDocument();
      expect(button.innerHTML).toBe(baseProps.children);
    });

    test("It should apply default type 'button' when not provided", () => {
      const { container } = renderComponent(
        baseProps.id,
        baseProps.ariaLabel,
        undefined,
        baseProps.children
      );

      expect(container.type).toBe("button");
    });

    test("It should support submit and reset types", () => {
      const { container: submitButton } = renderComponent(
        "submit-btn",
        "Submit Button",
        "submit",
        "Submit"
      );
      expect(submitButton.type).toBe("submit");

      const { container: resetButton } = renderComponent(
        "reset-btn",
        "Reset Button",
        "reset",
        "Reset"
      );
      expect(resetButton.type).toBe("reset");
    });
  });

  describe("Click Tests.", () => {
    test("It should call onClick handler when clicked (type='button')", async () => {
      const mockOnClick = jest.fn();
      renderComponent(
        "btn",
        "Button",
        "button",
        "Click",
        undefined,
        mockOnClick
      );

      const button = screen.getByRole("button", { name: /button/i });
      await user.click(button);

      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    test("It should not call onClick when type='submit' or 'reset'", async () => {
      const mockOnClick = jest.fn();

      renderComponent(
        "submit",
        "Submit",
        "submit",
        "Submit",
        undefined,
        mockOnClick
      );
      renderComponent(
        "reset",
        "Reset",
        "reset",
        "Reset",
        undefined,
        mockOnClick
      );

      const submitBtn = screen.getByRole("button", { name: /submit/i });
      const resetBtn = screen.getByRole("button", { name: /reset/i });

      await user.click(submitBtn);
      await user.click(resetBtn);

      expect(mockOnClick).not.toHaveBeenCalled();
    });
  });

  describe("Content rendering.", () => {
    test("It should render plain text correctly", () => {
      const { container } = renderComponent(
        "txt-btn",
        "Text Button",
        undefined,
        "OK"
      );
      expect(container.innerHTML).toBe("OK");
    });

    test("It should render HTML content properly", () => {
      const htmlContent = '<span class="icon">🔥</span>';
      const { container } = renderComponent(
        "html-btn",
        "HTML Button",
        undefined,
        htmlContent
      );

      expect(container.innerHTML).toBe(htmlContent);
      expect(container.querySelector(".icon")).toBeInTheDocument();
    });

    test("It should render empty content when children is not provided", () => {
      const { container } = renderComponent("empty-btn", "Empty Button");
      expect(container.innerHTML).toBe("");
    });
  });
});
