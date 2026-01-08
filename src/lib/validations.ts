import { z } from "zod";

export const postFormSchema = z.object({
  author: z
    .string()
    .min(3, "Ім'я автора має містити мінімум 3 символи")
    .max(15, "Ім'я автора не може перевищувати 15 символів"),
  title: z
    .string()
    .min(5, "Заголовок має містити мінімум 5 символів")
    .max(50, "Заголовок не може перевищувати 100 символів"),
  content: z
    .string()
    .min(10, "Контент має містити мінімум 10 символів")
    .max(5000, "Контент не може перевищувати 5000 символів"),
  tagsInput: z.string().optional(),
});

export type PostFormData = z.infer<typeof postFormSchema>;

export type PostFormErrors = Partial<Record<keyof PostFormData, string>>;
