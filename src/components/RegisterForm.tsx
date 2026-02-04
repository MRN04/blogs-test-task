"use client";

import { useState } from "react";
import { registerFormSchema, RegisterFormErrors } from "@/lib/validations";
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
import { UserPlus, Mail, Lock, Eye, EyeOff, Loader2, User } from "lucide-react";
import Link from "next/link";
import { api } from "@/lib/api";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<RegisterFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generalError, setGeneralError] = useState("");

  const validateForm = (): boolean => {
    const result = registerFormSchema.safeParse({
      name: name.trim(),
      email: email.trim(),
      password: password,
      confirmPassword: confirmPassword,
    });

    if (!result.success) {
      const fieldErrors: RegisterFormErrors = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof RegisterFormErrors;
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
      await api.register({
        name: name.trim(),
        email: email.trim(),
        password: password,
      });
      // Використовуємо window.location для повного перезавантаження
      window.location.href = "/home";
    } catch (error: any) {
      console.error("Register error:", error);
      setGeneralError(error.message || "Не вдалося створити акаунт. Спробуйте ще раз.");
      setIsSubmitting(false);
    }
  };

  const clearFieldError = (field: keyof RegisterFormErrors) => {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    if (generalError) setGeneralError("");
  };

  return (
    <Card className="w-full max-w-md border-card-border bg-card/80 backdrop-blur-sm animate-scale-in">
      <CardHeader className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 rounded-2xl bg-linear-to-br from-accent via-primary to-accent-light flex items-center justify-center shadow-lg shadow-accent/20">
          <UserPlus className="w-8 h-8 text-white" />
        </div>
        <div className="space-y-2">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Створити акаунт
          </CardTitle>
          <CardDescription className="text-text-muted">
            Приєднуйтесь до нашої спільноти
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {generalError && (
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm animate-fade-in">
              {generalError}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground">
              <User className="w-4 h-4 text-text-muted" />
              Ім&apos;я
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Ваше ім'я"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                clearFieldError("name");
              }}
              className={`bg-input-bg border-input-border h-11 ${errors.name ? "border-destructive focus-visible:ring-destructive/20" : ""
                }`}
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="text-destructive text-sm animate-fade-in">
                {errors.name}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground">
              <Mail className="w-4 h-4 text-text-muted" />
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                clearFieldError("email");
              }}
              className={`bg-input-bg border-input-border h-11 ${errors.email ? "border-destructive focus-visible:ring-destructive/20" : ""
                }`}
              disabled={isSubmitting}
            />
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
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  clearFieldError("password");
                }}
                className={`bg-input-bg border-input-border h-11 pr-12 ${errors.password ? "border-destructive focus-visible:ring-destructive/20" : ""
                  }`}
                disabled={isSubmitting}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-foreground transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-destructive text-sm animate-fade-in">
                {errors.password}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-foreground">
              <Lock className="w-4 h-4 text-text-muted" />
              Підтвердіть пароль
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  clearFieldError("confirmPassword");
                }}
                className={`bg-input-bg border-input-border h-11 pr-12 ${errors.confirmPassword ? "border-destructive focus-visible:ring-destructive/20" : ""
                  }`}
                disabled={isSubmitting}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-foreground transition-colors"
                tabIndex={-1}
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-destructive text-sm animate-fade-in">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full h-11 bg-linear-to-r from-accent to-primary hover:opacity-90 transition-opacity font-semibold text-base shadow-lg shadow-accent/25 mt-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Реєстрація...
              </>
            ) : (
              <>
                <UserPlus className="w-5 h-5" />
                Зареєструватися
              </>
            )}
          </Button>

          <p className="text-center text-xs text-text-muted mt-4">
            Реєструючись, ви погоджуєтесь з{" "}
            <Link href="#" className="text-primary hover:underline">
              Умовами використання
            </Link>{" "}
            та{" "}
            <Link href="#" className="text-primary hover:underline">
              Політикою конфіденційності
            </Link>
          </p>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-card-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-text-muted">або</span>
            </div>
          </div>

          <p className="text-center text-sm text-text-muted">
            Вже маєте акаунт?{" "}
            <Link
              href="/login"
              className="text-primary hover:text-primary-hover font-medium transition-colors hover:underline"
            >
              Увійти
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}

