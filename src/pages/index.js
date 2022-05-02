import React from "react"
import Layout from "../components/Layout/Layout"
import images from "../images/HomePagePhoto.jpg"

const Saved = () => {
  return (
    <Layout title="VikeLabs">

      <h1>VikeLabs</h1>

      <h2>What is VikeLabs?</h2>
      <span>VikeLabs is a collective of students who learn to build, deploy, and test software quickly. We view UVic as a kind of laboratory for testing solutions to problems that exist within the UVic community. We limit ourselves to the UVic community because it's much easier to deploy and test solutions to users where we are in close proximity to them and their problems. This does not mean that the problem can't also exist in the broader world, in fact, we encourage you to look for problems that have a large overlap between the UVic population and the rest of the world.</span>
      
      <h2>How does it work?</h2>
      <span>Each semester starts out with a call for ideas from our members. The VikeLabs executive team will then review new idea proposals to ensure they make sense to include under our umbrella. Each team member then has the opportunity to rank their preferred projects and state who they want to work with (so we don't break up people who joined together). The executive team, working with team leads, will then decide who goes on what team and why.</span>
      
      <div>
        <img src={images} alt=""/>
      </div>

    </Layout>
  )
}
export default Saved