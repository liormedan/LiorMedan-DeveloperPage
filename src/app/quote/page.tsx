import HeroSpline from "@/components/HeroSpline";
import AssistantPrompt from "@/components/AssistantPrompt";
import ChatAssist from "@/components/ChatAssist";
import ConversationBackdrop from "@/components/ConversationBackdrop";

export default function QuotePage() {
  return (
    <div className="relative overflow-hidden min-h-[560px] sm:min-h-[680px] flex items-center">
      {/* Spline scene as background with in-scene labels */}
      <HeroSpline lockBlueTheme />
      {/* Readability overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/30 via-background/20 to-background/30 dark:from-background/40 dark:via-background/25 dark:to-background/40" />
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(ellipse_at_center,rgba(2,6,23,0.55),transparent_60%)] dark:[background:radial-gradient(ellipse_at_center,rgba(2,6,23,0.65),transparent_62%)]" />
      <div className="container-fluid relative z-10 py-10">
        {/* Local animated background just for the conversation panels */}
        <div className="relative rounded-3xl overflow-hidden px-0 sm:px-4 py-6">
          <ConversationBackdrop />
          <div className="space-y-8 relative">
            <AssistantPrompt />
            <ChatAssist />
          </div>
        </div>
      </div>
    </div>
  );
}
