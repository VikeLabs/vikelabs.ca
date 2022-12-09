import React from "react";
import DashboardWrapper from "../../components/DashboardWrapper";

const member = () => {
  return (
    <DashboardWrapper title="Member">
      {/* Display inputs with these as the placeholder */}
      {/* This might just be the github display photo, or at least defaulted to it */}
      <div>Display Name</div>
      <div>Display Photo</div>
      <div>GitHub Profile URL</div>
      <div>Student ID (only visible to admins)</div>
      <div>Club ID</div>
    </DashboardWrapper>
  );
};

export default member;
