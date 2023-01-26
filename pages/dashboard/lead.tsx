import React from "react";
import { useAuthContext } from "../../components/AuthContextProvider";
import DashboardWrapper from "../../components/DashboardWrapper";
import Loading from "../../components/Loading";
import { useProjectEditView } from "../../hooks/useProjectEditView";

const Lead = () => {
  const { user } = useAuthContext();
  const projectEditView = useProjectEditView(user?.id, user?.token);

  return (
    <DashboardWrapper title="Team Lead">
      {projectEditView.isLoading && <Loading />}
      {projectEditView.data && (
        // TODO: Rename live/draft to just live/draft
        <div>
          <h2>Live Data</h2>
          <div>ID: {projectEditView.data.live.id}</div>
          <div>Title: {projectEditView.data.live.title}</div>
          <div>Desc: {projectEditView.data.live.description.toString()}</div>
          <div>ImageURLs: {projectEditView.data.live.imageUrls.toString()}</div>
          <div>Links: {projectEditView.data.live.links.toString()}</div>
          <div>Stack: {projectEditView.data.live.stack.toString()}</div>
          <div>UpdatedBy: {projectEditView.data.live.updatedBy}</div>
          <div>Recruiting: {projectEditView.data.live.recruiting ? "true" : "false"}</div>
          <div>RecruitingFor: {projectEditView.data.live.recruitingFor}</div>
          <br />
          <h2>Draft Data</h2>
          <div>ID: {projectEditView.data.draft.id}</div>
          <div>Title: {projectEditView.data.draft.title}</div>
          <div>Desc: {projectEditView.data.draft.description.toString()}</div>
          <div>ImageURLs: {projectEditView.data.draft.imageUrls.toString()}</div>
          <div>Links: {projectEditView.data.draft.links.toString()}</div>
          <div>Stack: {projectEditView.data.draft.stack.toString()}</div>
          <div>UpdatedBy: {projectEditView.data.draft.updatedBy}</div>
          <div>Recruiting: {projectEditView.data.draft.recruiting ? "true" : "false"}</div>
          <div>RecruitingFor: {projectEditView.data.draft.recruitingFor}</div>
        </div>
      )}
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

export default Lead;
