import React, {useState, useEffect} from "react";

function Counter(){
    const [count, setCount] = useState(0);
    useEffect(()=> {
        const storedCount = localStorage.getItem("pageVisits");
        const initialCount = Number(storedCount) || 0;
        setCount(initialCount + 1);
        localStorage.setItem("pageVisits", initialCount + 1);
    }, [])

    return <div>Page has been visited {count} times</div>
}

export default Counter;