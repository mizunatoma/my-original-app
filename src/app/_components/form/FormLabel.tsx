import { ReactNode } from 'react';

type Props = {
  htmlFor: string    // <label>
  children: ReactNode // <FormLabel>
}

export const FormLabel = ({ htmlFor, children }: Props) => (
  <label
    htmlFor={htmlFor}
    className="block mb-2 text-sm font-medium text-gray-600 text-xs"
  >
    {children}
  </label >
)
