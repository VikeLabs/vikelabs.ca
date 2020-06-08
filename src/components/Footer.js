import React from 'react'
import { Link } from 'gatsby'

import logo from '../img/logo.svg'
import { LinkedinOption, Instagram, FacebookOption } from "grommet-icons";

const iconStyle = {
  fill: "black",
  width: "1em",
  height: "1em"
}

const Footer = class extends React.Component {
  render() {
    return (
      <footer
        // className="footer has-background-black has-text-white-ter" 
        style={{ backgroundColor: "#FFF192" }}
      >
        <div className="content has-text-centered">
          <img
            src={logo}
            alt="VikeLabs"
            style={{ width: '14em', height: '10em' }}
          />
        </div>
        <div
          // className="content has-text-centered has-background-black has-text-white-ter"
          style={{ backgroundColor: "#222B49" }}
        >
          <div
            className="container has-text-white-ter"
          >
            <div style={{ maxWidth: '100vw' }} className="columns">
              <div className="column is-4">
                <section className="menu">
                  <ul className="menu-list">
                    <li>
                      <Link to="/" className="navbar-item">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link className="navbar-item" to="/about">
                        About
                      </Link>
                    </li>
                  </ul>
                </section>
              </div>
              <div className="column is-4">
                <section>
                  <ul className="menu-list">
                    <li>
                      <Link className="navbar-item" to="/contact">
                        Contact
                      </Link>
                    </li>
                  </ul>
                </section>
              </div>
              <div className="column is-4">
                <div className="social">
                  <a title="facebook" href="https://www.facebook.com/Vikelabs">
                    <FacebookOption
                      style={iconStyle}
                      alt="Facebook"
                    />
                  </a>
                  <a title="instagram" href="https://instagram.com/vikelabs">
                    <Instagram
                      style={iconStyle}
                      alt="Instagram"
                      />
                  </a>
                  <a title="linkedin" href="https://www.linkedin.com/company/vikelabs/">
                    <LinkedinOption
                      style={iconStyle}
                      alt="Linkedin"
                    />
                  </a>
                </div>

                <div>
                  <section>
                    <p>VikeLabs is based at the University of Victora. We acknowledge with respect the Lekwungen peoples on whose traditional territory the University of Victoria stands, and the Songhees, Esquimalt and W̱SÁNEĆ peoples whose historical relationships with the land continue to this day.</p>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer
