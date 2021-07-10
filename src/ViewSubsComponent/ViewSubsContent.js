import React from 'react';
import Utils from '../Utils/Utils';

class ViewSubsContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            subsLatestContent: []
        };
    }

    async componentDidMount() {
        let currentSubs = this.props.subsHandler("", "getCurrentSubs");
        for (let key in currentSubs) {
            let utils = new Utils();
            let continueTrying = true;

            while (continueTrying) {
                try {
                    const instance = await utils.getRandomInstance();
                    const controller = new AbortController();
                    setTimeout(() => controller.abort(), 3000);
                    const content = await (await fetch(
                        `https://${instance}/api/v1//channels/latest/${key}`,
                        { signal: controller.signal }
                    )).json();
                    let currentContent = this.state.subsLatestContent;
                    currentContent.push(...content.slice(0,4));
                    this.setState({subsLatestContent: currentContent});
                    continueTrying = false;
                } catch {
                    
                }
            }

        }

    }


    render() {
        console.log(this.state.subsLatestContent);
        return (
            <div>
                {(this.state.subsLatestContent).map(video => {
                    return <div key={video.videoId}>{video.title}</div>;
                })}
            </div>
        );
    }

}

export default ViewSubsContent;