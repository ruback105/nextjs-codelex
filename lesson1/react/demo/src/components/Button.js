import React, { useEffect, useRef, useState } from "react";

const Button = ({ type, title }) => {
  const [counter, setCounter] = useState(1);
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      function onClick() {
        setCounter((prev) => prev + 1);
      }
      ref.current.addEventListener("click", onClick);

      return () => ref.current.removeEventListener("click", onClick);
    }

    return () => null;
  }, [ref]);

  console.log(counter);

  return (
    <button ref={ref} type={type}>
      {title}
    </button>
  );
};

export { Button };
