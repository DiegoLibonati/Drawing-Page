import { screen } from "@testing-library/dom";
import user from "@testing-library/user-event";

import { OFFICIAL_BODY } from "@tests/jest.constants";

describe("index.ts", () => {
  describe("General Tests.", () => {
    beforeEach(() => {
      document.body.innerHTML = OFFICIAL_BODY;

      require("./index.ts");
      document.dispatchEvent(new Event("DOMContentLoaded"));
    });

    afterEach(() => {
      document.body.innerHTML = "";
    });

    test("It must render the board in order to paint.", () => {
      const canvas = document.getElementById("canvas");

      expect(canvas).toBeInTheDocument();
    });

    test("It must render the toolboard to change the settings for painting.", () => {
      const btnIncrease = screen.getByRole("button", {
        name: /increase size/i,
      });
      const btnDecrease = screen.getByRole("button", {
        name: /decrease size/i,
      });
      const size = document.getElementById("size");
      const inputColor = document.getElementById("color");
      const btnClear = screen.getByRole("button", { name: /clear board/i });

      expect(btnIncrease).toBeInTheDocument();
      expect(btnDecrease).toBeInTheDocument();
      expect(size).toBeInTheDocument();
      expect(inputColor).toBeInTheDocument();
      expect(btnClear).toBeInTheDocument();
    });

    test("It should increase the canvas size when you touch the 'Increase' button.", async () => {
      const size = document.getElementById("size");
      const btnIncrease = screen.getByRole("button", {
        name: /increase size/i,
      });

      expect(size).toHaveTextContent("30");
      expect(btnIncrease).toBeInTheDocument();

      await user.click(btnIncrease);

      expect(size).toHaveTextContent("31");
    });

    test("It should decrease the canvas size when the 'Decrease' button is tapped.", async () => {
      const size = document.getElementById("size");
      const btnDecrease = screen.getByRole("button", {
        name: /decrease size/i,
      });

      expect(size).toHaveTextContent("30");
      expect(btnDecrease).toBeInTheDocument();

      await user.click(btnDecrease);

      expect(size).toHaveTextContent("29");
    });
  });
});
