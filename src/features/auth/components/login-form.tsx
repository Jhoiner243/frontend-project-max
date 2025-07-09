import { cn } from "@/lib/utils";
import {
  ClerkLoading,
  SignIn,
  useAuth,
  useOrganization,
} from "@clerk/clerk-react";
import React from "react";
import { Skeleton } from "../../../components/ui/skeleton";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { sessionId, orgId } = useAuth();
  const { isLoaded: isOrgLoaded } = useOrganization();

  // Redirección basada en el estado cargado
  const redirectUrl =
    isOrgLoaded && sessionId
      ? orgId
        ? "/dashboard"
        : "/registro-entidad"
      : undefined;

  return (
    <div>
      <div className={cn("flex flex-col gap-6 bg-black", className)} {...props}>
        <ClerkLoading>
          <Skeleton className="h-100 w-full bg-gray-900" />
        </ClerkLoading>
        <SignIn forceRedirectUrl={redirectUrl} afterSignOutUrl={redirectUrl} />
      </div>
    </div>
  );
}
