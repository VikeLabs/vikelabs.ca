import React from 'react';
import "./project-styling.css"
import { Memberdetail, Socials } from "./project-styling"
import { LiteYoutubeEmbed } from 'react-lite-yt-embed'; // incase it's needed
import ReactTooltip from 'react-tooltip';
import Media from './member-media';

const Member = (props) => {
    return (
        <Memberdetail>
            <h4>{props.name}</h4>
            <p>{props.role}</p>
            <Socials>
                <Media name='Github' />
                <Media name='Linkedin' />
            </Socials>
        </Memberdetail>
    )
}

export default Member
