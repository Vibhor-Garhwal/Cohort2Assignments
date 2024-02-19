import { useState } from "react"
import { loremIpsum } from "lorem-ipsum";

export function Generator() {
    const [count, setCount] = useState(0);
    const [para, setPara] = useState('');
    const clickHandler = () => {
        console.log(document.getElementById('inputCount').value);
        setCount(document.getElementById('inputCount').value);
        setPara(loremIpsum({
            count: count,                // Number of "words", "sentences", or "paragraphs"
            format: "plain",         // "plain" or "html"
            sentenceLowerBound: 0,   // Min. number of words per sentence.
            sentenceUpperBound: count,  // Max. number of words per sentence.
            units: "words",      // paragraph(s), "sentence(s)", or "word(s)"       // Array of words to draw from
        }))
        // console.log(count);
    }
    return (
        <div>
            <h2>Para Generator</h2>
            <input type="number" id="inputCount" placeholder="Enter the Number of Words"></input>
            <button onClick={clickHandler}>Generate Para</button>
            <div>
                {para}
            </div>
        </div>
    )
}