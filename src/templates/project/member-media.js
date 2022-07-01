import React from 'react';
import "./project-styling.css"
import { FaGithub, FaLinkedin} from 'react-icons/fa'; //Import more if required


const Media = ({media, git, link}) => {
    if(media ==='Github'){
        return(
            <a href={git}><FaGithub /></a>
        )
    } else if (media === 'Linkedin'){
        return(
            <a href={link}><FaLinkedin /></a>
        )
    }
    return (
        <h1>ya done goofed</h1>
    )
}

export default Media