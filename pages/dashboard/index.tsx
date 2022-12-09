import React from "react";

// check auth only allow authorized users here

type CurrentPage = {
  role: "member" | "lead" | "admin";
};
const Dashboard = () => {
  return (
    <>
      <div>If user is admin, redirect to /dashboard/admin:</div>
      <h2>Projects</h2>
      <p>
        Panel to edit projects, make them live/draft, and order the projects
      </p>

      <div>If user is team leader, redirect to /dashboard/teams:</div>
      <h2>Your Projects</h2>
      <p>CourseUp</p>
      <p>VikeLabs.ca</p>
      <p>
        Teams the user manages here (detected by github?), with links to their
        specific dashboard page /dashboard/teams/teamName
      </p>

      <div>If user is team member, show their profile and associated info</div>
      <li>Change their display name</li>
      <li>Change their display photo</li>
      <li>Change their github url</li>

      <h2>Edit Project</h2>
      <p>
        In this page, users can see preview of their project page and enable
        editing for each section on the same page. There's also a "submit for
        approval" button to alert admins of approval request and a "Save Draft"
        button to simply save.
      </p>
      <li>Title</li>
      <li>Description</li>
      <li>
        Stack / Technologies - There's a preset list of technologies and colors,
        but the user can add a custom technology + color
      </li>
      <li>Repository link</li>
      <li>Deployment links</li>
      <li>Screenshots</li>
      <li>
        Team members - choose from a list of users in vikelabs that are
        registered on the site - can choose whether to show pfp or not - add by
        github, with their preferred name and github username
      </li>
      <p>They can also see the info</p>
      <li>Order in /projects page</li>
      <li>Preview of what the project preview on /projects page looks like</li>

      <h2>Blog</h2>
      <p>Team leaders and admins can create blogs here</p>
    </>
  );
};

export default Dashboard;
