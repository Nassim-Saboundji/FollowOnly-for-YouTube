import React from 'react';


function ChannelCard(props) {
    
    return (
        <div key={props.authorId}>
            <h3>{props.author}</h3>
            <p>Subs : {props.subCount}</p>
            <p>{props.description}</p>
            <button onClick={props.handler}>Subscribe</button>
        </div>
    );
}

export default ChannelCard;