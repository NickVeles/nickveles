"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff, Lock } from "lucide-react";
import Section from "../utils/section";
import { toast } from "sonner";
import Loading from "@/app/loading";

interface PasswordProtectedPageProps {
  children: React.ReactNode;
}

const STORAGE_KEY = "password_protected_auth";

export default function PasswordProtected({
  children,
}: PasswordProtectedPageProps) {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Check for stored authentication on component mount
  useEffect(() => {
    const checkStoredAuth = async () => {
      try {
        const storedPassword = localStorage.getItem(STORAGE_KEY);
        if (storedPassword) {
          // Verify the stored password is still valid
          const response = await fetch("/api/auth/verify-password", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ password: storedPassword }),
          });

          const data = await response.json();
          if (data.success) {
            setIsAuthenticated(true);
          } else {
            // Remove invalid stored password
            localStorage.removeItem(STORAGE_KEY);
          }
        }
      } catch (error) {
        console.error("Error checking stored authentication:", error);
        localStorage.removeItem(STORAGE_KEY);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkStoredAuth();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/verify-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (data.success) {
        // Store the password in localStorage
        localStorage.setItem(STORAGE_KEY, password);
        setIsAuthenticated(true);
        toast.success("Access granted!", { duration: 2000 });
      } else {
        toast.error("Incorrect password. Please try again.", {
          duration: 2000,
        });
        setPassword("");
      }
    } catch (error) {
      toast.error(`${error}`, { duration: 2000 });
      console.error("Failed to authenticate: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading while checking stored authentication
  if (isCheckingAuth) {
    return (
      <Section id="password-protected" className="flex items-center">
        <div className="w-full max-w-md flex justify-center">
          <Loading className="size-8" />
        </div>
      </Section>
    );
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <Section id="password-protected" className="flex items-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto size-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Lock className="size-6 text-primary" />
          </div>
          <CardTitle>Protected Profile</CardTitle>
          <CardDescription>
            Please enter the password to access this content.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  disabled={isLoading}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={!password.trim() || isLoading}
            >
              {isLoading ? <Loading className="size-6" /> : "Access Content"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Section>
  );
}
