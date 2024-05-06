import React, { ForwardedRef, Fragment } from "react";
import Button, { ButtonProps } from "components/Button";
import Underline from "./Underline";
import { ActionElement } from "components/Action";

function UnderlineButton(props: ButtonProps, ref: ForwardedRef<ActionElement>) {
  return (
    <Button {...props} ref={ref}>
      <Fragment>
        {props.children}
        <Underline />
      </Fragment>
    </Button>
  );
}

export default React.forwardRef(UnderlineButton);
