import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useNavigate, useResolvedPath } from "react-router-dom";

interface BreadcrumbRoutes {
  routes: {
    route: string[] | string;
    name: string;
  }[];
}
export function RoutesForChildren({ routes }: BreadcrumbRoutes) {
  const navigate = useNavigate();
  const path = useResolvedPath("/");
  return (
    <>
      {routes &&
        routes.map((route, index) => {
          return (
            <Breadcrumb>
              {path.pathname === route.route ? (
                <BreadcrumbList>
                  <BreadcrumbItem key={index} className="cursor-pointer">
                    <BreadcrumbLink
                      onClick={() => navigate(route.route.toString())}
                      className="text-gray-500"
                    >
                      {route.name}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                </BreadcrumbList>
              ) : (
                <BreadcrumbList>
                  <BreadcrumbItem key={index} className="cursor-pointer">
                    <BreadcrumbLink
                      onClick={() => navigate(route.route.toString())}
                    >
                      {route.name}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                </BreadcrumbList>
              )}
            </Breadcrumb>
          );
        })}
    </>
  );
}
