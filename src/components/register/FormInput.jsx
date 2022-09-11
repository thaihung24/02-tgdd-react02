import { React, useState } from "react";
import "../../assets/css/register/testmain.css";

const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { onChange, errorMessage, id, ...inputProps } = props;
  // console.log(props);
  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <div className="register_form_input">
      <input
        {...inputProps}
        onChange={onChange}
        className="register_form_input username"
        onBlur={handleFocus}
        focused={focused.toString()}
      />
      {/* <i className="fa-solid fa-circle-check"></i> */}
      <i className="fa-solid fa-circle-exclamation"></i>
      <span className="register_form_input_mess">{errorMessage}</span>
    </div>
  );
};

export default FormInput;
