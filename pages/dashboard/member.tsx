import { Button, Checkbox } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Control, Controller, useForm } from "react-hook-form";
import { useAuthContext } from "../../components/AuthContextProvider";
import DashboardWrapper from "../../components/DashboardWrapper";
import { useEditUserMutation } from "../../hooks/useEditUserMutation";
import { useLoggedInUser } from "../../hooks/useLoggedInUser";
import { GetLoggedInUserResponse, LoggedInUserEditForm } from "../../types";

type UserEditorForm = Omit<GetLoggedInUserResponse, "id" | "role">;

const Editable = ({
  label,
  controlName,
  control,
  isEditing,
  placeholder,
}: {
  label: string;
  controlName: keyof UserEditorForm;
  control: Control<UserEditorForm, any>;
  isEditing: boolean;
  placeholder?: string;
}) => (
  <div>
    <Label text={label} />
    <Controller
      control={control}
      name={controlName}
      render={({ field: { onChange, value } }) => (
        <input
          className="block w-full py-2 px-3 rounded-md border-solid border-black border-2 disabled:p-0 disabled:border-none"
          onChange={onChange}
          value={value}
          disabled={!isEditing}
          placeholder={placeholder}
        />
      )}
    />
  </div>
);

const Label = ({ text }: { text: string }) => (
  <label className="block mb-1 font-semibold">{text}</label>
);

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

  const [policyAgreement, setPolicyAgreement] = useState(false);

  // Check that policyAgreement is true
  // Send request to create account to backend
  // Backend must verify via auth token and create account with id as user ID
  // Populate other data such as email, discord, github info from token info
  const createAccount = () => {
    // While creating account, disable all interactable elements (to prevent re-clicks)
    // Do this by using a conditional on the layout for the mutation data.
    console.log("Create Account Button Clicked!");

    // If receive response "username already exists, display error."
  };

  return (
    <DashboardWrapper title="Member">
      <>
        {/* Display inputs with these as the placeholder */}
        {/* This might just be the github display photo, or at least defaulted to it */}

        {/* Please refactor the children of the conditions */}
        {/* When the loggedInUser has finished loading but the account doesnt exist, prompt to create it */}
        {!loggedInUser.isLoading && user && !loggedInUser.data && (
          <div>
            {/* Right now all that says is Log In, might wanna change that to "Access" or something. */}
            <p>
              You are currently logged in temporarily using your (Github/Discord) account. To make
              access any of this website's features, you will need to create an account. Please read
              and accept our terms / privacy etc before proceeding and clicking the create account
              button. If you decline, you will be logged out, your current session information will
              be wiped from our database and this account signup process will be aborted. TODO:
              State what information will be stored, and what information will be public. Mention
              that all info will be kept hidden from public by default.
            </p>
            <div>
              This should be a box with a scrollbar for a long terms of use policy (be careful and
              abide to GDPR)
            </div>
            <div>
              {/* Maybe user must scroll all the way down to enable checkbox? */}
              <Checkbox
                isChecked={policyAgreement}
                onChange={() => setPolicyAgreement(!policyAgreement)}
              >
                I have read and agreed to the terms
              </Checkbox>
            </div>
            <div>
              <input value={user.user_metadata.user_name} />
            </div>
            <div>
              <Button isDisabled={!policyAgreement} onClick={() => createAccount()}>
                Create Account
              </Button>
            </div>
          </div>
        )}

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
