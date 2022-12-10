import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import DashboardWrapper from "../../components/DashboardWrapper";
import { useLoggedInUser } from "../../hooks/useLoggedInUser";
import { LoggedInUserEditForm } from "../../types";

const member = () => {
  // mock data until auth is confidently correct
  const mock = {
    userId: "clbhseq990000pjmt5jrtkmu1",
  };

  const user = useLoggedInUser(mock.userId);

  const { formState, handleSubmit, control, setValue, reset } = useForm({
    defaultValues: {
      vId: "",
      username: "",
      displayName: "",
      firstName: "",
      lastName: "",
      imageUrl: "",
      github: "",
      role: "",
    },
  });

  // populate form with values
  useEffect(() => {
    // TODO: Do this with a loop instead with user.data?.["vId"]
    if (user.data) {
      reset(user.data);
    }
    console.log("User data: ", user.data);
  }, [user.data]);

  const [isEditing, setIsEditing] = useState(false);

  const onSubmit = (data: LoggedInUserEditForm) => {
    console.log("Submmited at member edit page", data);
  };

  return (
    <DashboardWrapper title="Member">
      <>
        <div>
          [MOCK CHECKMARK] Changes made to the starred (*) fields will reflect
          publicly on this site
        </div>
        {/* Display inputs with these as the placeholder */}
        {/* This might just be the github display photo, or at least defaulted to it */}
        {user.isLoading && <div>Loading</div>}
        {user.data && (
          <>
            {isEditing ? (
              <div>
                <Controller
                  control={control}
                  name="firstName"
                  render={({ field: { onChange, value } }) => (
                    <input
                      onChange={onChange}
                      value={value}
                      placeholder="First Name"
                    />
                  )}
                />

                {/* TODO: need approval if they edited fields that are publicly visible */}
                {/* formState.dirtyFields.displayName ? approval button : save changes */}
                {formState.dirtyFields.displayName && (
                  <div>
                    Because you changed your <strong>Display Name</strong>,
                    admins need to review it for any inappropriate statements
                    before allowing it
                  </div>
                )}
                <button
                  className="p-4 bg-green-400"
                  onClick={handleSubmit(onSubmit)}
                >
                  {formState.dirtyFields.displayName
                    ? "Submit for Approval"
                    : "Save Changes"}
                </button>
              </div>
            ) : (
              <div>
                <div>First Name: {user.data.firstName}</div>
                <div>Last Name: {user.data.lastName}</div>
                <div>User Name: user.data.username</div>
                <div>Display Photo URL: {user.data.imageUrl}</div>
                <div>
                  GitHub Profile URL: https://github.com/{user.data.github}
                </div>
                <div>Student ID (only visible to admins): V{user.data.vId}</div>
                <div>Club ID (cannot be edited): {user.data.id}</div>
                <div>Role: user.data.role</div>
                {/* disabled is based on isEditing */}

                <button
                  className="p-4 bg-orange-400"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
              </div>
            )}
          </>
        )}
        <h2>DANGER ZONE</h2>
        <div>[MOCK TOGGLE ACCORDION]</div>
        <button className="p-4 bg-red-400">Delete Account</button>
      </>
    </DashboardWrapper>
  );
};

export default member;
