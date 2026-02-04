import { PenLine } from "lucide-react";

export default function Footer() {
  return (
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
  );
}
