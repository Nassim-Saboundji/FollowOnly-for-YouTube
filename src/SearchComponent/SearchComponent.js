import React from 'react';
import Utils from '../Utils/Utils';

class SearchComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: "",
            searchResult: []
        };
        this.initiateSearch = this.initiateSearch.bind(this);
    }

    async initiateSearch(event) {
        event.preventDefault();          
        let utils = new Utils();
        const instance = await utils.getRandomInstance();
        
        const searchResult = await (await fetch(
            `https://${instance}/api/v1/search?q=${this.state.input}&type=channel&sort_by=relevance`
        )).json();
        this.setState({searchResult: searchResult});
    }
    

    render() {
        return (
            <div>
              <form onSubmit={this.initiateSearch}>
                <input 
                placeholder="Search channel..."
                onChange={input => {
                    this.setState({input: input.target.value});
                }}
                /> 
                <input
                type="submit"
                value="Search"
                />
              </form>
              
              <div>{this.state.currentInstance}</div>
                   
            </div>
        );
    }
}

export default SearchComponent;