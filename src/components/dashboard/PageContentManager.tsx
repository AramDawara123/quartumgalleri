import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save, Plus, Trash2, Award, Users, Heart } from "lucide-react";
import { z } from "zod";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Validation schemas
const achievementSchema = z.object({
  icon: z.enum(['award', 'users', 'heart']),
  title: z.string().trim().min(1, "Title required").max(50, "Max 50 characters"),
  description: z.string().trim().min(1, "Description required").max(200, "Max 200 characters"),
});

const teamMemberSchema = z.object({
  name: z.string().trim().min(1, "Name required").max(100, "Max 100 characters"),
  role: z.string().trim().min(1, "Role required").max(100, "Max 100 characters"),
  bio: z.string().trim().min(1, "Bio required").max(500, "Max 500 characters"),
  image: z.string().trim().url("Must be valid URL").max(500, "Max 500 characters"),
});

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
  achievements: z.array(achievementSchema).min(1, "At least 1 achievement required").max(6, "Max 6 achievements"),
  mission_text: z.string().trim().min(10, "Mission text required").max(1000, "Max 1000 characters"),
  values: z.array(z.string().trim().min(1).max(200)).min(1, "At least 1 value required").max(10, "Max 10 values"),
  team_members: z.array(teamMemberSchema).min(1, "At least 1 team member required").max(10, "Max 10 members"),
});

type PageContent = z.infer<typeof pageContentSchema>;
type Achievement = z.infer<typeof achievementSchema>;
type TeamMember = z.infer<typeof teamMemberSchema>;

