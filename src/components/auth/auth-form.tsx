"use client";

import { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';

type AuthFormProps = {
  mode: 'login' | 'signup';
};

export function AuthForm({ mode }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [error, setError] = useState<string | null>(null); // For real error handling
  const { login, signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // setError(null);
    try {
      if (mode === 'login') {
        await login(email); // Password ignored in mock
      } else {
        await signup(email); // Password ignored in mock
      }
    } catch (err) {
      // setError((err as Error).message);
      console.error(err);
    }
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">{mode === 'login' ? 'Login to C-Wiz' : 'Sign Up for C-Wiz'}</CardTitle>
        <CardDescription>
          {mode === 'login' ? "Enter your credentials to access your music." : "Create an account to start your musical journey."}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={mode === 'signup' ? 6 : undefined} // Basic validation example
            />
          </div>
          {/* {error && <p className="text-sm text-destructive">{error}</p>} */}
        </CardContent>
        <CardFooter className="flex flex-col space-y-3">
          <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            {mode === 'login' ? 'Login' : 'Sign Up'}
          </Button>
           <p className="text-center text-sm text-muted-foreground">
            {mode === 'login' ? "Don't have an account?" : "Already have an account?"}{' '}
            <Link href={mode === 'login' ? '/signup' : '/login'} className="font-medium text-primary hover:underline">
              {mode === 'login' ? 'Sign up' : 'Login'}
            </Link>
          </p>
        </CardFooter>
      </form>
    </>
  );
}
