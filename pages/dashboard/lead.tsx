import React from "react";
import DashboardWrapper from "../../components/DashboardWrapper";

const lead = () => {
  return (
    <DashboardWrapper title="Team Lead">
      <div>
        Your projects:
        {/* Link is /dashboard/teams/teamName */}
        {/* Each project has two edit buttons:
              1. Edit project details
              2. Edit project team members (based on the members existing in DB)
        */}
        <div>CourseUp</div>
        <div>Vikelabs.ca</div>
        <h2>Edit Project</h2>
        <li>Title</li>
        <li>Description</li>
        <li>
          Stack / Technologies - There's a preset list of technologies and colors, but the user can
          add a custom technology + color
        </li>
        <li>Repository link</li>
        <li>Deployment links</li>
        <li>Screenshots</li>
        <li>
          Team members - choose from a list of users in vikelabs that are registered on the site -
          can choose whether to show pfp or not - add by github, with their preferred name and
          github username
        </li>
        <p>They can also see the info</p>
        <li>Order in /projects page</li>
        <li>Preview of what the project preview on /projects page looks like</li>
        <p>
          In this page, users can see preview of their project page and enable editing for each
          section on the same page. There's also a "submit for approval" button to alert admins of
          approval request and a "Save Draft" button to simply save.
        </p>
      </div>
    </DashboardWrapper>
  );
};

export default lead;
