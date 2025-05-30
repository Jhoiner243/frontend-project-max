"use client";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { useEffect, useState } from "react";
import "../../app.css";

interface DashboardCardProps {
  title: string;
  value: string | number;
  percentage: number;
  description: string;
  subtitle: string;
  type?: "currency" | "number" | "percentage";
  className?: string;
}

export function DashboardCard({
  title,
  value,
  percentage,
  description,
  subtitle,
  type = "number",
  className = "",
}: DashboardCardProps) {
  const [cardClassName, setCardClassName] = useState("");

  // Ensure percentage is a valid number
  const validPercentage =
    typeof percentage === "number" && !isNaN(percentage) ? percentage : 0;
  const isPositive = validPercentage >= 0;

  useEffect(() => {
    let baseClassName = "dashboard-card";
    if (isPositive) {
      baseClassName += " positive-growth";
    } else {
      baseClassName += " negative-growth";
    }
    setCardClassName(baseClassName);
  }, [isPositive]);

  const formatValue = (val: string | number) => {
    if (type === "currency") {
      return typeof val === "number" ? `$${val.toLocaleString()}` : val;
    }
    if (type === "percentage") {
      return typeof val === "number" ? `${val.toFixed(1)}%` : val;
    }
    return typeof val === "number" ? val.toLocaleString() : val;
  };

  const formatPercentage = (percent: number) => {
    return Math.abs(percent).toFixed(1);
  };

  return (
    <Card
      className={`
        ${cardClassName} 
        ${className} 
        @container/card 
        relative overflow-hidden
      `}
    >
      {/* Glassmorphism overlay */}

      <CardHeader className="relative z-10">
        <CardDescription className="text-muted-foreground">
          {title}
        </CardDescription>
        <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
          {formatValue(value)}
        </CardTitle>
        <div className="absolute right-4 top-4">
          <Badge
            variant="outline"
            className={`
              flex gap-1 rounded-lg text-xs backdrop-blur-sm
              ${
                isPositive
                  ? "bg-green-200/80 text-green-700 "
                  : "bg-red-100/80 text-red-700 "
              }
            `}
          >
            {isPositive ? (
              <TrendingUpIcon className="size-3" />
            ) : (
              <TrendingDownIcon className="size-3" />
            )}
            {isPositive ? "+" : "-"}
            {formatPercentage(validPercentage)}%
          </Badge>
        </div>
      </CardHeader>

      <CardFooter className="relative z-10 flex-col items-start gap-1 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">
          {description}
          {isPositive ? (
            <TrendingUpIcon className="size-4 text-green-600" />
          ) : (
            <TrendingDownIcon className="size-4 text-red-600" />
          )}
        </div>
        <div className="text-muted-foreground">{subtitle}</div>
      </CardFooter>

      {/* Decorative glassmorphism elements */}
    </Card>
  );
}
