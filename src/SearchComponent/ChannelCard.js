import React from 'react';


function ChannelCard(props) {
    
    let subs = props.subsHandler("", "getCurrentSubs");
    if (subs[props.authorId] !== undefined) {
        return (
            <div key={props.authorId}>
                <h3>{props.author}</h3>
                <p>Subs : {props.subCount}</p>
                <p>{props.description}</p>
                <button onClick={() => {
                    props.subsHandler({
                        authorId: props.authorId
                    }, "deleteSub");
                }}>Unsubscribe</button>
            </div> 
        );
    }

    return (
        <div key={props.authorId}>
            <h3>{props.author}</h3>
            <p>Subs : {props.subCount}</p>
            <p>{props.description}</p>
            <button onClick={() => {
                props.subsHandler({
                    author: props.author,
                    authorId: props.authorId,
                    description: props.description
                }, "addSubs");
            }}>Subscribe</button>
        </div>
    );
}

export default ChannelCard;