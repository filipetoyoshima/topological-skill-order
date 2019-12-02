import React from 'react';
import Skill from './../../components/skill';

class Main extends React.Component {
    state = {
        unlocked: [],
        skills: [],
    }

    componentDidMount() {
        var objs = [
            {
                name: 'Flames',
                img: 'https://vignette.wikia.nocookie.net/super-spell-heroes/images/1/15/Icon_spell_fire_basic_overheatedFireball.jpg/revision/latest/scale-to-width-down/310?cb=20180906130713',
                dependsOn: [],
            },
            {
                name: 'FireBall',
                img: 'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwirstTDsJbmAhXmILkGHTBbDN0QjRx6BAgBEAQ&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Ffireball&psig=AOvVaw2BWD3Iaj_Dv6mrF21cx686&ust=1575355983308688',
                dependsOn: ['Flames'],
            },
            {
                name: 'FireBreath',
                img: '',
                dependsOn: ['Flames', 'FireBall'],
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