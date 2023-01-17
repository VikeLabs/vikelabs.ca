import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthContext } from "../../components/AuthContextProvider";
import DashboardWrapper from "../../components/DashboardWrapper";
import { Editable, Label, UserEditorForm } from "../../components/FormHelpers";
import { useEditUserMutation } from "../../hooks/useEditUserMutation";
import { useLoggedInUser } from "../../hooks/useLoggedInUser";
import { LoggedInUserEditForm } from "../../types";

const Divider = () => <div className="w-full h-px bg-black my-4"></div>;

const Member = () => {
  const { user, dispatch } = useAuthContext();
  const loggedInUser = useLoggedInUser(user?.id, user?.token);
  const editUserMutation = useEditUserMutation(user?.id, user?.token);
  const [isEditing, setIsEditing] = useState(false);
  const { formState, handleSubmit, control, reset } = useForm<UserEditorForm>({
    defaultValues: {
      vId: "",
      username: "",
      displayName: "",
      firstName: "",
      lastName: "",
      imageUrl: "",
      github: "",
    },
  });

  // populate form with values
  useEffect(() => {
    if (loggedInUser.data && user) {
      reset(loggedInUser.data);
    }
  }, [loggedInUser.data, reset, user]);

  const onSubmit = (data: LoggedInUserEditForm) => {
    editUserMutation.mutate(data, {
      onSuccess: (response) => {
        if (response.ok) {
          console.log("editUserMutation succeeded!");
          setIsEditing(false);
        } else {
          console.log("editUserMutation failed!");
          if (response.status === 401) {
            dispatch({ type: "logout" });
          }
        }
      },
    });
  };

  return (
    <DashboardWrapper title="Member">
      <>
        {/* TODO: PLEASE refactor the children of the conditions, it's messier than a dogpen */}
        {(loggedInUser.isLoading || !user) && <div>Loading</div>}
        {loggedInUser.data && user && (
          <div>
            <h2>Public Info</h2>
            <p className="pb-4">
              This information is publicly available on this website. (some privacy disclaimers
              maybe?)
            </p>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <Editable
                label="Username"
                control={control}
                isEditing={isEditing}
                controlName="username"
                placeholder="johnsmith123"
              />
              <Editable
                label="Display Name"
                control={control}
                isEditing={isEditing}
                controlName="displayName"
                placeholder="John Smith"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <Editable
                label="Profile Picture URL"
                control={control}
                isEditing={isEditing}
                controlName="imageUrl"
                placeholder="https://cdn.frankerfacez.com/avatar/twitch/2663092323"
              />
              <Editable
                label="Github Username"
                control={control}
                isEditing={isEditing}
                controlName="github"
                placeholder="johnSmithCantCode"
              />
            </div>

            <Divider />

            <h2>Private Info</h2>
            <p className="pb-4">
              This information will only be seen by the club executives for administration purposes.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <Editable
                label="First Name"
                control={control}
                isEditing={isEditing}
                controlName="firstName"
                placeholder="Johnathan"
              />
              <Editable
                label="Last Name"
                control={control}
                isEditing={isEditing}
                controlName="lastName"
                placeholder="Smith"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <Editable
                label="Student ID"
                control={control}
                isEditing={isEditing}
                controlName="vId"
                placeholder="01234567"
              />
              <div>
                <Label text="Club Id" />
                <p>{loggedInUser.data.id}</p>
              </div>
            </div>
            <div>
              {isEditing ? (
                <>
                  {formState.dirtyFields.displayName && (
                    <div>
                      Because you changed your <strong>Display Name</strong>, admins need to review
                      it for any inappropriate statements before allowing it
                    </div>
                  )}
                  <button
                    className="p-4 bg-red-400"
                    onClick={() => {
                      setIsEditing(false);
                      reset(loggedInUser.data);
                    }}
                  >
                    Cancel Editing
                  </button>
                  <button className="p-4 bg-green-400" onClick={handleSubmit(onSubmit)}>
                    {formState.dirtyFields.displayName ? "Submit for Approval" : "Save Changes"}
                  </button>
                </>
              ) : (
                <button className="p-4 bg-orange-400" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </button>
              )}
            </div>
            <Divider />
          </div>
        )}
        <h2>DANGER ZONE</h2>
        <div>[MOCK TOGGLE ACCORDION]</div>
        <button className="p-4 bg-red-400">Delete Account</button>
      </>
    </DashboardWrapper>
  );
};

export default Member;
