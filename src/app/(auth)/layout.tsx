import { Music2 } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="mb-8 flex items-center space-x-2 text-primary">
        <Music2 className="h-10 w-10" />
        <h1 className="font-headline text-4xl font-bold">C-Wiz</h1>
      </div>
      <div className="w-full max-w-md rounded-lg border bg-card p-6 shadow-lg">
        {children}
      </div>
    </div>
  );
}
