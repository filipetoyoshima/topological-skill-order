import React from 'react';
import styles from './style';
import ReactTooltip from 'react-tooltip';

const Skill = props => {
    const skill = props.skill;
    let color = 'black';

    switch (props.status) {
        case 'unlocked':
            color = 'green';
            break;
        case 'unlockable':
            color = 'blue';
            break;
        case 'locked':
            color = 'gray';
            break;
    }

    return (
        <>
        <div
            style={{...styles.container, background: color}}
            data-tip data-for={`tooltip-${skill.name}`}
            onClick={props.unlock}
        >
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
        <ReactTooltip
            id={`tooltip-${skill.name}`}
            type='dark'
            effect='solid'
            place='right'
        >
            Depends on:
            <ul>
                {skill.dependsOn.map((value, i) =>
                    <li key={`li${i}`}>
                        {value}
                    </li>
                )}
            </ul>
        </ReactTooltip>
        </>
    )
}

export default Skill;