import React from 'react';
import Skill from './../../components/skill';

class Main extends React.Component {
    state = {}
    
    render() {
        const obj = {
            name: 'Fireball',
            img: 'https://vignette.wikia.nocookie.net/super-spell-heroes/images/1/15/Icon_spell_fire_basic_overheatedFireball.jpg/revision/latest/scale-to-width-down/310?cb=20180906130713',
            dependsOn: [],
        }

        return (
            <div>
                <Skill skill={obj}/>
            </div>
        );
    }
}
 
export default Main;