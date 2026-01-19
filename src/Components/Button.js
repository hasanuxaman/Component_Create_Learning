
import "./Buttoncss.css";

function Button({ text,
    variant ,
    size ,
    onClick,
    loading ,
    disabled  }) {
    return (
        <button
            className={`btn btn--${variant} btn--${size}`}
            onClick={onClick}
            disabled={loading || disabled}
        >
            {loading && (
                <span className="btn__spinner">
                    <svg className="spinner" viewBox="0 0 50 50">
                        <circle cx="25" cy="25" r="20" fill="none" strokeWidth="4" />
                    </svg>
                </span>
            )}

            {loading ? "Saving..." : text}
        </button>
    );
}

export default Button;