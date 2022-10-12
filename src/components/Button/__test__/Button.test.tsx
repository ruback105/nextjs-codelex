import { fireEvent, render } from "@testing-library/react";
import Button from "..";

describe("Button", () => {
  const textChildren = "Click";
  const jsxChildren = <p data-testid="jsx-children">{textChildren}</p>;

  it("render without crashing", () => {
    render(<Button>{textChildren}</Button>);
  });

  it("render text children", () => {
    const { getByText } = render(<Button>{textChildren}</Button>);

    expect(getByText(textChildren)).toBeInTheDocument();
  });

  it("render jsx children", () => {
    const { getByTestId } = render(<Button>{jsxChildren}</Button>);

    expect(getByTestId("jsx-children").innerHTML).toEqual(textChildren);
  });

  it("render default styles if no props are passed", () => {
    const { getByTestId } = render(<Button>{textChildren}</Button>);

    expect(getByTestId("button").className).toEqual(
      "whitespace-nowrap p-4 rounded-full min-w-[200px] font-semibold gap-x-3 items-center flex justify-center"
    );
  });

  it("render primary styles if primary flag is passed", () => {
    const { getByTestId } = render(<Button primary>{textChildren}</Button>);

    expect(getByTestId("button").className).toEqual(
      "whitespace-nowrap p-4 rounded-full min-w-[200px] font-semibold bg-[#8692A6] text-white gap-x-3 items-center flex justify-center"
    );
  });

  it("triggers onClick when clicked", () => {
    const onClick = jest.fn();

    const { getByTestId } = render(
      <Button onClick={onClick}>{textChildren}</Button>
    );

    fireEvent.click(getByTestId("button"));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("default Button snapshot", () => {
    const { container } = render(<Button>{textChildren}</Button>);

    expect(container).toMatchSnapshot();
  });
});
