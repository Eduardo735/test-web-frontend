// import { Card, CardContent } from "@/components/ui/card";
import { FileX, TrendingUp } from "lucide-react";
import { Card, CardContent } from "../ui/card";

export default function EmptyState() {
  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <Card className="border-dashed border-2 border-muted-foreground/25">
        <CardContent className="flex flex-col items-center justify-center py-12 px-6 text-center">
          {/* Icon and Image Container */}
          <div className="relative mb-6">
            <div className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-4 rounded-lg bg-muted/50 flex items-center justify-center">
              {/* <img
                src="/placeholder.svg?height=128&width=128"
                alt="No data available"
                className="w-16 h-16 md:w-20 md:h-20 opacity-50"
              /> */}
              <p>🐢</p>
            </div>
            {/* Decorative icons */}
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-background border rounded-full flex items-center justify-center">
              <FileX className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-background border rounded-full flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-2 max-w-md">
            <h3 className="text-lg md:text-xl font-semibold text-foreground">
              No Data Available
            </h3>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              No data to fetch. Please check back later.
            </p>
          </div>

          {/* Optional decorative elements */}
          <div className="mt-8 flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-muted-foreground/30"></div>
            <span>Data will refresh automatically</span>
            <div className="w-2 h-2 rounded-full bg-muted-foreground/30"></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
