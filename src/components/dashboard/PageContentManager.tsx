import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save, Plus, Trash2 } from "lucide-react";
import { z } from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageUpload } from "./ImageUpload";

const achievementSchema = z.object({
  icon: z.enum(["Award", "Users", "Heart", "Target", "Sparkles", "Globe"]),
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .max(300, "Description must be less than 300 characters"),
});

const teamMemberSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),
  role: z
    .string()
    .trim()
    .min(1, "Role is required")
    .max(100, "Role must be less than 100 characters"),
  bio: z
    .string()
    .trim()
    .min(10, "Bio must be at least 10 characters")
    .max(500, "Bio must be less than 500 characters"),
  image_url: z
    .string()
    .trim()
    .url("Must be a valid URL")
    .max(500, "URL must be less than 500 characters"),
});

// Validation schema
const pageContentSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(200, "Title must be less than 200 characters"),
  subtitle: z
    .string()
    .trim()
    .max(300, "Subtitle must be less than 300 characters")
    .optional(),
  content: z
    .string()
    .trim()
    .min(10, "Content must be at least 10 characters")
    .max(10000, "Content must be less than 10,000 characters"),
  image_url: z
    .string()
    .trim()
    .url("Must be a valid URL")
    .max(500, "URL must be less than 500 characters")
    .optional()
    .or(z.literal("")),
  achievements: z.array(achievementSchema).min(1, "Add at least one impact item"),
  mission_text: z
    .string()
    .trim()
    .min(10, "Mission must be at least 10 characters")
    .max(2000, "Mission must be less than 2,000 characters"),
  values: z
    .array(
      z
        .string()
        .trim()
        .min(1, "Value cannot be empty")
        .max(150, "Value must be less than 150 characters"),
    )
    .min(1, "Add at least one value"),
  team_members: z.array(teamMemberSchema).min(1, "Add at least one team member"),
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
    achievements: [
      { icon: "Award", title: "20+ Years", description: "Of excellence in contemporary art curation" },
      { icon: "Users", title: "500+ Artists", description: "Represented from around the globe" },
      { icon: "Heart", title: "10,000+ Collectors", description: "Trust us with their art acquisitions" },
    ],
    mission_text:
      "To discover, showcase, and celebrate contemporary art that challenges conventions, inspires dialogue, and enriches the cultural landscape.",
    values: [
      "Authenticity in every piece we represent",
      "Excellence in curation and presentation",
      "Inclusivity and accessibility in art appreciation",
      "Innovation in bridging traditional and contemporary",
    ],
    team_members: [
      {
        name: "Victoria Sterling",
        role: "Gallery Director & Curator",
        bio: "With over 15 years in contemporary art curation, Victoria has shaped the gallery's vision and established relationships with emerging and established artists worldwide.",
        image_url:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      },
      {
        name: "Marcus Chen",
        role: "Senior Art Consultant",
        bio: "Marcus brings expertise in art valuation and collection management, helping clients discover pieces that resonate with their aesthetic and investment goals.",
        image_url:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      },
      {
        name: "Isabella Rodriguez",
        role: "Education & Outreach Director",
        bio: "Isabella develops our educational programs and community partnerships, making contemporary art accessible to diverse audiences through innovative initiatives.",
        image_url:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      },
    ],
  });
  const [errors, setErrors] = useState<Partial<Record<keyof PageContent, string>>>({});

  useEffect(() => {
    loadPageContent();
  }, []);

  const loadPageContent = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("page_content")
      .select("*")
      .eq("page_name", "about_us")
      .maybeSingle();

    if (error) {
      console.error("Error loading page content:", error);
      toast({
        title: "Error",
        description: "Failed to load page content",
        variant: "destructive",
      });
    } else if (data) {
      const additionalData = (data.additional_data as any) || {};
      setFormData({
        title: data.title,
        subtitle: data.subtitle || "",
        content: data.content,
        image_url: data.image_url || "",
        achievements:
          additionalData.achievements || formData.achievements,
        mission_text:
          additionalData.mission_text || formData.mission_text,
        values: additionalData.values || formData.values,
        team_members:
          additionalData.team_members || formData.team_members,
      });
    }
    setLoading(false);
  };

  const handleChange = (field: keyof PageContent, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleAchievementChange = (
    index: number,
    field: keyof (typeof formData.achievements)[number],
    value: string,
  ) => {
    setFormData((prev) => {
      const updated = [...prev.achievements];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, achievements: updated };
    });
  };

  const addAchievement = () => {
    setFormData((prev) => ({
      ...prev,
      achievements: [
        ...prev.achievements,
        { icon: "Award", title: "New achievement", description: "Describe this impact" },
      ],
    }));
  };

  const removeAchievement = (index: number) => {
    setFormData((prev) => {
      if (prev.achievements.length === 1) return prev;
      return {
        ...prev,
        achievements: prev.achievements.filter((_, i) => i !== index),
      };
    });
  };

  const handleValueChange = (index: number, value: string) => {
    setFormData((prev) => {
      const updated = [...prev.values];
      updated[index] = value;
      return { ...prev, values: updated };
    });
  };

  const addValue = () => {
    setFormData((prev) => ({
      ...prev,
      values: [...prev.values, "New core value"],
    }));
  };

  const removeValue = (index: number) => {
    setFormData((prev) => {
      if (prev.values.length === 1) return prev;
      return {
        ...prev,
        values: prev.values.filter((_, i) => i !== index),
      };
    });
  };

  const handleTeamMemberChange = (
    index: number,
    field: keyof PageContent["team_members"][number],
    value: string,
  ) => {
    setFormData((prev) => {
      const updated = [...prev.team_members];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, team_members: updated };
    });
  };

  const addTeamMember = () => {
    setFormData((prev) => ({
      ...prev,
      team_members: [
        ...prev.team_members,
        {
          name: "New team member",
          role: "Role",
          bio: "Short biography for this team member.",
          image_url: "https://example.com/image.jpg",
        },
      ],
    }));
  };

  const removeTeamMember = (index: number) => {
    setFormData((prev) => {
      if (prev.team_members.length === 1) return prev;
      return {
        ...prev,
        team_members: prev.team_members.filter((_, i) => i !== index),
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      pageContentSchema.parse(formData);
      setErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof PageContent, string>> = {};
        error.errors.forEach((err) => {
          const field = err.path[0] as keyof PageContent;
          if (!newErrors[field]) {
            newErrors[field] = err.message;
          }
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
      .from("page_content")
      .update({
        title: formData.title.trim(),
        subtitle: formData.subtitle?.trim() || null,
        content: formData.content.trim(),
        image_url: formData.image_url?.trim() || null,
        additional_data: {
          achievements: formData.achievements,
          mission_text: formData.mission_text.trim(),
          values: formData.values.map((v) => v.trim()),
          team_members: formData.team_members,
        },
      })
      .eq("page_name", "about_us");

    if (error) {
      console.error("Error updating page content:", error);
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
          <Tabs defaultValue="basic" className="space-y-6">
            <TabsList>
              <TabsTrigger value="basic">Basic Content</TabsTrigger>
              <TabsTrigger value="impact">Our Impact</TabsTrigger>
              <TabsTrigger value="mission">Mission &amp; Values</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Page Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
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
                  onChange={(e) => handleChange("subtitle", e.target.value)}
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

              <ImageUpload
                value={formData.image_url || ""}
                onChange={(url) => handleChange("image_url", url)}
                label="Hero Image"
              />
              {errors.image_url && (
                <p className="text-sm text-destructive">{errors.image_url}</p>
              )}

              <div className="space-y-2">
                <Label htmlFor="content">Page Content *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => handleChange("content", e.target.value)}
                  placeholder="Enter the main content for the About Us page..."
                  rows={10}
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
            </TabsContent>

            <TabsContent value="impact" className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">Our Impact Cards</h3>
                <p className="text-sm text-muted-foreground">
                  Configure the statistics shown in the "Our Impact" section.
                </p>
              </div>
              <Separator />
              <div className="space-y-4">
                {formData.achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-border/60 p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Impact item {index + 1}</p>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeAchievement(index)}
                        disabled={formData.achievements.length === 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid gap-3 md:grid-cols-3">
                      <div className="space-y-1">
                        <Label>Icon</Label>
                        <Select
                          value={achievement.icon}
                          onValueChange={(value) =>
                            handleAchievementChange(index, "icon", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Choose icon" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Award">Award</SelectItem>
                            <SelectItem value="Users">Users</SelectItem>
                            <SelectItem value="Heart">Heart</SelectItem>
                            <SelectItem value="Target">Target</SelectItem>
                            <SelectItem value="Sparkles">Sparkles</SelectItem>
                            <SelectItem value="Globe">Globe</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1">
                        <Label>Title</Label>
                        <Input
                          value={achievement.title}
                          onChange={(e) =>
                            handleAchievementChange(index, "title", e.target.value)
                          }
                          maxLength={100}
                        />
                      </div>
                      <div className="space-y-1 md:col-span-1 md:col-span-1 lg:col-span-1">
                        <Label>Description</Label>
                        <Input
                          value={achievement.description}
                          onChange={(e) =>
                            handleAchievementChange(
                              index,
                              "description",
                              e.target.value,
                            )
                          }
                          maxLength={300}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button type="button" variant="outline" onClick={addAchievement}>
                <Plus className="mr-2 h-4 w-4" /> Add impact item
              </Button>
            </TabsContent>

            <TabsContent value="mission" className="space-y-6">
              <div className="space-y-2">
                <Label>Mission Text</Label>
                <Textarea
                  value={formData.mission_text}
                  onChange={(e) => handleChange("mission_text", e.target.value)}
                  rows={6}
                  maxLength={2000}
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Core Values</h3>
                  <Button type="button" variant="outline" onClick={addValue}>
                    <Plus className="mr-2 h-4 w-4" /> Add value
                  </Button>
                </div>
                <div className="space-y-3">
                  {formData.values.map((value, index) => (
                    <div key={index} className="flex gap-3 items-start">
                      <Input
                        value={value}
                        onChange={(e) =>
                          handleValueChange(index, e.target.value)
                        }
                        maxLength={150}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeValue(index)}
                        disabled={formData.values.length === 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="team" className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Team Members</h3>
                <Button type="button" variant="outline" onClick={addTeamMember}>
                  <Plus className="mr-2 h-4 w-4" /> Add team member
                </Button>
              </div>
              <div className="space-y-4">
                {formData.team_members.map((member, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-border/60 p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Team member {index + 1}</p>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeTeamMember(index)}
                        disabled={formData.team_members.length === 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid gap-3 md:grid-cols-2">
                      <div className="space-y-1">
                        <Label>Name</Label>
                        <Input
                          value={member.name}
                          onChange={(e) =>
                            handleTeamMemberChange(index, "name", e.target.value)
                          }
                          maxLength={100}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label>Role</Label>
                        <Input
                          value={member.role}
                          onChange={(e) =>
                            handleTeamMemberChange(index, "role", e.target.value)
                          }
                          maxLength={100}
                        />
                      </div>
                      <div className="space-y-1 md:col-span-2">
                        <Label>Bio</Label>
                        <Textarea
                          value={member.bio}
                          onChange={(e) =>
                            handleTeamMemberChange(index, "bio", e.target.value)
                          }
                          rows={3}
                          maxLength={500}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <ImageUpload
                          value={member.image_url}
                          onChange={(url) =>
                            handleTeamMemberChange(index, "image_url", url)
                          }
                          label="Team Member Image"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>

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
