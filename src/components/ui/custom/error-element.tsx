"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useRouteError } from "react-router-dom";

interface RouteError {
  statusText?: string;
  message?: string;
  status?: number;
  data?: string;
}

export default function ErrorPage() {
  const error = useRouteError() as RouteError;
  const navigate = useNavigate();
  const [isReloading, setIsReloading] = useState(false);

  // Log error for debugging
  useEffect(() => {
    console.error("Route error:", error);
  }, [error]);

  const handleReload = () => {
    setIsReloading(true);
    window.location.reload();
  };

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const getErrorMessage = () => {
    if (error?.status === 404) {
      return "The page you're looking for doesn't exist.";
    }
    if (error?.status === 403) {
      return "You don't have permission to access this page.";
    }
    if (error?.status === 500) {
      return "Internal server error. Please try again later.";
    }
    return (
      error?.statusText || error?.message || "An unexpected error occurred."
    );
  };

  const getErrorTitle = () => {
    if (error?.status === 404) {
      return "Page Not Found";
    }
    if (error?.status === 403) {
      return "Access Denied";
    }
    if (error?.status === 500) {
      return "Server Error";
    }
    return "Oops! Something went wrong";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            {getErrorTitle()}
          </CardTitle>
          <CardDescription className="text-gray-600">
            {error?.status && (
              <span className="inline-block mb-2 px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                Error {error.status}
              </span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-gray-700">{getErrorMessage()}</p>

          {process.env.NODE_ENV === "development" && error?.data && (
            <details className="mt-4 p-3 bg-gray-100 rounded-md">
              <summary className="cursor-pointer text-sm font-medium text-gray-700">
                Technical Details
              </summary>
              <pre className="mt-2 text-xs text-gray-600 whitespace-pre-wrap">
                {error.data}
              </pre>
            </details>
          )}

          <div className="flex flex-col gap-2 pt-4">
            <Button
              onClick={handleReload}
              disabled={isReloading}
              className="w-full"
            >
              {isReloading ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Reloading...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try Again
                </>
              )}
            </Button>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleGoBack}
                className="flex-1 bg-transparent"
              >
                Go Back
              </Button>
              <Button
                variant="outline"
                onClick={handleGoHome}
                className="flex-1 bg-transparent"
              >
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
