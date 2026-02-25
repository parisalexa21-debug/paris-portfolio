import ChatWidget from "@/app/components/ChatWidget";

export const metadata = {
  title: "AI Assistant | Paris Peña",
  description: "Ask the AI assistant about Paris Peña’s portfolio",
};

export default function AIPage() {
  return (
    <section className="py-16 sm:py-20">
      <div className="card p-6 sm:p-10 dark:bg-white/5">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold tracking-tight text-black dark:text-white">
            AI Assistant
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-white/70">
            Ask about my skills, projects, education, or interests.
          </p>
        </div>

        <div className="mt-8">
          <ChatWidget />
        </div>
      </div>
    </section>
  );
}