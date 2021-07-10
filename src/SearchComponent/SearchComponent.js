import React from 'react';
import Utils from '../Utils/Utils';
import ChannelCard from './ChannelCard';

class SearchComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: "",
            searchResults: []
        };
        this.search = this.search.bind(this);
    }

    async search(event) {
        event.preventDefault();          
        let utils = new Utils();
        let continueTrying = true;

        while (continueTrying) {
            try {
                const instance = await utils.getRandomInstance();
                const searchResult = await (await fetch(
                    `https://${instance}/api/v1/search?q=${this.state.input}&type=channel&sort_by=relevance`
                )).json();

                this.setState({searchResults: searchResult.slice(0,4)});
                continueTrying = false;
            } catch {
                
            }
        }
    }
    

    render() {
        return (
            <div>
              <form onSubmit={this.search}>
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
              
              {(this.state.searchResults).map(result => {
                  return <ChannelCard 
                  author={result.author} 
                  subCount={result.subCount}
                  authorId={result.authorId}
                  description={result.description}
                  subsHandler={this.props.subsHandler} /> 
              })}

  
                   
            </div>
        );
    }
}

export default SearchComponent;