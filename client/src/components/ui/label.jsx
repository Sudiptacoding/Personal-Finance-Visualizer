import React from "react";

const Label = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <label
      ref={ref}
      {...props}
      className={"block mb-1 font-medium text-gray-700 " + (className || "")}
    />
  );
});

Label.displayName = "Label";

export { Label };
