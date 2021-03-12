import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks";
import { Button, Input, Label, VerticalGrid } from "./";

const SignUp: React.FC = () => {
  const { signUp } = useAuth();
  const { handleSubmit, register } = useForm({
    defaultValues: {
      email: "",
      password: "",
      displayName: "",
    },
  });

  const onSubmit = useCallback(
    async (values: {
      email: string;
      password: string;
      displayName: string;
    }) => {
      await signUp(values.email, values.password, values.displayName);
    },
    [signUp]
  );

  return (
    <div>
      <h1>Sign Up</h1>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <VerticalGrid>
          <div>
            <Label htmlFor="displayName">Display Name</Label>
            <Input
              name="displayName"
              type="text"
              id="displayName"
              defaultValue=""
              ref={register}
            />
          </div>
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              name="email"
              type="email"
              id="email"
              defaultValue=""
              ref={register}
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              name="password"
              type="password"
              id="password"
              defaultValue=""
              ref={register}
            />
          </div>
          <div>
            <Button type="submit">Sign Up</Button>
          </div>
        </VerticalGrid>
      </form>
    </div>
  );
};

export default SignUp;
