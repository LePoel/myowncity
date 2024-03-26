import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="bg-primary text-white text-lg-start position-sticky-bottom">
            <div className="container-flex p-4">
                <div className="row">
                    <div className="col-md-7 mb-md-0 text-white">
                        <h2>MyCity</h2>
                        <p>MyCity operates an interactive map that shows places in your neighborhood that have been rated by our community.</p>
                    </div>
                    <div className="col-md-5 mb-md-0">
                        <h2 className="text-uppercase">Menu</h2>
                        <ul className="list-unstyled">
                            <li>
                                <Link to="/reportplace" className="text-white">Report a Place</Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-white">About</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="text-center p-3">
                © 2024 Copyright:
                <a className="text-white" href="https://techlabs.org/">TechLabs e.V.</a>
            </div>
        </footer>
    );
}

export default Footer;