import { useState } from "react";

export default function Input({ onEnter }) {
    const [input, setInput] = useState("");

    const handleEnter = (event) => {
        if (event.key = "Enter") {
            onEnter(input);
            setInput("");
        }
    };

    return (
    <div>
        <span className="text-green-500">root></span>
        <input
            autoFocus
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleEnter}
            className="bg-transparent outline-none ml-2"
        />
    </div>
    );
}