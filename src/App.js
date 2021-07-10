import React from 'react';
import SubsListComponent from './SubsListComponent/SubsListComponent';
import SearchComponent from './SearchComponent/SearchComponent';
import ViewSubsContent from './ViewSubsComponent/ViewSubsContent';


class App extends React.Component {    
    
    constructor(props) {
        super(props);
        this.state = {
            subs: {},
            navigateTo: {
                searchComponent: false,
                viewSubsContent: false,
                subsComponent: false
            }
        };
        this.subsHandler = this.subsHandler.bind(this);
        
        //code for saving subs to localstorage.
        window.onunload = () => {
            localStorage.setItem('subs', JSON.stringify(this.state.subs));
        };


    }

    componentDidMount() {
        window.onload = () => {
            const subs = localStorage.getItem('subs');
            this.setState({subs: JSON.parse(subs)});
        };
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
                            viewSubsContent: true,
                            subsComponent: false
                        }});
                    }}>View Feed</button>
                    <button onClick={() => {
                        this.setState({navigateTo: {
                            searchComponent: true,
                            viewSubsContent: false,
                            subsComponent: false
                        }});
                    }}>Search Channels</button>
                    <button onClick={() => {
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