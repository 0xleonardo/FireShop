import {observer} from "mobx-react";
import "./registration.style.css";
import {useState} from "react";
import {FormInput} from "./form-input/form-input.component";
import {ResponseError} from "superagent";
import {useStore} from "../../stores/utils/store-provider";
import {useNavigate} from "react-router-dom";

export const LoginRegistrationComponent = observer(() => {
    const {authStore} = useStore();
    const navigate = useNavigate();

    const [panelState, setPanelState] = useState("");

    const changePanelState = () => {
        if (panelState === "") {
            setPanelState("right-panel-active");
        }
        else {
            setPanelState("");
        }
    }

    const [registrationCredentials, setRegistrationCredentials] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [loginCredentials, setLoginCredentials] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [registerSuccess, setRegisterSuccess] = useState("");

    const inputsLogin = [
        {
            id: 6,
            name: "email",
            type: "text",
            placeholder: "Email",
            errorMessage: "Please enter valid email",
            label: "Email",
        },
        {
            id: 7,
            name: "password",
            type: "password",
            placeholder: "Password",
            errorMessage: "Please enter password",
            label: "Password",
        }
    ];

    const inputsRegistration = [
        {
            id: 1,
            name: "name",
            type: "text",
            placeholder: "Name",
            errorMessage:
                "Name should be 2-32 characters and shouldn't include any special character!",
            label: "Name",
            pattern: "^[A-Za-z0-9]{2,32}$",
            required: true,
        },
        {
            id: 2,
            name: "surname",
            type: "text",
            placeholder: "Surname",
            errorMessage:
                "Surname should be 2-64 characters and shouldn't include any special character!",
            label: "Surname",
            pattern: "^[A-Za-z0-9]{2,64}$",
            required: true,
        },
        {
            id: 3,
            name: "email",
            type: "email",
            placeholder: "Email",
            errorMessage: "It should be a valid email address!",
            label: "Email",
            required: true,
        },
        {
            id: 4,
            name: "password",
            type: "password",
            placeholder: "Password",
            errorMessage:
                "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
            label: "Password",
            pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
            required: true,
        },
        {
            id: 5,
            name: "confirmPassword",
            type: "password",
            placeholder: "Confirm Password",
            errorMessage: "Passwords don't match!",
            label: "Confirm Password",
            pattern: registrationCredentials.password,
            required: true,
        },
    ];

    const handleRegistrationSubmit = (e: any) => {
        e.preventDefault();
        authStore.register(registrationCredentials.name, registrationCredentials.surname, registrationCredentials.email, registrationCredentials.password)
            .then((res: any)=> {
                setPanelState("");
                setRegisterSuccess(res.success);
                setError("");
            })
            .catch((err:any) => {
                setPanelState("");
                setError(err.response!.body.error);
            });
    };

    const handleLoginSubmit = (e: any) => {
        e.preventDefault();
        authStore.login(loginCredentials.email, loginCredentials.password)
            .then(()=> {
                navigate("/");
            })
            .catch((err:ResponseError) => {
                setError(err.response!.body.error)
            });
    };

    const onLoginChange = (e: any) => {
        setLoginCredentials({ ...loginCredentials, [e.target.name]: e.target.value });
    };

    const onRegistrationChange = (e: any) => {
        setRegistrationCredentials({ ...registrationCredentials, [e.target.name]: e.target.value });
    };

    return (
        <div className="regloginform">
            <div className={`container ${panelState}`} id="container">
                <div className="form-container sign-up-container" hidden={panelState===""}>
                    <form action="#">
                        <h1>Create Account</h1>
                        {inputsRegistration.map((input) => (
                            <FormInput
                                key={input.id}
                                {...input}
                                onChange={onRegistrationChange}
                            />
                        ))}
                        <button onClick={handleRegistrationSubmit}>Sign Up</button>
                    </form>
                </div>
                <div className="form-container sign-in-container" hidden={panelState!==""}>
                    <form action="#">
                        <h1>Sign in</h1>
                        {inputsLogin.map((input) => (
                            <FormInput
                                key={input.id}
                                {...input}
                                onChange={onLoginChange}
                            />
                        ))}
                        {!!error && <div className="loginError">{error}</div>}
                        {!!registerSuccess && <div className="registerSuccess">{registerSuccess}</div>}
                        <button onClick={handleLoginSubmit}>Sign In</button>
                        <a href="#">Forgot your password?</a>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button className="ghost" id="signIn" onClick={changePanelState}>Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <button className="ghost" id="signUp" onClick={changePanelState}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
})