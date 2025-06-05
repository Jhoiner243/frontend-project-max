"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function ChartAreaSkeleton() {
  return (
    <Card className="@container/card">
      <CardHeader className="relative">
        <CardTitle>
          <Skeleton className="h-7 w-44 bg-muted/60" />
        </CardTitle>
        <CardDescription className="mt-2">
          <Skeleton className="h-4 w-72 bg-muted/40" />
        </CardDescription>
        <div className="absolute right-4 top-4">
          {/* Desktop toggle group */}
          <div className="@[767px]/card:flex hidden gap-1 rounded-md border border-border/40 p-1 bg-muted/20">
            {["Diario", "Semanal", "Mensual", "Anual"].map((period, index) => (
              <div
                key={period}
                className={cn(
                  "h-8 px-3 rounded-sm flex items-center justify-center",
                  index === 0
                    ? "bg-background shadow-sm border border-border/50"
                    : "bg-transparent"
                )}
              >
                <Skeleton
                  className={cn(
                    "h-3",
                    period === "Diario"
                      ? "w-10"
                      : period === "Semanal"
                      ? "w-14"
                      : period === "Mensual"
                      ? "w-14"
                      : "w-10",
                    index === 0 ? "bg-foreground/20" : "bg-muted/60"
                  )}
                />
              </div>
            ))}
          </div>

          {/* Mobile select */}
          <div className="@[767px]/card:hidden flex">
            <div className="w-40 h-9 rounded-md border border-border/40 bg-background/50 flex items-center px-3">
              <Skeleton className="h-4 w-16 bg-muted/60" />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <div className="aspect-auto h-[250px] w-full">
          {/* Chart container */}
          <div className="relative h-full w-full rounded-lg bg-card/50 border border-border/20 overflow-hidden">
            {/* Background grid pattern */}
            <div className="absolute inset-0 opacity-30">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern
                    id="grid"
                    width="40"
                    height="40"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 40 0 L 0 0 0 40"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="0.5"
                      className="text-muted-foreground/20"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {/* Y-axis area */}
            <div className="absolute left-0 top-0 w-16 h-full flex flex-col justify-between py-6 pr-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex justify-end">
                  <Skeleton className="h-3 w-12 bg-muted/50" />
                </div>
              ))}
            </div>

            {/* Main chart area */}
            <div className="ml-16 mr-4 h-full relative">
              {/* Horizontal grid lines */}
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-full border-t border-border/30"
                  style={{ top: `${(i + 1) * 16.67}%` }}
                />
              ))}

              {/* Area chart simulation */}
              <div className="absolute bottom-12 left-0 right-0 h-32">
                {/* Gradient area fill */}
                <div className="relative h-full w-full">
                  <svg
                    className="w-full h-full"
                    viewBox="0 0 400 128"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient
                        id="areaGradient"
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          stopColor="hsl(var(--primary))"
                          stopOpacity="0.3"
                        />
                        <stop
                          offset="100%"
                          stopColor="hsl(var(--primary))"
                          stopOpacity="0.05"
                        />
                      </linearGradient>
                      <linearGradient
                        id="shimmer"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="transparent" />
                        <stop
                          offset="50%"
                          stopColor="hsl(var(--primary))"
                          stopOpacity="0.1"
                        />
                        <stop offset="100%" stopColor="transparent" />
                        <animateTransform
                          attributeName="gradientTransform"
                          type="translate"
                          values="-100 0;400 0;-100 0"
                          dur="2s"
                          repeatCount="indefinite"
                        />
                      </linearGradient>
                    </defs>

                    {/* Area path */}
                    <path
                      d="M0,100 Q50,60 100,70 T200,50 T300,65 T400,45 L400,128 L0,128 Z"
                      fill="url(#areaGradient)"
                      className="animate-pulse"
                    />

                    {/* Shimmer overlay */}
                    <rect width="100%" height="100%" fill="url(#shimmer)" />

                    {/* Area stroke */}
                    <path
                      d="M0,100 Q50,60 100,70 T200,50 T300,65 T400,45"
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="2"
                      className="opacity-60"
                    />
                  </svg>
                </div>

                {/* Data points */}
                <div className="absolute inset-0 flex items-end justify-between px-2">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div
                        className="w-2 h-2 rounded-full bg-primary/60 animate-pulse"
                        style={{ animationDelay: `${i * 0.1}s` }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* X-axis labels */}
              <div className="absolute bottom-2 left-0 right-0 flex justify-between px-2">
                {Array.from({ length: 8 }).map((_, i) => (
                  <Skeleton
                    key={i}
                    className="h-3 w-8 bg-muted/50"
                    style={{ animationDelay: `${i * 0.05}s` }}
                  />
                ))}
              </div>
            </div>

            {/* Loading shimmer overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background/10 to-transparent animate-shimmer" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
