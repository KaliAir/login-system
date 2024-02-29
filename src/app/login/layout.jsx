import React from "react";
import { Style } from "./styleJS";

function LoginLayout({ children }) {
  return (
    <div style={Style.formWrapper}>
      {children}
    </div>
  );
}

export default LoginLayout;
