import { Header, PostForm, PostDetail, PostsSection } from "@/components";
import { PenLine } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-6xl mx-auto px-6 py-8">
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Останні публікації</h2>
            </div>
          </div>

          <PostsSection />
        </section>
      </main>

      {/* Modals */}
      <PostForm />
      <PostDetail />

      {/* Footer */}
      <footer className="border-t border-border mt-16">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-linear-to-br from-primary to-accent flex items-center justify-center">
                <PenLine className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold">Блог</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 Блог. Створено з ❤️ та Next.js
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
