import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../../components/Layout/Layout';
import "./project-styling.css"
import { HeadingContainer, PageHeader, EntireWrapper, Explanation, Teststuff, Teammates, Memberdetail, MemberIcon, Socials } from "./project-styling"
import { LiteYoutubeEmbed } from 'react-lite-yt-embed'; // incase it's needed
import { FaGithub, FaLinkedin} from 'react-icons/fa'; //Import more if required
import ReactTooltip from 'react-tooltip';
import lechonk from '../../images/chonk.png'
import { IconContext } from 'react-icons';
import ReactDOM from 'react-dom';


const MediaCheck = (props) => {
    if(props.media ==='Github'){
        return(
            <a>
                <FaGithub />
            </a>
        )
    } else if (props.media === 'Linkedin'){
        return(
            <a>
                <FaLinkedin />
            </a>
        )
    }
    return (
        <h1>ya done goofed</h1>
    )
}

const Media = (props) => {
    return (
        <MediaCheck media={props.name} />
    )
}

export default Media