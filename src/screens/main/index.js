import React from 'react';
import Skill from './../../components/skill';

class Main extends React.Component {
    state = {
        unlocked: [],
        skills: [],
    }

    componentDidMount() {
        // This is mocked data
        // Only for testing
        // Should be receive from somewhere
        // Maybe an input screen
        var objs = [
            {
                name: 'Flames',
                img: 'https://vignette.wikia.nocookie.net/super-spell-heroes/images/1/15/Icon_spell_fire_basic_overheatedFireball.jpg/revision/latest/scale-to-width-down/310?cb=20180906130713',
                dependsOn: [],
            },
            {
                name: 'FireBall',
                img: 'https://cdn.hipwallpaper.com/i/42/92/R4BsvI.jpg',
                dependsOn: ['Flames'],
            },
            {
                name: 'FireBreath',
                img: 'https://ibucketlist.com/idea-images/824479de1bca08abb4a9b3719c347ab2fbdfd201/learn-to-firebreath--large.jpg',
                dependsOn: ['Flames', 'FireBall'],
            },
            {
                name: 'LightningBolt',
                img: 'https://gamepedia.cursecdn.com/magicka_gamepedia/2/2d/Magick_thunderbolt.png',
                dependsOn: [],
            },
            {
                name: 'Thunder',
                img: 'https://gamepedia.cursecdn.com/minionmasters_gamepedia_en/e/e8/LightningBolt.png',
                dependsOn: ['LightningBolt'],
            },
            {
                name: 'FireThunder',
                img: 'https://cdna.artstation.com/p/assets/images/images/000/075/234/large/fire_and_thunder_by_amorphisss-d205b1a.jpg?1400771486',
                dependsOn: ['Thunder', 'FireBreath'],
            },
        ]

        var ordered = this.topologicOrder(objs);

        this.setState({
            skills: ordered
        })
    }

    topologicOrder(objs) {
        objs = objs.map(obj => {return {...obj, tempDependsOn: obj.dependsOn}})
        let topologic = [];

        while (objs.length > 0) {
            const ready = objs.filter(obj => {
                return obj.dependsOn.length === 0;
            });

            if (ready.length === 0) return undefined;
            
            const notReady = objs.filter(obj => obj.dependsOn.length > 0);

            ready.map(readyObj => {
                topologic.push(readyObj);

                objs = notReady.map( notReadyObj => {
                    notReadyObj.dependsOn = notReadyObj.dependsOn.filter(
                        dependency => dependency !== readyObj.name
                    )
                    return notReadyObj;
                })
            })
        }

        return topologic.map(obj => {return {
            name: obj.name,
            img: obj.img,
            dependsOn: obj.tempDependsOn
        }});
    }

    unlock(name) {
        let unlocked = this.state.unlocked;
        let obj = this.state.skills.filter(skill => skill.name === name)[0];
        if (!unlocked.includes(name) && this.checkStatus(obj) === 'unlockable') {
            unlocked.push(name);
            this.setState({
                unlocked: unlocked
            })
        }
    }

    checkStatus(obj) {

        console.log(obj)

        if (this.state.unlocked.includes(obj.name)) {
            return 'unlocked';
        } else if (obj.dependsOn.length === 0) {
            return 'unlockable';
        }
        let isAllDepenciesOk = obj.dependsOn.map(dependency => this.state.unlocked.includes(dependency)).reduce((a, b) => a && b);
        if (isAllDepenciesOk) {
            return 'unlockable';
        }
        return 'locked';
    }

    render() {

        if (this.state.skills === undefined) {
            return (
                <div>Não é possível mostrar essa ordem :(</div>
            )
        }

        return (
            <div>
                {this.state.skills.map((skill, i) =>
                    <Skill
                        key={`skill${i}`}
                        skill={skill}
                        unlock={() => this.unlock(skill.name)}
                        status={this.checkStatus(skill)}
                    />
                )}
            </div>
        );
    }
}
 
export default Main;