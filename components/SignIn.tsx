import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks";
import { Label, Input, Button, VerticalGrid } from "./";

const SignIn: React.FC = () => {
  const { signIn } = useAuth();
  const { handleSubmit, register } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = useCallback(
    (values: { email: string; password: string }) => {
      return signIn(values.email, values.password);
    },
    [signIn]
  );

  return (
    <div>
      <h1>Sign In</h1>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <VerticalGrid>
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

export default SignIn;
