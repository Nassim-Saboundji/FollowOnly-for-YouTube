import React from 'react';
import SubsListComponent from './SubsListComponent/SubsListComponent';
import SearchComponent from './SearchComponent/SearchComponent';
import ViewSubsContent from './ViewSubsComponent/ViewSubsContent';
import './style.css';


var savedSubs = {};

if (localStorage.getItem('subs') === null) {
  localStorage.setItem('subs', JSON.stringify(savedSubs));
} else {
  savedSubs = JSON.parse(localStorage.getItem('subs'));
  console.log(savedSubs);
} 


window.onunload = () => {
  localStorage.setItem('subs', JSON.stringify(savedSubs));
}

class App extends React.Component {    
    
    constructor(props) {
        super(props);
        this.state = {
            subs: savedSubs,
            navigateTo: {
                searchComponent: false,
                viewSubsContent: false,
                subsComponent: false
            }
        };

        this.subsHandler = this.subsHandler.bind(this);
    
    }

    subsHandler(channel, command) {
        let currentSubs = this.state.subs;

        if (currentSubs[channel.authorId] === undefined && command === "addSubs") {
            currentSubs[channel.authorId] = {
                author: channel.author,
                description: channel.description
            };
            this.setState({subs: currentSubs});
            savedSubs = this.state.subs;

        } else if (command === "deleteSub") {
            delete currentSubs[channel.authorId];
            this.setState({subs: currentSubs});
            savedSubs = this.state.subs;

        } else if (command === "getCurrentSubs") {
            return currentSubs;
            
        }
    }

    render() {
        return (
            <>
                <div id="titleSection">
                    <h1><span id="followOnly">FollowOnly</span> for YouTube</h1>
                    <p>Frontend Client for watching content made by channels you follow and nothing else.</p>
                </div>
                <div className="wrapper">
                    <button className="navButton" onClick={() => {
                        this.setState({navigateTo: {
                            searchComponent: false,
                            viewSubsContent: true,
                            subsComponent: false
                        }});
                    }}>View Feed</button>
                    <button className="navButton" onClick={() => {
                        this.setState({navigateTo: {
                            searchComponent: true,
                            viewSubsContent: false,
                            subsComponent: false
                        }});
                    }}>Search Channels</button>
                    <button className="navButton" onClick={() => {
                        this.setState({navigateTo: {
                            searchComponent: false,
                            viewSubsContent: false,
                            subsComponent: true
                        }});
                    }}>Subbed Channels</button>
                </div>

                {(() => {
                    if ((this.state.navigateTo).searchComponent === true) {
                        return <SearchComponent subsHandler={this.subsHandler}/>
                    }
                })()}

                {(() => {
                    if ((this.state.navigateTo).viewSubsContent === true) {
                        return <ViewSubsContent subsHandler={this.subsHandler}/>
                    }
                })()}

                {(() => {
                    if ((this.state.navigateTo).subsComponent === true) {
                        return <SubsListComponent subsHandler={this.subsHandler}/>
                    }
                })()}   
            </>
        ); 
    }
}

export default App;