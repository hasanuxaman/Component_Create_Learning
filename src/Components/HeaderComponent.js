import "../TopBar.css";

function Header() {
    return (
        <div className="top-bar">
            <div className="top-bar-container">
                <div className="top-bar-left">
                    <span className="brand">MyApp</span>
                    <div className="top-nav">
                        <a href="/" className="active">Home</a>
                        <a href="/products">Products</a>
                        <a href="/services">Services</a>
                        <a href="/pricing">Pricing</a>
                    </div>
                    <div className="top-bar-right">
                        <div className="top-bar-actions">
                            <a href="/login">Log In</a>
                            <a href="/signup" className="cta-button">Get Started</a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}


export default Header;