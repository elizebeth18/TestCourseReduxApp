import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainOutlet from "./MainOutlet";
import Home from "./Home/Home";

const NotFound = () => <h2>Page Not Found</h2>

const Routing = () => {
    return (
        <>
            <nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Courses</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Features</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Pricing</a>
                            </li>
                        </ul>
                        <span className="navbar-text">
                            Navbar text with an inline element
                        </span>
                    </div>
                </div>
            </nav>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainOutlet />}>
                        <Route index element={<Home />}/>
                        <Route path="*" element={<NotFound/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Routing;