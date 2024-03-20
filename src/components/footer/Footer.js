import {Link} from "react-router-dom";

function Footer() {
    return (
        <footer className="bg-primary text-white text-lg-start">
            <div className="container-flex p-4">
                <div className="row">
                    <div className="col-lg-3 col-md-6 mb-4 mb-md-0 text-white">
                        <h4>MyCity</h4>
                        <p>MyCity operates an interactive map where you can find informations about...(an
                            oben anpassen später)</p>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                        <h5 className="text-uppercase">Menu</h5>
                        <ul className="list-unstyled">
                            <li>
                                <Link to="/reportplace" className="text-white">Report a Place</Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-white">About</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                        <h5 className="text-uppercase">Useful links</h5>
                        <ul className="list-unstyled">
                            <li>
                                <Link to="/reportplace" className="text-white">Report a Place</Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-white">About</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                        <h5 className="text-uppercase">Follow us</h5>

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