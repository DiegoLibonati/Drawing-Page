import { getElements } from "./getElements";

import { OFFICIAL_BODY } from "../tests/jest.setup";

beforeEach(() => {
  document.body.innerHTML = OFFICIAL_BODY;
});

afterEach(() => {
  document.body.innerHTML = "";
});

test("It must render the elements of the document that the 'getElements' function exports.", () => {
  const {
    canvas,
    clearElement,
    color,
    decreaseBtn,
    increaseBtn,
    sizeElement,
  } = getElements();

  expect(canvas).toBeInTheDocument();
  expect(clearElement).toBeInTheDocument();
  expect(color).toBeInTheDocument();
  expect(decreaseBtn).toBeInTheDocument();
  expect(increaseBtn).toBeInTheDocument();
  expect(sizeElement).toBeInTheDocument();
});