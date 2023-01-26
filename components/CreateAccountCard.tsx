import { Button, Checkbox } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateUserMutation } from "../hooks/useCreateUserMutation";
import { CreateUserRequest } from "../types";
import { useAuthContext } from "./AuthContextProvider";
import { Editable, UserEditorForm } from "./FormHelpers";

const CreateAccountCard = () => {
  const { user } = useAuthContext();
  const { handleSubmit, control } = useForm<UserEditorForm>({
    defaultValues: {
      vId: "",
      username:
        user.app_metadata.provider === "github"
          ? user.user_metadata.user_name
          : user.user_metadata.full_name,
      displayName:
        user.app_metadata.provider === "github"
          ? user.user_metadata.full_name
          : user.user_metadata.full_name,
      firstName:
        user.app_metadata.provider === "github" ? user.user_metadata.full_name.split(" ")[0] : "",
      lastName:
        user.app_metadata.provider === "github"
          ? user.user_metadata.full_name.split(" ")[1] || ""
          : "",
      imageUrl: user.user_metadata.avatar_url,
      github: user.app_metadata.provider === "github" ? user.user_metadata.user_name : "",
      discord: user.app_metadata.provider === "discord" ? user.user_metadata.name : "",
    },
  });
  const [policyAgreement, setPolicyAgreement] = useState(false);
  const [creationInProgress, setCreationInProgress] = useState(false);
  const createUserMutation = useCreateUserMutation(user.token);

  useEffect(() => {
    // could just use createUserMutation.isLoading to check if an account is being created,
    // but the page load takes time and a user could misclick the create account button again
    // so this hook exists to create a buffer.
    if (createUserMutation.isLoading) {
      setCreationInProgress(true);
    } else {
      setTimeout(() => {
        setCreationInProgress(false);
      }, 3000);
    }
  }, [createUserMutation.isLoading]);

  const onSubmit = (data: CreateUserRequest) => {
    // Checking that user has agreed to the policy just in case (this can be removed)
    if (!policyAgreement) {
      return;
    }
    createUserMutation.mutate(data, {
      onSuccess: (response) => {
        if (response.ok) {
          console.log("createUserMutation succeeded!");
        } else {
          // TODO: We're going to code error feedback at some point.
          console.log("createUserMutation failed!");
        }
      },
    });
  };
  return (
    <div className="p-8">
      {/* Right now all that says is Log In, might wanna change that to "Access" or something. */}
      <p>
        You are currently logged in temporarily using your (Github/Discord) account. To make use of
        this website's features, you will need to create an account. Please read and accept our
        terms / privacy etc before proceeding and clicking the create account button. If you
        decline, you will be logged out, your current session information will be wiped from our
        database and this account signup process will be aborted. TODO: State what information will
        be stored, and what information will be public. Mention that all info will be kept hidden
        from public by default. Your information will only be viewed by club executives for
        administration purposes.
      </p>

      <div>
        <Editable
          label="Username"
          control={control}
          controlName="username"
          placeholder="johnsmith123"
          isEditing
        />
        <Editable
          label="Display Name"
          control={control}
          controlName="displayName"
          placeholder="JohnSmith2023"
          isEditing
        />
        <Editable
          label="First Name"
          control={control}
          controlName="firstName"
          placeholder="John"
          isEditing
        />
        <Editable
          label="Last Name"
          control={control}
          controlName="lastName"
          placeholder="Smith"
          isEditing
        />
        <Editable
          label="Student V#"
          control={control}
          controlName="vId"
          placeholder="V00123456"
          isEditing
        />
        <Editable
          label="Github Username"
          control={control}
          controlName="github"
          placeholder="johnsmith123"
          isEditing={user.app_metadata.provider !== "github"}
        />
        <Editable
          label="Discord Username"
          control={control}
          controlName="discord"
          placeholder="johnsmith#1234"
          isEditing={user.app_metadata.provider !== "discord"}
        />
      </div>
      <div className="h-40 overflow-y-scroll">
        <div>
          <h2>Terms of Service</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur auctor aliquet erat,
            a iaculis velit scelerisque quis. Etiam dolor justo, mollis ut tellus a, blandit
            tristique justo. Nam elementum, tortor eu laoreet vulputate, ligula lectus lacinia odio,
            at gravida mauris ex sit amet eros. Pellentesque ut porttitor sem. Donec rutrum, risus a
            suscipit tincidunt, orci arcu venenatis mauris, non accumsan enim odio et augue. In
            laoreet metus sit amet velit volutpat elementum et mollis purus. Mauris pellentesque,
            nisi et facilisis iaculis, velit nunc porta ante, rhoncus vulputate nulla neque ac
            justo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer malesuada
            nulla ac erat fringilla lobortis. Sed arcu lacus, lacinia quis lorem non, consectetur
            finibus dolor. Vivamus lacinia elit sit amet nisi fringilla sollicitudin. Phasellus
            tincidunt nunc id purus volutpat, at molestie est dictum. Praesent ipsum diam, rhoncus
            sit amet mattis sed, vehicula non urna. Suspendisse potenti. Cras interdum lacinia
            semper. Nulla aliquet eleifend lacus sit amet rhoncus. Maecenas egestas placerat nunc
            sit amet hendrerit. In at dictum velit. Integer dignissim ut turpis et consequat. Nam
            semper varius arcu, et sodales ante hendrerit nec. Sed dapibus vitae urna id aliquet.
            Quisque suscipit aliquet nisl, id cursus purus venenatis a. Duis lobortis purus a felis
            sagittis aliquam. Nam nec leo libero. Donec condimentum, nibh id porta interdum, turpis
            metus varius erat, et iaculis dolor orci a dolor. Integer rhoncus sed magna at rhoncus.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sollicitudin venenatis nibh,
            nec aliquam metus condimentum quis. In a urna id odio ornare dignissim eget vel turpis.
            Proin ac mauris id dui finibus semper. Nulla mollis venenatis est at iaculis. Nam non
            nisl dapibus, lobortis odio et, consequat velit. Aliquam non sem at magna elementum
            varius sit amet id elit. Fusce eu ante at magna ultrices interdum. Nunc pulvinar rhoncus
            purus, eget malesuada nisi fermentum non. Suspendisse fermentum tincidunt tortor non
            convallis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac
            turpis egestas. Curabitur molestie turpis a tincidunt blandit. Donec in malesuada dui.
            Nam sed pretium urna. Pellentesque et nisl id tellus maximus sollicitudin in vitae elit.
            Sed et eros lorem. Suspendisse potenti. Curabitur rhoncus nibh eros, ac elementum tortor
            dictum sit amet. Vestibulum semper consequat arcu, ut gravida ipsum tincidunt in. Donec
            sagittis ante feugiat varius ultricies. Etiam interdum enim eros, sit amet venenatis
            magna gravida ac. Proin iaculis ipsum ut dui scelerisque, at fringilla risus pulvinar.
            Sed facilisis quam eget consectetur consectetur. Pellentesque accumsan justo placerat
            mauris venenatis, non efficitur nisi finibus. Vivamus sed ligula euismod, tincidunt
            massa eu, aliquet massa. Morbi sem nisi, interdum eget pharetra quis, eleifend a ex.
            Vestibulum sit amet volutpat enim, at vulputate mauris. Nam eget commodo eros. Phasellus
            consequat massa quis enim auctor, in consequat neque pretium.
          </p>
          <h2>Privacy Policy</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur auctor aliquet erat,
            a iaculis velit scelerisque quis. Etiam dolor justo, mollis ut tellus a, blandit
            tristique justo. Nam elementum, tortor eu laoreet vulputate, ligula lectus lacinia odio,
            at gravida mauris ex sit amet eros. Pellentesque ut porttitor sem. Donec rutrum, risus a
            suscipit tincidunt, orci arcu venenatis mauris, non accumsan enim odio et augue. In
            laoreet metus sit amet velit volutpat elementum et mollis purus. Mauris pellentesque,
            nisi et facilisis iaculis, velit nunc porta ante, rhoncus vulputate nulla neque ac
            justo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer malesuada
            nulla ac erat fringilla lobortis. Sed arcu lacus, lacinia quis lorem non, consectetur
            finibus dolor. Vivamus lacinia elit sit amet nisi fringilla sollicitudin. Phasellus
            tincidunt nunc id purus volutpat, at molestie est dictum. Praesent ipsum diam, rhoncus
            sit amet mattis sed, vehicula non urna. Suspendisse potenti. Cras interdum lacinia
            semper. Nulla aliquet eleifend lacus sit amet rhoncus. Maecenas egestas placerat nunc
            sit amet hendrerit. In at dictum velit. Integer dignissim ut turpis et consequat. Nam
            semper varius arcu, et sodales ante hendrerit nec. Sed dapibus vitae urna id aliquet.
            Quisque suscipit aliquet nisl, id cursus purus venenatis a. Duis lobortis purus a felis
            sagittis aliquam. Nam nec leo libero. Donec condimentum, nibh id porta interdum, turpis
            metus varius erat, et iaculis dolor orci a dolor. Integer rhoncus sed magna at rhoncus.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sollicitudin venenatis nibh,
            nec aliquam metus condimentum quis. In a urna id odio ornare dignissim eget vel turpis.
            Proin ac mauris id dui finibus semper. Nulla mollis venenatis est at iaculis. Nam non
            nisl dapibus, lobortis odio et, consequat velit. Aliquam non sem at magna elementum
            varius sit amet id elit. Fusce eu ante at magna ultrices interdum. Nunc pulvinar rhoncus
            purus, eget malesuada nisi fermentum non. Suspendisse fermentum tincidunt tortor non
            convallis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac
            turpis egestas. Curabitur molestie turpis a tincidunt blandit. Donec in malesuada dui.
            Nam sed pretium urna. Pellentesque et nisl id tellus maximus sollicitudin in vitae elit.
            Sed et eros lorem. Suspendisse potenti. Curabitur rhoncus nibh eros, ac elementum tortor
            dictum sit amet. Vestibulum semper consequat arcu, ut gravida ipsum tincidunt in. Donec
            sagittis ante feugiat varius ultricies. Etiam interdum enim eros, sit amet venenatis
            magna gravida ac. Proin iaculis ipsum ut dui scelerisque, at fringilla risus pulvinar.
            Sed facilisis quam eget consectetur consectetur. Pellentesque accumsan justo placerat
            mauris venenatis, non efficitur nisi finibus. Vivamus sed ligula euismod, tincidunt
            massa eu, aliquet massa. Morbi sem nisi, interdum eget pharetra quis, eleifend a ex.
            Vestibulum sit amet volutpat enim, at vulputate mauris. Nam eget commodo eros. Phasellus
            consequat massa quis enim auctor, in consequat neque pretium.
          </p>
        </div>
      </div>
      <div>
        {/* Maybe user must scroll all the way down to enable checkbox? */}
        <Checkbox isChecked={policyAgreement} onChange={() => setPolicyAgreement(!policyAgreement)}>
          I have read and agreed to the terms
        </Checkbox>
      </div>
      <div>
        <Button
          isDisabled={!policyAgreement || creationInProgress}
          onClick={handleSubmit(onSubmit)}
        >
          Create Account
        </Button>
      </div>
    </div>
  );
};

export default CreateAccountCard;
