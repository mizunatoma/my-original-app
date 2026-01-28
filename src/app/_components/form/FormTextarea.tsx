import { TextareaHTMLAttributes } from "react";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  loading?: boolean;
};

export const FormTextarea = ({ loading, className = "", ...props }: Props) => (
  <textarea
    {...props}
    disabled={loading}
    className={`block w-full border border-gray-300 rounded-md p-2 disabled:opacity-50 ${className}`}
  />
);
