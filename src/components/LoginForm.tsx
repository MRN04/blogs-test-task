"use client";

import { useState } from "react";
import { loginFormSchema, LoginFormErrors } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LogIn, Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { api } from "@/lib/api";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generalError, setGeneralError] = useState("");

  const validateForm = (): boolean => {
    const result = loginFormSchema.safeParse({
      email: email.trim(),
      password: password,
    });

    if (!result.success) {
      const fieldErrors: LoginFormErrors = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof LoginFormErrors;
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError("");

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await api.login({
        email: email.trim(),
        password: password,
      });
      // Використовуємо window.location для повного перезавантаження
      window.location.href = "/home";
    } catch (error: any) {
      console.error("Login error:", error);
      setGeneralError(error.message || "Не вдалося увійти. Перевірте свої дані та спробуйте ще раз.");
      setIsSubmitting(false);
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
    if (generalError) setGeneralError("");
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
    if (generalError) setGeneralError("");
  };

  return (
    <Card className="w-full max-w-md border-card-border bg-card/80 backdrop-blur-sm animate-scale-in">
      <CardHeader className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 rounded-2xl bg-linear-to-br from-primary via-accent to-accent-light flex items-center justify-center shadow-lg shadow-primary/20">
          <LogIn className="w-8 h-8 text-white" />
        </div>
        <div className="space-y-2">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Ласкаво просимо
          </CardTitle>
          <CardDescription className="text-text-muted">
            Увійдіть до свого акаунту, щоб продовжити
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          {generalError && (
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm animate-fade-in">
              {generalError}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground">
              <Mail className="w-4 h-4 text-text-muted" />
              Email
            </Label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
                className={`bg-input-bg border-input-border h-11 pl-4 ${errors.email ? "border-destructive focus-visible:ring-destructive/20" : ""
                  }`}
                disabled={isSubmitting}
              />
            </div>
            {errors.email && (
              <p className="text-destructive text-sm animate-fade-in">
                {errors.email}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-foreground">
              <Lock className="w-4 h-4 text-text-muted" />
              Пароль
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                className={`bg-input-bg border-input-border h-11 pl-4 pr-12 ${errors.password ? "border-destructive focus-visible:ring-destructive/20" : ""
                  }`}
                disabled={isSubmitting}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-foreground transition-colors"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-destructive text-sm animate-fade-in">
                {errors.password}
              </p>
            )}
          </div>

          <div className="flex items-center justify-end">
            <Link
              href="#"
              className="text-sm text-primary hover:text-primary-hover transition-colors hover:underline"
            >
              Забули пароль?
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full h-11 bg-linear-to-r from-primary to-primary-hover hover:opacity-90 transition-opacity font-semibold text-base shadow-lg shadow-primary/25"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Вхід...
              </>
            ) : (
              <>
                <LogIn className="w-5 h-5" />
                Увійти
              </>
            )}
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-card-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-text-muted">або</span>
            </div>
          </div>

          <p className="text-center text-sm text-text-muted">
            Ще не маєте акаунту?{" "}
            <Link
              href="/register"
              className="text-accent hover:text-accent/80 font-medium transition-colors hover:underline"
            >
              Зареєструватися
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}

