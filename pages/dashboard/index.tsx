import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ApprovalNotice from "../../components/ApprovalNotice";
import { useAuthContext } from "../../components/AuthContextProvider";
import DashboardWrapper from "../../components/DashboardWrapper";
import { Editable, Label } from "../../components/FormHelpers";
import InfoHeader from "../../components/InfoHeader";
import Loading from "../../components/Loading";
import { useEditUserMutation } from "../../hooks/useEditUserMutation";
import { useLoggedInUser } from "../../hooks/useLoggedInUser";
import { UserEditorForm } from "../../types";

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

  const onSubmit = (data: UserEditorForm) => {
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
      {/* TODO: PLEASE refactor the children of the conditions, it's messier than a dogpen */}
      {(loggedInUser.isLoading || !user) && <Loading />}
      {loggedInUser.data && user && (
        <div>
          <InfoHeader heading="Public Info">
            This information is publicly available on this website. (some privacy disclaimers
            maybe?)
          </InfoHeader>
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
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <Label text="Club Id" />
              <p>{loggedInUser.data.id}</p>
            </div>
          </div>

          <Divider />

          <InfoHeader heading="Private Info">
            This information will only be seen by the club executives for administration purposes.
          </InfoHeader>
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
          </div>
          <ApprovalNotice
            isEditing={isEditing}
            fieldNames={[
              { label: "Username", controlName: "username" },
              { label: "Display Name", controlName: "displayName" },
              { label: "Profile Picture", controlName: "imageUrl" },
              { label: "Github Username", controlName: "github" },
            ]}
            formState={formState}
            onEdit={() => setIsEditing(true)}
            onCancel={() => {
              setIsEditing(false);
              reset(loggedInUser.data);
            }}
            onSubmit={handleSubmit(onSubmit)}
          />
          <Divider />
        </div>
      )}
      <InfoHeader heading="Danger Zone">Be careful with this section!</InfoHeader>
      <button className="p-4 bg-red-400">Delete Account</button>
    </DashboardWrapper>
  );
};

export default Member;
