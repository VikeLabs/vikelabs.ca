import React from 'react';
import "./project-styling.css"
import { MemberDetail, Socials } from "./project-styling"
import ReactTooltip from 'react-tooltip';
import Media from './member-media';

const Member = ({name, role, link, git}) => {
    return (
        <MemberDetail>
            <h4>{name}</h4>
            <p>{role}</p>
            <Socials>
                <Media media='Github' git={git}/>
                <Media media='Linkedin' link={link} />
            </Socials>
        </MemberDetail>
    )
}

export default Member
