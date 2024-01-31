import { useEffect, useState } from 'react'
import './App.css'
import React from 'react'
import { Card } from './components/Cards';
import { CreateCard } from './components/CreateCard';
let count = 2;
function App() {
  const [cards, setCards] = useState([]);
  // {
  //   id:1,
  //   title:"Vibhor Garhwal",
  //   sd:"I am a student of B.Tech CSE",
  //   interests: ["javascript", 'webd', 'HTML'],
  //   linkedIn: 'https://www.linkedin.com/',
  //   twitter:'https://twitter.com/?lang=en'
  // }

  useEffect(() => {
    fetch("http://localhost:3000/cards").then(async (res) => {
      const json = await res.json();
      setCards(json.cards);
    })
  }, [])

  function addCard() {
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
    <div >
      <div className='Input-Box'>
        <CreateCard />
      </div>

      <div className='Card-Container'>
        {cards.map((card) => {
          return (
            <Card key={count++} title={card.title} sd={card.sd} interests={card.interests} linkedIn={card.linkedIn} twitter={card.twitter} />
          )
        })}

      </div>

    </div>
  )
}
// const Card = React.memo((props) => {
//   return(
//     <div className='card'>
//       <h1>{props.title}</h1>
//       <p>{props.sd}</p>
//       <h2>Interests:</h2>

//       <ul>
//       {props.interests.map((interest,index) => {
//         return (<li key={index} style={{listStyle:'none'}}>{interest}</li>)
//       })}
//       </ul>

//       <a href={props.linkedIn} target="_blank"><button>Linkedin</button></a>
//       <a href={props.twitter} target="_blank"><button>Twitter</button></a>
//     </div>
//   )
// })
// function Card(props){
//   return(
//     <div className='card'>
//       <h1>{props.title}</h1>
//       <p>{props.sd}</p>
//       <h2>Interests:</h2>

//       <ul>
//       {props.interests.map((interest,index) => {
//         return (<li key={index} style={{listStyle:'none'}}>{interest}</li>)
//       })}
//       </ul>

//       <a href={props.linkedIn} target="_blank"><button>Linkedin</button></a>
//       <a href={props.twitter} target="_blank"><button>Twitter</button></a>
//     </div>
//   )
// }

export default App
