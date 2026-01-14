import type { ReactNode } from "react";

export type AuthResponse = {
  access_token: string;
};

export type AuthLayoutProps = { children: ReactNode };

export type Mode = 'login' | 'register';

export type AuthFormProps = {
  mode: Mode;
  onSubmit: (payload: { email: string; password: string }) => Promise<void>;
};
