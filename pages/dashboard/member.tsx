import React, { useEffect, useState } from "react";
import { Control, Controller, useForm } from "react-hook-form";
import { useAuthContext } from "../../components/AuthContextProvider";
import DashboardWrapper from "../../components/DashboardWrapper";
import { useEditUserMutation } from "../../hooks/useEditUserMutation";
import { useLoggedInUser } from "../../hooks/useLoggedInUser";
import { supabase } from "../../supabase-client";
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
  // mock data until auth is confidently correct

  const { user, dispatch } = useAuthContext();
  const loggedInUser = useLoggedInUser(user.id);
  const editUserMutation = useEditUserMutation(user.id);
  const [isEditing, setIsEditing] = useState(false);
  let token: string;

  const { formState, handleSubmit, control, setValue, reset } =
    useForm<UserEditorForm>({
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

  useEffect(() => {
    const getToken = async () => {
      supabase.auth.getSession().then();
      const sessionResponse = await supabase.auth.getSession();
      if (sessionResponse.error) {
        throw new Error(sessionResponse.error.message);
      }
      return sessionResponse.data.session?.access_token;
    };
    getToken()
      .then((access_token: string) => {
        token = access_token;
      })
      .catch((e) => console.error(e));
  });
  // populate form with values
  useEffect(() => {
    if (loggedInUser.data && user !== "loading") {
      reset(loggedInUser.data);
    }
  }, [loggedInUser.data]);

  const onSubmit = (data: LoggedInUserEditForm) => {
    editUserMutation.mutate(
      { data, token },
      {
        onSuccess: (response) => {
          if (response.ok) {
            console.log("editUserMutation succeeded!");
            setIsEditing(false);
          } else {
            console.log("editUserMutation failed!");
          }
        },
      }
    );
  };

  return (
    <DashboardWrapper title="Member">
      <>
        {/* Display inputs with these as the placeholder */}
        {/* This might just be the github display photo, or at least defaulted to it */}
        {(loggedInUser.isLoading || user === "loading") && <div>Loading</div>}
        {loggedInUser.data && user !== "loading" && (
          <div>
            <h2>Public Info</h2>
            <p className="pb-4">
              This information is publicly available on this website. (some
              privacy disclaimers maybe?)
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
              This information will only be seen by the club executives for
              administration purposes.
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
                      Because you changed your <strong>Display Name</strong>,
                      admins need to review it for any inappropriate statements
                      before allowing it
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
                  <button
                    className="p-4 bg-green-400"
                    onClick={handleSubmit(onSubmit)}
                  >
                    {formState.dirtyFields.displayName
                      ? "Submit for Approval"
                      : "Save Changes"}
                  </button>
                </>
              ) : (
                <button
                  className="p-4 bg-orange-400"
                  onClick={() => setIsEditing(true)}
                >
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
