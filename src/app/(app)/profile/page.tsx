"use client";

import { useAuth } from "@/contexts/auth-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (!user) {
    router.push("/login"); // Should be handled by AppLayout, but good fallback
    return null;
  }

  return (
    <div className="container mx-auto max-w-2xl py-8">
      <Card>
        <CardHeader className="items-center text-center">
          <Avatar className="h-24 w-24 mb-4">
             <AvatarImage src={`https://placehold.co/96x96/151948/fcfcfc.png?text=${user.displayName?.[0] || 'U'}`} alt={user.displayName || "User"} data-ai-hint="user avatar large"/>
            <AvatarFallback className="text-4xl">{user.displayName ? user.displayName[0].toUpperCase() : "U"}</AvatarFallback>
          </Avatar>
          <CardTitle className="font-headline text-3xl">{user.displayName || "User Profile"}</CardTitle>
          <CardDescription>{user.email}</CardDescription>
        </CardHeader>
        <CardContent className="mt-4 space-y-6">
          <div>
            <h3 className="font-semibold text-lg mb-2">Account Details</h3>
            <p className="text-muted-foreground">User ID: {user.uid}</p>
          </div>
          {/* More profile details can be added here */}
          <Button onClick={logout} variant="destructive" className="w-full">
            Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
