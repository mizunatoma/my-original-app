import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading: boolean
  label: string
  type?: "submit" | "button";
}

export const FormButton = ({ className = "", type = "submit", loading, label, ...props }: Props) => (
  <button
    {...props}
    type={type}
    disabled={loading}
    className={`w-full text-white bg-blue-700 rounded-lg px-5 py-2.5 disabled:opacity-50 ${className}`}
  >
    {loading ? '送信中...' : label}
  </button>
);