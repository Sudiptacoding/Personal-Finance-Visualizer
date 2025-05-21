import React from "react";

const Input = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      {...props}
      className={
        "border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 " +
        (className || "")
      }
    />
  );
});

Input.displayName = "Input";

export { Input };
