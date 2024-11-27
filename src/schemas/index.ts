import mongoose from "mongoose";
import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(30)
    .regex(/^[a-zA-Z0-9_]+$/, {
      message:
        "Username should only contain letters, numbers, and underscores.",
    }),
  name: z.string().min(1, { message: "Name is required." }),
  email: z.string().email({ message: "Invalid email format." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[@$!%*?&]/, {
      message:
        "Password must contain at least one special character (@$!%*?&).",
    }),
  image: z
    .any()
    .refine((file) => file instanceof File, {
      message: "Image must be a file.",
    })
    .optional(),
  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters long." }),
});

export const shippingSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  email: z.string().email({ message: "Invalid email format." }),
  phone: z
    .string()
    .regex(
      /^(?:\+?\d{1,3})?[\s.-]?\(?\d{1,4}?\)?[\s.-]?\d{1,4}[\s.-]?\d{1,4}$/,
      { message: "Invalid phone number format." }
    )
    .min(10, { message: "Phone number must be at least 10 digits." }),
  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters long." }),
  paymentMethod: z.string({ message: "Invalid payment method." }),
});

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email format." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[@$!%*?&]/, {
      message:
        "Password must contain at least one special character (@$!%*?&).",
    }),
});

export const orderStatusSchema = z.object({
  status: z
    .enum([
      "placed",
      "confirmed",
      "paid",
      "processing",
      "shipping",
      "shipped",
      "cancelled",
    ])
    .optional(),
});

export type TOrderStatus = z.infer<typeof orderStatusSchema>;

export const roleSchema = z.object({
  role: z.enum(["admin", "user"]).optional(),
});

export type TRole = z.infer<typeof roleSchema>;

export const createCategorySchema = z.object({
  name: z.string().min(1, { message: "Category name is required." }),
});

export const createProductSchema = z.object({
  name: z.string().min(1, { message: "Product name is required." }),
  description: z
    .string()
    .min(1, { message: "Product description is required." }),
  price: z
    .string()
    .refine((val) => !isNaN(parseFloat(val)), {
      message: "Price must be a valid number.",
    })
    .transform((val) => parseFloat(val))
    .refine((val) => val > 0, { message: "Price must be a positive number." }),
  stock: z
    .string()
    .refine((val) => !isNaN(parseInt(val, 10)), {
      message: "Stock must be a valid number.",
    })
    .transform((val) => parseInt(val, 10))
    .refine((val) => Number.isInteger(val), {
      message: "Stock must be an integer.",
    })
    .refine((val) => val >= 0, {
      message: "Stock must be a non-negative integer.",
    }),
  categories: z.array(
    z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
      message: "Invalid category ID format",
    })
  ),
  image: z
    .any()
    .refine((file) => file instanceof File, {
      message: "Image must be a file.",
    })
    .optional(),
});
