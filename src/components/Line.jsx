import { useEffect, useMemo, useState } from "react";

export function Line({ id = "", text, animate }) {
    const [index, setIndex] = useState(0);
    const visible = useMemo(() => text.slice(0, index), [index]);

    useEffect(() => {
        if (index >= text.length) {
            return;
        }

        if (animate) {
            const type = setTimeout(() => {
                setIndex(i => i + 1);
            }, 30);
    
            return () => clearTimeout(type);
        } else {
            setIndex(text.length);
        }
    }, [index, text, animate]);
    
    

    return <pre id={id}>{visible}</pre>;
}
