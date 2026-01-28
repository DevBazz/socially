import { Loader2 } from "lucide-react";

interface LoadingPageProps {
  title?: string;
  description?: string;
}

export function LoadingPage({ 
  title = "Loading", 
  description = "Please wait while we fetch your content..." 
}: LoadingPageProps) {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-6 text-center">
        {/* Animated Spinner */}
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-linear-to-r from-blue-500/20 to-purple-500/20 animate-pulse" />
          <Loader2 className="h-16 w-16 text-blue-500 animate-spin relative z-10" />
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">{title}</h2>
          <p className="text-muted-foreground text-sm max-w-md">
            {description}
          </p>
        </div>

        {/* Loading Dots Animation */}
        <div className="flex gap-1.5">
          <div className="h-2 w-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "0s" }} />
          <div className="h-2 w-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: "0.2s" }} />
          <div className="h-2 w-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "0.4s" }} />
        </div>
      </div>
    </div>
  );
}
