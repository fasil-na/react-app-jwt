import { authAction } from 'container/auth.slice';
import { ROUTES } from 'Routes/Routing';
import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

function Navbar() {
    const { PRIVATE } = ROUTES;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark ps-4 pe-4">
            <div class="container-fluid">
                <a class="navbar-brand">
                    <b>Admin Panel</b>
                </a>
                <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarTogglerDemo01"
                    aria-controls="navbarTogglerDemo01"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarTogglerDemo01">

                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a
                                class="nav-link active"
                                onClick={() => {
                                    navigate("/admin/home");
                                }}
                                aria-current="page"
                            >
                                <i>Home</i>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" onClick={() => {

                                navigate("/admin/client_table");
                            }}>
                                <i>Clients</i>
                            </a>
                        </li>
                    </ul>
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link active" onClick={() => {
                                navigate(PRIVATE.LOGIN);
                                dispatch(authAction.setLogout());
                            }}>
                                <i> Logout</i>
                            </a>
                        </li>

                    </ul>

                </div>
            </div>
        </nav>
    )
}

export default Navbar
