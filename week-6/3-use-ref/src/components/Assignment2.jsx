import React, { useState, useCallback, useRef } from 'react';

// Create a component that tracks and displays the number of times it has been rendered. Use useRef to create a variable that persists across renders without causing additional renders when it changes.
// let count = 0;
export function Assignment2() {
    const [, forceRender] = useState(0);
    // const [renderCount, setRenderCount] = useState(0);
    // console.log(count++);
    const renderCont = useRef(0);
    const pRef = useRef();
    // console.log(count++);
    const handleReRender = () => {
        // Update state to force re-render
        forceRender(Math.random());
        // setRenderCount(renderCount + 1);
    };
    renderCont.current = renderCont.current + 1;
    console.log(renderCont);
    
    return (
        <div>
            <p ref={pRef}>This component has rendered {renderCont.current} times.</p>
            {console.log(pRef)}
            <button onClick={handleReRender}>Force Re-render</button>
        </div>
    );
};