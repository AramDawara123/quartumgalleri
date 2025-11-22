import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, AlertCircle } from "lucide-react";

const CreateAdmin = () => {
  const [status, setStatus] = useState<'idle' | 'creating' | 'success' | 'error'>('idle');
  const [credentials, setCredentials] = useState<{ email: string; password: string } | null>(null);
  const { toast } = useToast();

  const createAdminUser = async () => {
    setStatus('creating');
    
    const adminEmail = "phadimubda@gmail.com";
    const adminPassword = "GalleryAdmin#2024$Secure!";

    try {
      const { data, error } = await supabase.functions.invoke('create-admin', {
        body: { email: adminEmail, password: adminPassword }
      });

      if (error) throw error;

      if (data.error) throw new Error(data.error);

      setCredentials({ email: adminEmail, password: adminPassword });
      setStatus('success');
      
      toast({
        title: "Admin Created!",
        description: "Your admin account has been created successfully.",
      });
    } catch (error: any) {
      console.error('Error creating admin:', error);
      setStatus('error');
      toast({
        title: "Error",
        description: error.message || "Failed to create admin account.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Setup Admin Account</CardTitle>
          <CardDescription>
            Create your administrator account to access the dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {status === 'idle' && (
            <Button onClick={createAdminUser} className="w-full">
              Create Admin Account
            </Button>
          )}

          {status === 'creating' && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Creating admin account...</p>
            </div>
          )}

          {status === 'success' && credentials && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-semibold">Account Created Successfully!</span>
              </div>
              
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <p className="text-sm font-semibold">Your Login Credentials:</p>
                <div className="space-y-1">
                  <p className="text-sm"><span className="font-medium">Email:</span> {credentials.email}</p>
                  <p className="text-sm"><span className="font-medium">Password:</span> {credentials.password}</p>
                </div>
              </div>

              <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 p-3 rounded-lg">
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  ⚠️ Please save these credentials securely and change your password after first login.
                </p>
              </div>

              <Button 
                onClick={() => window.location.href = '/admin-login'} 
                className="w-full"
              >
                Go to Login Page
              </Button>
            </div>
          )}

          {status === 'error' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-destructive">
                <AlertCircle className="h-5 w-5" />
                <span className="font-semibold">Failed to Create Account</span>
              </div>
              <Button onClick={createAdminUser} variant="outline" className="w-full">
                Try Again
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateAdmin;
