import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
const Contact = () => {
  const contactInfo = [{
    icon: MapPin,
    title: "Visit Our Gallery",
    details: ["123 Art District Avenue", "Cultural Quarter, Suite 100", "New York, NY 10001"]
  }, {
    icon: Phone,
    title: "Call Us",
    details: ["+1 (555) 123-4567", "+1 (555) 123-4568 (Sales)", "+1 (555) 123-4569 (Events)"]
  }, {
    icon: Mail,
    title: "Email Us",
    details: ["info@artisangallery.com", "sales@artisangallery.com", "events@artisangallery.com"]
  }, {
    icon: Clock,
    title: "Gallery Hours",
    details: ["Tuesday - Saturday: 10AM - 8PM", "Sunday: 12PM - 6PM", "Monday: Closed"]
  }];
  const socialLinks = [{
    name: "Instagram",
    handle: "@artisangallery",
    url: "#"
  }, {
    name: "Facebook",
    handle: "Artisan Gallery",
    url: "#"
  }, {
    name: "Twitter",
    handle: "@artisan_gallery",
    url: "#"
  }, {
    name: "LinkedIn",
    handle: "Artisan Gallery",
    url: "#"
  }];
  return <main className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-primary">
            Get in Touch
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We'd love to hear from you. Reach out for inquiries, private viewings, or art consultations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-serif font-bold mb-8 text-primary">
                Contact Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => <Card key={index} className="gallery-hover border border-border/50 hover:border-accent/50" style={{
                animationDelay: `${index * 0.1}s`
              }}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-accent/10 rounded-lg">
                          <info.icon className="h-6 w-6 text-accent" />
                        </div>
                        <div>
                          <h3 className="font-serif text-lg font-semibold mb-3 text-primary">
                            {info.title}
                          </h3>
                          <div className="space-y-1">
                            {info.details.map((detail, idx) => <p key={idx} className="text-muted-foreground text-sm">
                                {detail}
                              </p>)}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>)}
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-2xl font-serif font-bold mb-6 text-primary">
                Follow Our Journey
              </h3>
              <div className="space-y-3">
                {socialLinks.map((social, index) => <a key={index} href={social.url} className="flex items-center gap-4 p-4 rounded-lg border border-border/50 hover:border-accent/50 transition-colors group">
                    <div className="w-3 h-3 bg-accent rounded-full group-hover:scale-110 transition-transform" />
                    <div>
                      <span className="font-medium text-primary">{social.name}</span>
                      <span className="text-muted-foreground ml-2">{social.handle}</span>
                    </div>
                  </a>)}
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <MapPin className="h-12 w-12 mx-auto mb-4" />
                <p className="text-lg font-medium">Interactive Map</p>
                <p className="text-sm">Visit us in the heart of the arts district</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="mb-8">
                  <h2 className="text-3xl font-serif font-bold mb-4 text-primary">
                    Send us a Message
                  </h2>
                  <p className="text-muted-foreground">
                    Whether you're interested in a specific piece, want to schedule a private viewing, 
                    or need art consultation services, we're here to help.
                  </p>
                </div>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="Your first name" className="transition-all duration-300 focus:border-accent" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Your last name" className="transition-all duration-300 focus:border-accent" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="your.email@example.com" className="transition-all duration-300 focus:border-accent" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number (Optional)</Label>
                    <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" className="transition-all duration-300 focus:border-accent" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="inquiry">Type of Inquiry</Label>
                    <Select>
                      <SelectTrigger className="transition-all duration-300 focus:border-accent">
                        <SelectValue placeholder="Select inquiry type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Information</SelectItem>
                        <SelectItem value="purchase">Artwork Purchase</SelectItem>
                        <SelectItem value="consultation">Art Consultation</SelectItem>
                        <SelectItem value="private-viewing">Private Viewing</SelectItem>
                        <SelectItem value="events">Events & Exhibitions</SelectItem>
                        <SelectItem value="press">Press & Media</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Tell us about your interest, specific artworks you'd like to know more about, or any questions you have..." rows={6} className="transition-all duration-300 focus:border-accent resize-none" />
                  </div>

                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <input type="checkbox" id="newsletter" className="rounded" />
                    <label htmlFor="newsletter">
                      Subscribe to our newsletter for exclusive updates and event invitations
                    </label>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button variant="luxury" size="lg" className="flex-1">
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </Button>
                    <Button variant="elegant" size="lg" className="flex-1">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Schedule Call
                    </Button>
                  </div>
                </form>

                <div className="mt-8 p-6 elegant-gradient rounded-lg">
                  <h4 className="font-serif text-lg font-semibold mb-2 text-primary">
                    Quick Response Guarantee
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    We typically respond to inquiries within 2-4 hours during business hours. 
                    For urgent matters, please call us directly.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-20 text-center">
          <div className="luxury-gradient rounded-2xl p-8 md:p-12 text-white">
            <h2 className="text-3xl font-serif font-bold mb-6">
              Art Consultation Services
            </h2>
            <p className="text-lg mb-8 max-w-3xl mx-auto opacity-90">
              Our expert team offers personalized art consultation services for collectors, 
              interior designers, and corporate clients. From portfolio development to space-specific 
              recommendations, we help you find the perfect pieces for your vision and budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg">
                Book Consultation
              </Button>
              <Button variant="outline" size="lg" className="border-white hover:bg-white text-black">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>;
};
export default Contact;