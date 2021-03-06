import React from 'react';
import Skill from './../../components/skill';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            unlocked: [],
            skills: [],
            name: '',
            img: '',
            depends: '',
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleImg = this.handleImg.bind(this);
        this.handleDepends = this.handleDepends.bind(this);

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
            }, {
                name: 'Arcane Bolt',
                img: 'https://gamepedia.cursecdn.com/minionmasters_gamepedia_en/thumb/b/bf/ArcanePrison.jpg/216px-ArcanePrison.jpg?version=65f7f7c9a48bd3f5811947916c85fbf7',
                dependsOn: ['FireThunder'],
            }, {
                name: 'Hypnotize',
                img: 'https://gamepedia.cursecdn.com/minionmasters_gamepedia_en/a/a8/Hypnotize.jpg?version=d74ef2ac9fff7b58c60a6920879b214e',
                dependsOn: ['FireBreath'],
            },
            {
                name: 'Infiltration',
                img: 'https://gamepedia.cursecdn.com/minionmasters_gamepedia_en/thumb/6/63/Infiltrators.jpg/216px-Infiltrators.jpg?version=093b92c1edd70ce7c6a0ba1de70ab001',
                dependsOn: ['Hypnotize', 'FireBreath', 'FireBall', 'Flames'],
            },
            {
                name: 'Sun Burn ',
                img: 'https://gamepedia.cursecdn.com/minionmasters_gamepedia_en/thumb/3/3a/SunBurn.jpg/216px-SunBurn.jpg?version=7bb12993c6811229c9c2d3c365a1f6e8',
                dependsOn: ['Flames'],
            },
        ]

        var ordered = this.topologicOrder(objs);

        this.setState({
            skills: ordered
        })
    }

    topologicOrder(objs) {
        objs = objs.map(obj => { return { ...obj, tempDependsOn: obj.dependsOn } })
        let topologic = [];

        while (objs.length > 0) {
            const ready = objs.filter(obj => {
                return obj.dependsOn.length === 0;
            });

            if (ready.length === 0) return undefined;

            const notReady = objs.filter(obj => obj.dependsOn.length > 0);

            ready.map(readyObj => {
                topologic.push(readyObj);

                objs = notReady.map(notReadyObj => {
                    notReadyObj.dependsOn = notReadyObj.dependsOn.filter(
                        dependency => dependency !== readyObj.name
                    )
                    return notReadyObj;
                })
            })
        }

        return topologic.map(obj => {
            return {
                name: obj.name,
                img: obj.img,
                dependsOn: obj.tempDependsOn
            }
        });
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

    handleName(e) {
        this.setState({ name: e.target.value })
    }

    handleImg(e) {
        this.setState({ img: e.target.value })
    }

    handleDepends(e) {
        this.setState({ depends: e.target.value })
    }

    async handleSubmit(e) {
        let skill = await {
            "name": this.state.name,
            "img": this.state.img,
            "dependsOn": this.state.depends.split(',')
        }

        let skills = this.state.skills;

        skills.push(skill);

        var ordered = this.topologicOrder(skills);

        this.setState({
            skills: ordered
        })

        this.setState({
            name: "",
            img: "",
            depends: ""
        })
    }

    render() {

        if (this.state.skills === undefined) {
            return (
                <div>Não é possível mostrar essa ordem :(</div>
            )
        }

        return (
            <div style={{ display: 'flex', marginLeft: "100px" }}>
                <h1>Skills:</h1>
                <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'center', flexDirection: "column", marginLeft: '100px'}}>
                    {this.state.skills.map((skill, i) =>
                        <Skill
                            key={`skill${i}`}
                            skill={skill}
                            unlock={() => this.unlock(skill.name)}
                            status={this.checkStatus(skill)}
                        />
                    )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', margin: '250px', backgroundColor: 'gray', padding: "30px", borderRadius: '20px', paddingBottom: '10px' }}>
                    <textarea
                        type="text"
                        rows={1}
                        value={this.state.name}
                        onChange={this.handleName}
                        placeholder="Name"
                    />
                    <textarea
                        type="text"
                        rows={1}
                        value={this.state.img}
                        onChange={this.handleImg}
                        placeholder="Image"
                    />
                    <textarea
                        type="text"
                        rows={3}
                        value={this.state.depends}
                        onChange={this.handleDepends}
                        placeholder="Dependency"
                    />
                    <button onClick={this.handleSubmit} style={{margin: '20px'}}>Ok</button>
                </div>
            </div>
        );
    }
}

export default Main;