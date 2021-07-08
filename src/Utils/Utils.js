class Utils {
    async getRandomInstance() {
        //gets the list of instances ordered by health.
        const instanceList = await (await fetch('https://api.invidious.io/instances.json?sort_by=health')).json();
        let finalInstanceList = [];
        for (let instance of instanceList) {
            if (instance[1].monitor !== null) {
                finalInstanceList.push(instance[0]);
            }
        }

        return finalInstanceList[Math.floor(Math.random()*finalInstanceList.length)];
    }
}

export default Utils;




