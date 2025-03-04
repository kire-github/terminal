import { useRef, useState } from "react";
import { Line } from "./Line";
import { execute, banner } from "../logic/commands";
import { v4 as uuidv4 } from "uuid";

const prompt = "Terminal@web>";

export function Terminal() {
    const [input, setInput] = useState("");
    const inputRef = useRef(null);

    const [history, addHistory] = useState([...banner().map((line) => ({text: line, key: uuidv4(), animate: true}))]);

    const [commandHistory, addCommand] = useState([]);
    const cHistoryRef = useRef(0);

    const handleEvent = (event) => {

        switch (event.key) {
            case "Enter":
                if (input === "clear") {
                    addHistory([]);
                } else if (input === "") {
                    addHistory((prev) => [
                        ...prev,
                        { text: `${prompt} ${input}`, key: uuidv4(), animate: false }
                    ]);
                } else {
                    addHistory((prev) => [
                        ...prev,
                        { text: `${prompt} ${input}`, key: uuidv4(), animate: false },
                        ...execute(input).map((line) => ({ text: line, key: uuidv4(), animate: true }))
                    ]);
                }
                
                if (input !== "") {
                    addCommand((prev) => [...prev, input]);
                    cHistoryRef.current = commandHistory.length + 1;
                    setInput("");
                }

                break;
            
            case "ArrowUp":
                if (cHistoryRef.current > 0) {
                    const lastCommand = commandHistory.at(--cHistoryRef.current);
                    setInput(lastCommand);

                    setTimeout(() => {
                        inputRef.current.setSelectionRange(lastCommand.length, lastCommand.length);
                    }, .1);
                }
                break;

            case "ArrowDown":
                if (cHistoryRef.current < commandHistory.length - 1) {
                    const lastCommand = commandHistory.at(++cHistoryRef.current);
                    setInput(lastCommand);

                    setTimeout(() => {
                        inputRef.current.setSelectionRange(lastCommand.length, lastCommand.length);
                    }, .1);
                }
                break;
        }

    };

    return (
    <div>
        <div id="history">
            {history.map((line, index) => (
                <Line key={line.key} id={index} text={line.text} animate={line.animate} />
            ))}
        </div>
        <div>
            <span>{prompt}</span>
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