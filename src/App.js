import React from 'react';
import SearchComponent from './SearchComponent/SearchComponent';
import ViewSubsContent from './ViewSubsComponent/ViewSubsContent';


class App extends React.Component {    
    
    constructor(props) {
        super(props);
        this.state = {
            subs: {},
            navigateTo: {
                searchComponent: false,
                viewSubsContent: false
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
            console.log(this.state.subs);

        } else if (command === "deleteSub") {
            delete currentSubs[channel.authorId];
            this.setState({subs: currentSubs});
            console.log(this.state.subs);

        } else if (command === "getCurrentSubs") {
            return currentSubs;
        }
    }

    render() {

        return (
            <>
                <div>
                    <button onClick={() => {
                        this.setState({navigateTo: {
                            searchComponent: false,
                            viewSubsContent: true
                        }});
                    }}>View Subs Content</button>
                    <button onClick={() => {
                        this.setState({navigateTo: {
                            searchComponent: true,
                            viewSubsContent: false
                        }});
                    }}>Search Channels</button>
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
            </>
        ); 
    }
}

export default App;