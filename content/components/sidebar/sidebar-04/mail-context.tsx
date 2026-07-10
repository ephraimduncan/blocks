'use client';

import * as React from 'react';

export type Mail = {
  name: string;
  email: string;
  subject: string;
  date: string;
  teaser: string;
  labels?: string[];
};

type MailContextValue = {
  selectedMail: Mail | null;
  setSelectedMail: (mail: Mail | null) => void;
};

const MailContext = React.createContext<MailContextValue | undefined>(
  undefined
);

export function MailProvider({ children }: { children: React.ReactNode }) {
  const [selectedMail, setSelectedMail] = React.useState<Mail | null>(null);
  const value = React.useMemo(
    () => ({ selectedMail, setSelectedMail }),
    [selectedMail]
  );
  return <MailContext.Provider value={value}>{children}</MailContext.Provider>;
}

export function useMail() {
  const ctx = React.useContext(MailContext);
  if (!ctx) throw new Error('useMail must be used within MailProvider');
  return ctx;
}
