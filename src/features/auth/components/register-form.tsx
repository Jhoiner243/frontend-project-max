import { SignUp } from "@clerk/clerk-react";

export function Register() {
  return (
    <div>
      <form>
        <SignUp />
      </form>
    </div>
  );
}
