import React from 'react';
import styles from './style';

const Skill = props => {
    const skill = props.skill;
    console.log(props);

    return (
        <div style={styles.container}>
            <div style={styles.imgContainer}>
                <img
                    style={styles.img}
                    src={skill.img}
                >
                </img>
            </div>
            <div style={styles.textContainer}>
                <span style={styles.text}>
                    {skill.name}
                </span>
            </div>
        </div>
    )
}

export default Skill;