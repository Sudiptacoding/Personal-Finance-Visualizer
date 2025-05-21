import React from "react";

const Button = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      {...props}
      className={
        "px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 " +
        (className || "")
      }
    />
  );
});

Button.displayName = "Button";

export { Button };
