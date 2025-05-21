import React from "react";

const Form = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <form ref={ref} {...props} className={"space-y-4 " + (className || "")} />
  );
});

Form.displayName = "Form";

export { Form };
