import { useState } from "react";
import React from 'react';

// In this assignment, your task is to create a component that performs an expensive calculation (finding the factorial) based on a user input.
// Use useMemo to ensure that the calculation is only recomputed when the input changes, not on every render.

//here there is no need to add a useMemo() but its a good practice to add so, as if in future we add any state variable in the app component we dont do unnecessary fn call again and again
export function Assignment1() {
    const [input, setInput] = useState(0);
    // Your solution starts here
    const expensiveValue = React.useMemo(() => {
        function factorial(n) {
            if (n === 0) return 1;
            return n * factorial(n - 1);
        }
        if (input === 0) return 0;
        return factorial(input);
    }, [input]);
    // Your solution ends here

    return (
        <div>
            <input
                type="number"
                value={input}
                onChange={(e) => setInput(Number(e.target.value))}
            />
            <p>Calculated Value: {expensiveValue}</p>
        </div>
    );
}