import { z } from "zod";

export const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, "Email є обов'язковим")
    .email("Введіть коректну email адресу"),
  password: z
    .string()
    .min(6, "Пароль має містити мінімум 6 символів")
    .max(50, "Пароль не може перевищувати 50 символів"),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;
export type LoginFormErrors = Partial<Record<keyof LoginFormData, string>>;

export const registerFormSchema = z
  .object({
    name: z
      .string()
      .min(2, "Ім'я має містити мінімум 2 символи")
      .max(30, "Ім'я не може перевищувати 30 символів"),
    email: z
      .string()
      .min(1, "Email є обов'язковим")
      .email("Введіть коректну email адресу"),
    password: z
      .string()
      .min(6, "Пароль має містити мінімум 6 символів")
      .max(50, "Пароль не може перевищувати 50 символів"),
    confirmPassword: z.string().min(1, "Підтвердіть пароль"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Паролі не співпадають",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerFormSchema>;
export type RegisterFormErrors = Partial<
  Record<keyof RegisterFormData, string>
>;

export const postFormSchema = z.object({
  title: z
    .string()
    .min(5, "Заголовок має містити мінімум 5 символів")
    .max(100, "Заголовок не може перевищувати 100 символів"),
  content: z
    .string()
    .min(10, "Контент має містити мінімум 10 символів")
    .max(5000, "Контент не може перевищувати 5000 символів"),
  tagsInput: z.string().optional(),
});

export type PostFormData = z.infer<typeof postFormSchema>;

export type PostFormErrors = Partial<Record<keyof PostFormData, string>>;
