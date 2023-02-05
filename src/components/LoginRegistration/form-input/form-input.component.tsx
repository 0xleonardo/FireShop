import {useState} from "react";
import "./style.css";

export const FormInput = (props: any) => {
    const [focused, setFocused] = useState(false);
    const { label, errorMessage, onChange, id, ...inputProps } = props;

    const handleFocus = () => {
        setFocused(true);
    };

    return (
        <div className="formInput">
            <input
                {...inputProps}
                onChange={onChange}
                onBlur={handleFocus}
                onFocus={() => inputProps.name === "confirmPassword" && setFocused(true)}
                focused={focused.toString()}
            />
            <span className="formInput_span">{errorMessage}</span>
        </div>
    );
};