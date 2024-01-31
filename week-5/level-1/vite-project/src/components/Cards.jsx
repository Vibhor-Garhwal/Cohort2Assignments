import React from 'react';

export const Card = React.memo((props) => {
    return(
      <div className='card'>
        <h1>{props.title}</h1>
        <p>{props.sd}</p>
        <h2>Interests:</h2>
  
        <ul>
        {props.interests.map((interest,index) => {
          return (<li key={index} style={{listStyle:'none'}}>{interest}</li>)
        })}
        </ul>
  
        <a href={props.linkedIn} target="_blank"><button>Linkedin</button></a>
        <a href={props.twitter} target="_blank"><button>Twitter</button></a>
      </div>
    )
})
  
