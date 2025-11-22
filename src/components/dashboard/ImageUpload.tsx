import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Upload, Loader2, X } from "lucide-react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label: string;
  bucket?: string;
}

export const ImageUpload = ({ value, onChange, label, bucket = "page-content" }: ImageUploadProps) => {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [previewMode, setPreviewMode] = useState<"url" | "upload">("url");

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 5MB",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      onChange(publicUrl);

      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
    } catch (error: any) {
      console.error("Upload error:", error);
      toast({
        title: "Upload failed",
        description: error.message || "Failed to upload image",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      <Label>{label}</Label>
      
      <div className="flex gap-2 mb-2">
        <Button
          type="button"
          variant={previewMode === "url" ? "default" : "outline"}
          size="sm"
          onClick={() => setPreviewMode("url")}
        >
          URL
        </Button>
        <Button
          type="button"
          variant={previewMode === "upload" ? "default" : "outline"}
          size="sm"
          onClick={() => setPreviewMode("upload")}
        >
          Upload
        </Button>
      </div>

      {previewMode === "url" ? (
        <Input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://example.com/image.jpg"
          maxLength={500}
        />
      ) : (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              disabled={uploading}
              className="flex-1"
            />
            {uploading && <Loader2 className="h-4 w-4 animate-spin" />}
          </div>
          {value && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="truncate flex-1">{value}</span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => onChange("")}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      )}

      {value && (
        <div className="rounded-lg border border-border overflow-hidden">
          <img
            src={value}
            alt="Preview"
            className="w-full h-32 object-cover"
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=300&fit=crop";
            }}
          />
        </div>
      )}
    </div>
  );
};
