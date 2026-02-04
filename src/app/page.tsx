import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PenLine, LogIn, UserPlus, BookOpen, Users, Sparkles } from "lucide-react";

export default function WelcomePage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row relative overflow-hidden bg-background">
      {/* Left side - Branding */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-16 relative">
        {/* Background decorations */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/15 rounded-full blur-3xl" />
        </div>

        <div className="text-center lg:text-left max-w-lg">
          {/* Logo */}
          <div className="inline-flex items-center justify-center w-24 h-24 lg:w-64 lg:h-64 rounded-3xl bg-linear-to-br from-primary via-accent to-accent-light shadow-2xl shadow-primary/30 mb-8 animate-scale-in">
            <PenLine className="w-12 h-12 lg:w-32 lg:h-32 text-white" />
          </div>
        </div>
      </div>

      {/* Right side - Auth options */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-16">
        <div className="w-full max-w-md space-y-8 animate-fade-in">
          {/* Heading */}
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Будьте в курсі
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-accent">
                всіх подій
              </span>
            </h1>
            <p className="text-xl text-text-muted">
              Приєднуйтесь до спільноти сьогодні.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-3 py-4">
            <div className="flex items-center gap-3 text-text-muted">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <span>Читайте цікаві публікації</span>
            </div>
            <div className="flex items-center gap-3 text-text-muted">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-accent" />
              </div>
              <span>Спілкуйтесь з авторами</span>
            </div>
            <div className="flex items-center gap-3 text-text-muted">
              <div className="w-10 h-10 rounded-xl bg-accent-light/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-accent-light" />
              </div>
              <span>Діліться власними ідеями</span>
            </div>
          </div>

          {/* Divider with text */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-card-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-background px-4 text-text-muted">Почніть зараз</span>
            </div>
          </div>

          {/* Auth buttons */}
          <div className="space-y-4">
            <Button
              asChild
              className="w-full h-12 bg-linear-to-r from-accent to-primary hover:opacity-90 transition-opacity font-semibold text-base shadow-lg shadow-accent/25"
            >
              <Link href="/register">
                <UserPlus className="w-5 h-5" />
                Зареєструватися
              </Link>
            </Button>

            <p className="text-xs text-center text-text-muted px-4">
              Реєструючись, ви погоджуєтесь з{" "}
              <Link href="#" className="text-primary hover:underline">
                Умовами використання
              </Link>{" "}
              та{" "}
              <Link href="#" className="text-primary hover:underline">
                Політикою конфіденційності
              </Link>
            </p>
          </div>

          {/* Login section */}
          <div className="space-y-4 pt-4">
            <p className="text-text-muted font-medium">Вже маєте акаунт?</p>
            <Button
              asChild
              className="w-full h-12 bg-linear-to-r from-primary to-primary-hover hover:opacity-90 transition-opacity font-semibold text-base shadow-lg shadow-primary/25"
            >
              <Link href="/login">
                <LogIn className="w-5 h-5" />
                Увійти
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

