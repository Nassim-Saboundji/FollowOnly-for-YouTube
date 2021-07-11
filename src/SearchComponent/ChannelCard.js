import React from 'react';


function ChannelCard(props) {
    
    let subs = props.subsHandler("", "getCurrentSubs");
    if (subs[props.authorId] !== undefined) {
        return (
            <div key={props.authorId} > 
                <div className="channelCard">
                    <h3>{props.author}</h3>
                    <p>Subs : {props.subCount}</p>
                    <button className="subButton" onClick={() => {
                        props.subsHandler({
                            authorId: props.authorId
                        }, "deleteSub");
                    }}>Unsubscribe</button>
                </div>
            </div> 
        );
    }

    return (
        <div key={props.authorId}>
            <div className="channelCard">
                <h3>{props.author}</h3>
                <p>Subs : {props.subCount}</p>
                <button className="subButton" onClick={() => {
                    props.subsHandler({
                        author: props.author,
                        authorId: props.authorId,
                        description: props.description
                    }, "addSubs");
                }}>Subscribe</button> 
            </div>
        </div>
    );
}

export default ChannelCard;