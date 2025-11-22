import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save } from "lucide-react";
import { z } from "zod";

// Validation schema
const pageContentSchema = z.object({
  title: z.string()
    .trim()
    .min(1, "Title is required")
    .max(200, "Title must be less than 200 characters"),
  subtitle: z.string()
    .trim()
    .max(300, "Subtitle must be less than 300 characters")
    .optional(),
  content: z.string()
    .trim()
    .min(10, "Content must be at least 10 characters")
    .max(10000, "Content must be less than 10,000 characters"),
  image_url: z.string()
    .trim()
    .url("Must be a valid URL")
    .max(500, "URL must be less than 500 characters")
    .optional()
    .or(z.literal("")),
});

type PageContent = z.infer<typeof pageContentSchema>;

export const PageContentManager = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<PageContent>({
    title: "",
    subtitle: "",
    content: "",
    image_url: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof PageContent, string>>>({});

  useEffect(() => {
    loadPageContent();
  }, []);

  const loadPageContent = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('page_content')
      .select('*')
      .eq('page_name', 'about_us')
      .single();

    if (error) {
      console.error('Error loading page content:', error);
      toast({
        title: "Error",
        description: "Failed to load page content",
        variant: "destructive",
      });
    } else if (data) {
      setFormData({
        title: data.title,
        subtitle: data.subtitle || "",
        content: data.content,
        image_url: data.image_url || "",
      });
    }
    setLoading(false);
  };

  const handleChange = (field: keyof PageContent, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    try {
      pageContentSchema.parse(formData);
      setErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof PageContent, string>> = {};
        error.errors.forEach((err) => {
          const field = err.path[0] as keyof PageContent;
          newErrors[field] = err.message;
        });
        setErrors(newErrors);
        toast({
          title: "Validation Error",
          description: "Please fix the errors in the form",
          variant: "destructive",
        });
        return;
      }
    }

    setSaving(true);
    const { error } = await supabase
      .from('page_content')
      .update({
        title: formData.title.trim(),
        subtitle: formData.subtitle?.trim() || null,
        content: formData.content.trim(),
        image_url: formData.image_url?.trim() || null,
      })
      .eq('page_name', 'about_us');

    if (error) {
      console.error('Error updating page content:', error);
      toast({
        title: "Error",
        description: "Failed to update page content",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "About Us page updated successfully",
      });
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>About Us Page Content</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Page Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="About Our Gallery"
              maxLength={200}
              className={errors.title ? "border-destructive" : ""}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title}</p>
            )}
            <p className="text-xs text-muted-foreground">
              {formData.title.length}/200 characters
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subtitle">Subtitle</Label>
            <Input
              id="subtitle"
              value={formData.subtitle}
              onChange={(e) => handleChange('subtitle', e.target.value)}
              placeholder="Discover the story behind our passion for art"
              maxLength={300}
              className={errors.subtitle ? "border-destructive" : ""}
            />
            {errors.subtitle && (
              <p className="text-sm text-destructive">{errors.subtitle}</p>
            )}
            <p className="text-xs text-muted-foreground">
              {formData.subtitle?.length || 0}/300 characters
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image_url">Hero Image URL</Label>
            <Input
              id="image_url"
              type="url"
              value={formData.image_url}
              onChange={(e) => handleChange('image_url', e.target.value)}
              placeholder="https://example.com/image.jpg"
              maxLength={500}
              className={errors.image_url ? "border-destructive" : ""}
            />
            {errors.image_url && (
              <p className="text-sm text-destructive">{errors.image_url}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Page Content *</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => handleChange('content', e.target.value)}
              placeholder="Enter the main content for the About Us page..."
              rows={15}
              maxLength={10000}
              className={errors.content ? "border-destructive" : ""}
            />
            {errors.content && (
              <p className="text-sm text-destructive">{errors.content}</p>
            )}
            <p className="text-xs text-muted-foreground">
              {formData.content.length}/10,000 characters. Supports line breaks.
            </p>
          </div>

          <Button type="submit" disabled={saving} className="w-full md:w-auto">
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};