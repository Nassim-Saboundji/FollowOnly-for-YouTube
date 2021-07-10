import React from 'react';
import Utils from '../Utils/Utils';

class ViewSubsContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            subsLatestContent: [],
        };
    }

    async componentDidMount() {
        let currentSubs = this.props.subsHandler("", "getCurrentSubs");
        
        for (let key in currentSubs) {
            let utils = new Utils();
            let continueTrying = true;
            while (continueTrying) {
                try {
                    const controller = new AbortController();
                    setTimeout(() => controller.abort(), 2000);
                    const instance = await utils.getRandomInstance();
                    const content = await (await fetch(
                        `https://${instance}/api/v1/channels/latest/${key}`,
                        { signal: controller.signal }
                    )).json();

                    
        
                    let currentContent = this.state.subsLatestContent;
                    currentContent.push(...content.slice(0,4));
                    let currentContentSorted = currentContent.sort(( a, b ) =>
                    {
                      if ( a.published === b.published ) return 0;
                      return ( a.published > b.published ) ? 1 : -1;
                    }).reverse();
                    
                    this.setState({subsLatestContent: currentContentSorted});
                    continueTrying = false;
                } catch {
                    
                }
            }

        }

    }


    render() {
    
        return (
            <div>
                {(this.state.subsLatestContent).map(video => {
                    return <div key={video.videoId}>
                        <a 
                        href={"https://www.youtube-nocookie.com/embed/" + video.videoId}
                        target="_blank"
                        rel="noreferrer"
                        >{video.title} ~ {video.author}</a>
                    </div>;
                })}
            </div>
        );
    }

}

export default ViewSubsContent;