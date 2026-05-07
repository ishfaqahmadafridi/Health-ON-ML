import type { FC, ReactNode } from 'react';

interface FormLayoutProps {
  children: ReactNode;
}

export const FormLayout: FC<FormLayoutProps> = ({ children }) => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto w-full pb-20">
      {children}
    </div>
  );
};