const iconOptions = [
  { value: 'award', label: 'Award', Icon: Award },
  { value: 'users', label: 'Users', Icon: Users },
  { value: 'heart', label: 'Heart', Icon: Heart },
];

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
      { icon: 'award', title: '20+ Years', description: 'Of excellence in contemporary art curation' }
    ],
    mission_text: "",
    values: ["Authenticity in every piece we represent"],
    team_members: [
      { name: "", role: "", bio: "", image: "" }
    ],
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
      const additionalData = (data.additional_data as any) || {};
      setFormData({
        title: data.title,
        subtitle: data.subtitle || "",
        content: data.content,
        image_url: data.image_url || "",
        achievements: additionalData.achievements || [
          { icon: 'award' as const, title: '20+ Years', description: 'Of excellence in contemporary art curation' }
        ],
        mission_text: additionalData.mission_text || "",
        values: additionalData.values || ["Authenticity in every piece we represent"],
        team_members: additionalData.team_members || [
          { name: "Victoria Sterling", role: "Gallery Director", bio: "Leading the gallery vision", image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400" }
        ],
      });
    }
    setLoading(false);
  };

  const handleChange = (field: keyof PageContent, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  // Achievement handlers
  const addAchievement = () => {
    if (formData.achievements.length < 6) {
      handleChange('achievements', [...formData.achievements, { icon: 'award', title: '', description: '' }]);
    }
  };

  const updateAchievement = (index: number, field: keyof Achievement, value: string) => {
    const updated = [...formData.achievements];
    updated[index] = { ...updated[index], [field]: value };
    handleChange('achievements', updated);
  };

  const removeAchievement = (index: number) => {
    if (formData.achievements.length > 1) {
      handleChange('achievements', formData.achievements.filter((_, i) => i !== index));
    }
  };

  // Value handlers
  const addValue = () => {
    if (formData.values.length < 10) {
      handleChange('values', [...formData.values, '']);
    }
  };

  const updateValue = (index: number, value: string) => {
    const updated = [...formData.values];
    updated[index] = value;
    handleChange('values', updated);
  };

  const removeValue = (index: number) => {
    if (formData.values.length > 1) {
      handleChange('values', formData.values.filter((_, i) => i !== index));
    }
  };

  // Team member handlers
  const addTeamMember = () => {
    if (formData.team_members.length < 10) {
      handleChange('team_members', [...formData.team_members, { name: '', role: '', bio: '', image: '' }]);
    }
  };

  const updateTeamMember = (index: number, field: keyof TeamMember, value: string) => {
    const updated = [...formData.team_members];
    updated[index] = { ...updated[index], [field]: value };
    handleChange('team_members', updated);
  };

  const removeTeamMember = (index: number) => {
    if (formData.team_members.length > 1) {
      handleChange('team_members', formData.team_members.filter((_, i) => i !== index));
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
        additional_data: {
          achievements: formData.achievements,
          mission_text: formData.mission_text.trim(),
          values: formData.values.filter(v => v.trim()),
          team_members: formData.team_members,
        },
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="achievements">Our Impact</TabsTrigger>
          <TabsTrigger value="mission">Mission & Values</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>

        {/* Basic Info Tab */}
        <TabsContent value="basic" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Page Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
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
                {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
                <p className="text-xs text-muted-foreground">{formData.title.length}/200 characters</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subtitle">Subtitle</Label>
                <Input
                  id="subtitle"
                  value={formData.subtitle}
                  onChange={(e) => handleChange('subtitle', e.target.value)}
                  placeholder="Discover the story behind our passion for art"
                  maxLength={300}
                />
                <p className="text-xs text-muted-foreground">{formData.subtitle?.length || 0}/300 characters</p>
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
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Main Content *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => handleChange('content', e.target.value)}
                  placeholder="Enter the main story content..."
                  rows={15}
                  maxLength={10000}
                  className={errors.content ? "border-destructive" : ""}
                />
                {errors.content && <p className="text-sm text-destructive">{errors.content}</p>}
                <p className="text-xs text-muted-foreground">{formData.content.length}/10,000 characters</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Achievements Tab */}
        <TabsContent value="achievements" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Our Impact Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {formData.achievements.map((achievement, index) => (
                <Card key={index} className="border-2">
                  <CardContent className="pt-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-semibold">Achievement {index + 1}</h4>
                      {formData.achievements.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeAchievement(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Icon</Label>
                      <Select
                        value={achievement.icon}
                        onValueChange={(value) => updateAchievement(index, 'icon', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {iconOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              <div className="flex items-center gap-2">
                                <option.Icon className="h-4 w-4" />
                                {option.label}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Title *</Label>
                      <Input
                        value={achievement.title}
                        onChange={(e) => updateAchievement(index, 'title', e.target.value)}
                        placeholder="20+ Years"
                        maxLength={50}
                      />
                      <p className="text-xs text-muted-foreground">{achievement.title.length}/50</p>
                    </div>

                    <div className="space-y-2">
                      <Label>Description *</Label>
                      <Textarea
                        value={achievement.description}
                        onChange={(e) => updateAchievement(index, 'description', e.target.value)}
                        placeholder="Of excellence in contemporary art curation"
                        rows={3}
                        maxLength={200}
                      />
                      <p className="text-xs text-muted-foreground">{achievement.description.length}/200</p>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {formData.achievements.length < 6 && (
                <Button type="button" variant="outline" onClick={addAchievement} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Achievement
                </Button>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Mission & Values Tab */}
        <TabsContent value="mission" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Mission & Values Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="mission_text">Mission Statement *</Label>
                <Textarea
                  id="mission_text"
                  value={formData.mission_text}
                  onChange={(e) => handleChange('mission_text', e.target.value)}
                  placeholder="Enter your gallery's mission statement..."
                  rows={6}
                  maxLength={1000}
                  className={errors.mission_text ? "border-destructive" : ""}
                />
                {errors.mission_text && <p className="text-sm text-destructive">{errors.mission_text}</p>}
                <p className="text-xs text-muted-foreground">{formData.mission_text.length}/1,000 characters</p>
              </div>

              <Separator />

              <div className="space-y-4">
                <Label>Core Values *</Label>
                {formData.values.map((value, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={value}
                      onChange={(e) => updateValue(index, e.target.value)}
                      placeholder="Enter a core value..."
                      maxLength={200}
                    />
                    {formData.values.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeValue(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}

                {formData.values.length < 10 && (
                  <Button type="button" variant="outline" onClick={addValue} className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Value
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Team Tab */}
        <TabsContent value="team" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Meet Our Team Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {formData.team_members.map((member, index) => (
                <Card key={index} className="border-2">
                  <CardContent className="pt-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-semibold">Team Member {index + 1}</h4>
                      {formData.team_members.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeTeamMember(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Name *</Label>
                      <Input
                        value={member.name}
                        onChange={(e) => updateTeamMember(index, 'name', e.target.value)}
                        placeholder="Victoria Sterling"
                        maxLength={100}
                      />
                      <p className="text-xs text-muted-foreground">{member.name.length}/100</p>
                    </div>

                    <div className="space-y-2">
                      <Label>Role *</Label>
                      <Input
                        value={member.role}
                        onChange={(e) => updateTeamMember(index, 'role', e.target.value)}
                        placeholder="Gallery Director"
                        maxLength={100}
                      />
                      <p className="text-xs text-muted-foreground">{member.role.length}/100</p>
                    </div>

                    <div className="space-y-2">
                      <Label>Bio *</Label>
                      <Textarea
                        value={member.bio}
                        onChange={(e) => updateTeamMember(index, 'bio', e.target.value)}
                        placeholder="Brief bio about the team member..."
                        rows={4}
                        maxLength={500}
                      />
                      <p className="text-xs text-muted-foreground">{member.bio.length}/500</p>
                    </div>

                    <div className="space-y-2">
                      <Label>Image URL *</Label>
                      <Input
                        type="url"
                        value={member.image}
                        onChange={(e) => updateTeamMember(index, 'image', e.target.value)}
                        placeholder="https://example.com/photo.jpg"
                        maxLength={500}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}

              {formData.team_members.length < 10 && (
                <Button type="button" variant="outline" onClick={addTeamMember} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Team Member
                </Button>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end pt-6 border-t">
        <Button type="submit" disabled={saving} size="lg">
          {saving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save All Changes
            </>
          )}
        </Button>
      </div>
    </form>
  );
};