import { useRef, useState } from "react";
import Line from "./Line";
import execute from "./commands";
import { v4 as uuidv4 } from "uuid";

export default function Terminal() {
    const [input, setInput] = useState("");
    const inputRef = useRef(null);

    const [history, addHistory] = useState([]);

    const [commandHistory, addCommand] = useState([]);
    const cHistoryRef = useRef(0);

    const handleEvent = (event) => {

        switch (event.key) {
            case "Enter":
                if (input === "clear") {
                    addHistory([]);
                } else {
                    addHistory((prev) => [...prev, "\nroot> " + input, ...execute(input)]);
                }
                
                addCommand((prev) => [...prev, input]);
                setInput("");
                cHistoryRef.current = commandHistory.length + 1;
                break;
            
            case "ArrowUp":
                if (cHistoryRef.current > 0) {
                    const lastCommand = commandHistory.at(--cHistoryRef.current);
                    setInput(lastCommand);

                    setTimeout(() => {
                        inputRef.current.setSelectionRange(lastCommand.length, lastCommand.length);
                    }, 1);
                }
                break;

            case "ArrowDown":
                if (cHistoryRef.current < commandHistory.length - 1) {
                    const lastCommand = commandHistory.at(++cHistoryRef.current);
                    setInput(lastCommand);

                    setTimeout(() => {
                        inputRef.current.setSelectionRange(lastCommand.length, lastCommand.length);
                    }, 1);
                }
                break;
        }

    };

    return (
    <div>
        <div id="history">
            {history.map((line, index) => (
                <Line key={uuidv4()} id={index} text={line} />
            ))}
        </div>
        <div>
            <br />
            <span>root&gt;</span>
            <input
                autoFocus
                ref={inputRef}
                type="text"
                id="test"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleEvent}
                className="bg-transparent outline-none ml-2"
            />
        </div>
    </div>
    );
}