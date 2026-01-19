import { useState } from "react";
import Button from "../Components/Button";
import "../Components/Buttoncss.css";

function Button_Use() {
    const [inputName, setInpute] = useState("");
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        setLoading(true);

        await new Promise((resolve) => setTimeout(resolve, 3000));

        alert(inputName);
        console.log(`Output: ${inputName}`);

        setLoading(false);
    };

    return (
        <div>
            <input
                type="text"
                value={inputName}
                onChange={(e) => setInpute(e.target.value)}
                placeholder="Enter your Text"
            />

            <Button
                loading={loading}
                variant="primary"
                size="large"
                text="Save"
                onClick={handleClick}
            />
        </div>
    );
}

export default Button_Use;
