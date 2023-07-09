import { API_URL } from 'config/endpoints';
import { post, put } from 'config/index';
import { ROUTES } from 'Routes/Routing';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ClientCreateEdit = (props) => {
    const { handleModalClose, fetchClientDetails, ClientDetails, clientId } = props;

    const navigate = useNavigate();
    const { PRIVATE } = ROUTES;
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [ErrMsg, setErrMsg] = useState("");

    React.useEffect(() => {
        if (clientId) {
            ClientDetails?.find((client) => {
                if (client._id === clientId) {
                    setEmail(client.email);
                    setName(client.name);
                    setPhone(client.phone);
                }
            })
        }
    }, [])

    const signUpForm = async (event) => {
        event.preventDefault();

        if (clientId) {
            await put(`${API_URL.UPDATE_CLIENT}/${clientId}`, { name, email, phone }).then((res) => {
                if (res.status) {
                    fetchClientDetails();
                    handleModalClose();
                } else {
                    setErrMsg("Something went wrong");
                }
            });
        } else {
            await post(API_URL.REGISTER, { name, email, phone, password }).then((res) => {
                if (res.status) {
                    fetchClientDetails();
                    handleModalClose();
                } else {
                    setErrMsg("Something went wrong");
                }
            });
        }

    };

    return (
        <div className='outer'>
            <div className="signIn-form">
                <h2>Sign Up</h2>
                <form method="POST" onSubmit={signUpForm}>

                    <div>
                        <input
                            class="input my-2 form-control"
                            type="text"
                            name="your_name"
                            id="your_name"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                            placeholder="Enter your name"
                            style={{ width: "300px" }}
                        />
                    </div>

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
                            placeholder="Enter your email"
                            style={{ width: "300px" }}
                        />
                    </div>

                    <div>
                        <input
                            class="input my-2 form-control"
                            type="text"
                            name="your_phone"
                            id="your_phone"
                            value={phone}
                            onChange={(e) => {
                                setPhone(e.target.value);
                            }}
                            placeholder="Enter your phone"
                            style={{ width: "300px" }}
                        />
                    </div>
                    {!clientId &&
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
                                placeholder="Password"
                                style={{ width: "300px" }}
                            />
                        </div>}

                    <div>
                        <input type="submit" name="signIn" value={clientId ? 'Update' : 'Create'} class="input my-2 form-control" style={{ width: "300px" }} />
                    </div>
                </form>


                {/* {ErrMsg.length > 0 && (
                <div>
                    <p style={{ color: "red" }}>{ErrMsg}</p>
                </div>
            )} */}
            </div>
        </div>
    )
}

export default ClientCreateEdit