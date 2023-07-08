import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import UserAxios from "../../../Axios/AdminAxios.js";
import "./Login.css";

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [ErrMsg, setErrMsg] = useState("");
    const adminFormSubmit = (e) => {
        e.preventDefault();
        UserAxios.post("/login", { email, password }).then((res) => {
            const result = res.data.adminResult;
            if (result.Status) {
                const token = result.token;
                // dispatch(ClientLogin({ token: token }));
                navigate("/admin/home");
            } else {
                setErrMsg(result.message);
            }
        });
    };
    const navigate = useNavigate();
    return (
        <div className='outer'>
            <div className="signIn-form">
                <h2>Admin Log In</h2>
                <form method="POST" onSubmit={adminFormSubmit}>
                    <div>
                        <input
                            class="input my-2 form-control"
                            type="text"
                            name="your_email"
                            id="your_email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            placeholder="Enter your_email"
                            style={{ width: "300px" }}
                        />
                    </div>

                    <div>
                        <input
                            class="input my-2 form-control"
                            type="password"
                            name="your_pass"
                            id="your_pass"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            placeholder="Enter your Password"
                            style={{ width: "300px" }}
                        />
                    </div>

                    <div>
                        <input type="submit" name="signIn" value="Log in" class="input my-2 form-control" style={{ width: "300px" }}/>
                    </div>
                </form>


                {ErrMsg.length > 0 && (
                    <div>
                        <p style={{ color: "red" }}>{ErrMsg}</p>
                    </div>
                )}

            </div>
        </div>

    )
}

export default LoginForm



