import React from 'react';
import styles from './style';

const Skill = props => {
    return (
        <div style={styles.container}>
            <div style={styles.imgContainer}>
                <img
                    style={styles.img}
                    src={'https://vignette.wikia.nocookie.net/super-spell-heroes/images/1/15/Icon_spell_fire_basic_overheatedFireball.jpg/revision/latest/scale-to-width-down/310?cb=20180906130713'}
                >
                </img>
            </div>
            <div style={styles.textContainer}>
                <span style={styles.text}>
                    Conteúdo
                </span>
            </div>
        </div>
    )
}

export default Skill;