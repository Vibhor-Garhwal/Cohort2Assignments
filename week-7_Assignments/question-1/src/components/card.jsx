import React from 'react';
import { RecoilRoot, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { cardAtom } from '../atoms';


export const Card = () => {
    const [card, setCard] = useRecoilState(cardAtom);
    console.log(card);
    return (
        <div className='container'>
            <div id='profile-picture'>{card.picture}</div>
            <div id='name-age'>
                <span id='name'>{card.namefield} </span><span id='age'>{card.age}</span>
            </div>
            <div id="location">{card.location}</div>
            <br />
            <div id="details">
                <div className="social-media" id="followers">
                    <div id='followers-count'>{card.followers > 1000 ? card.followers / 1000 + 'K' : card.followers}</div>
                    <div className="followers-text">Folowers</div>
                </div>
                <div className="social-media" id="likes">
                    <div id='likes-count'>{card.likes > 1000 ? card.likes / 1000 + 'K' : card.likes} </div>
                    <div className="likes-text">Likes</div>
                </div>
                <div className="social-media" id="photos">
                    <div id='photos-count'>{card.photos > 1000 ? card.photos / 1000 + 'K' : card.photos} </div>
                    <div className="photos-text">Photos</div>
                </div>
            </div>
        </div>
    )

}