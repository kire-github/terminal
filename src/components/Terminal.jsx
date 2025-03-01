import { useRef, useState } from "react";
import Line from "./Line";
import { v4 as uuidv4 } from "uuid";

export default function Terminal() {
    const [input, setInput] = useState("");
    const inputRef = useRef(null);

    const [history, setHistory] = useState([]);
    const historyRef = useRef(0);

    const handleEvent = (event) => {

        switch (event.key) {
            case "Enter":
                setHistory((prev) => [...prev, {id: uuidv4(), line: input}]);
                setInput("");

                historyRef.current = history.length + 1;
                break;
            
            case "ArrowUp":
                if (historyRef.current > 0) {
                    const lastCommand = history.at(--historyRef.current).line;
                    setInput(lastCommand);

                    setTimeout(() => {
                        inputRef.current.setSelectionRange(lastCommand.length, lastCommand.length);
                    }, 1);
                }
                break;

            case "ArrowDown":
                if (historyRef.current < history.length - 1) {
                    const lastCommand = history.at(++historyRef.current).line;
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
                <Line key={line.id} id={index} text={line.line}/>
            ))}
        </div>
        <div>
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