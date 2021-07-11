import React from 'react';
import ChannelCard from '../SearchComponent/ChannelCard';
import Utils from '../Utils/Utils';

class SubsListComponent extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            subs: []
        }
    }

    async componentDidMount() {
        let currentSubs = this.props.subsHandler("", "getCurrentSubs");
        let subsArray = [];
        for (let sub in currentSubs) {
            let utils = new Utils();
            let continueTrying = true;
            while (continueTrying) {
                try {
                    const controller = new AbortController();
                    setTimeout(() => controller.abort(), 2000);
                    const instance = await utils.getRandomInstance();
                    const channelDetails = await (await fetch(
                        `https://${instance}/api/v1/channels/${sub}`,
                        { signal: controller.signal }
                    )).json();
                    
                    subsArray.push(channelDetails);
                    continueTrying = false;

                    
                } catch {

                }
            }

            this.setState({subs: subsArray});      
        }
      
    }


    render() {
        console.log(this.state.subs);
        return (<div className="contentArea">
            {(this.state.subs).map(sub => {
                return <ChannelCard 
                author={sub.author} 
                subCount={sub.subCount}
                authorId={sub.authorId}
                description={sub.description}
                subsHandler={this.props.subsHandler} /> 
            })}
        </div>);
    }
}

export default SubsListComponent;