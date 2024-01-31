export function CreateCard() {
    //ye hai input box humara
    function onClickHandler() {
        const title = document.getElementById('nameInput').value;
        const sd = document.getElementById('sdInput').value;
        const interests = document.getElementById('interestsInput').value;
        const interestArray = interests.split(',');
        const linkedin = document.getElementById('linkedinInput').value;
        const twitter = document.getElementById('twitterInput').value;

        fetch('http://localhost:3000/home', {
            method: "POST",
            body: JSON.stringify({
                title: title,
                sd: sd,
                interests: interestArray,
                linkedIn: linkedin,
                twitter: twitter
            }), headers: {
                "Content-Type": "application/json"
            }
        }).then(async (res) => {
            const json = await res.json();
            console.log(json);
        })
        //resetting the input fields
        document.getElementById('nameInput').value = '';
        document.getElementById('sdInput').value = '';
        document.getElementById('interestsInput').value = '';
        document.getElementById('linkedinInput').value = '';
        document.getElementById('twitterInput').value = '';
    }
    return (
        <div className='InputBox'>
            <h1>Enter your details:</h1>
            Name: <input placeholder='Name' id='nameInput' /><br />
            Short Description: <input placeholder='Short Description' id='sdInput' /><br />
            LinkedIn : <input placeholder='profile URL' id='linkedinInput' /><br />
            Twitter : <input placeholder='profile URL' id='twitterInput' /><br />
            Your Interests: <input id='interestsInput' placeholder='Your interests seperated by commas' />
            <br />
            <button onClick={onClickHandler}>Add Your Card</button>
        </div >
    )
}