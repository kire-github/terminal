import { useEffect, useRef, useState } from "react";
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

    const makeVisible = useRef(null);

    const scrollToBottom = () => {
        setTimeout(() => {
            makeVisible.current?.scrollIntoView();
        }, 50);
    }

    useEffect(() => {
        scrollToBottom();
    }, [history]);

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

    const handleBlur = () => {
        setTimeout(() => {
            inputRef.current.focus()
        }, 100);
    };

    return (
        <div className="fade-edges overflow-y-auto shadow max-w-screen h-screen text-green-400 font-mono p-4">

            <div id="history">
                {history.map((line, index) => (
                    <Line key={line.key} id={index} text={line.text} animate={line.animate} />
                ))}
            </div>

            <div className="flex">
                <>
                    <span className="text-yellow-400">Terminal</span>
                    <span className="text-gray-500">@</span>
                    <span className="text-sky-500">web</span>
                    <span className="text-gray-500">&gt;</span>
                </>
                <input
                    autoFocus
                    
                    ref={inputRef}
                    className="bg-transparent outline-none ml-2 flex-1"
                    type="text"
                    value={input}

                    onChange={(event) => setInput(event.target.value)}
                    onBlur={handleBlur}
                    onKeyDown={handleEvent}
                />
            </div>

            <div ref={makeVisible} />

        </div>
    );
}