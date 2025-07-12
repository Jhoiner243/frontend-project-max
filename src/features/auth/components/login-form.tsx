import { cn } from "@/lib/utils";
import { ClerkLoading, SignIn, useOrganization } from "@clerk/clerk-react";
import React from "react";
import { Skeleton } from "../../../components/ui/skeleton";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { organization } = useOrganization();

  const path = organization?.id ? "/dashboard" : "/select-step-entity";
  return (
    <div>
      <div className={cn("flex flex-col gap-6 bg-black", className)} {...props}>
        <ClerkLoading>
          <Skeleton className="h-100 w-full bg-gray-900" />
        </ClerkLoading>
        <SignIn forceRedirectUrl={path} />
      </div>
    </div>
  );
}
