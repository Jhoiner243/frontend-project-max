import { TrendingUp } from "lucide-react";

export default function TrendingAnalitics({ analiticName }) {
  return (
    <div>
      <div className="flex gap-2 font-medium leading-none">
        Trending up by 5.2% this week <TrendingUp className="h-4 w-4" />
      </div>
      <div className="leading-none text-muted-foreground">
        Top productos vendidos en la semana
      </div>
    </div>
  );
}
