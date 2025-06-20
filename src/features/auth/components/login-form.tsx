import { cn } from "@/lib/utils";
import { SignIn } from "@clerk/clerk-react";
import type React from "react";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div>
      <div className={cn("flex flex-col gap-6 ", className)} {...props}>
        <SignIn signUpUrl="/register" afterSignOutUrl={"/dashboard"} />
      </div>
    </div>
  );
}
