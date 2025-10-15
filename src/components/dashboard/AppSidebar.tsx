import { NavLink, useLocation } from 'react-router-dom';
import { Palette, Users, Calendar, UserCheck, ShoppingCart, Tag } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from '@/components/ui/sidebar';

const items = [
  { title: 'All Artworks', icon: Palette, section: 'artworks' },
  { title: 'By Artist', icon: UserCheck, section: 'artist-artworks' },
  { title: 'Artists', icon: Users, section: 'artists' },
  { title: 'Events', icon: Calendar, section: 'events' },
  { title: 'Incoming Orders', icon: ShoppingCart, section: 'incoming' },
  { title: 'Discounts', icon: Tag, section: 'discounts' },
];

export function AppSidebar({ activeSection, onSectionChange }: { 
  activeSection: string; 
  onSectionChange: (section: string) => void;
}) {
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon" className="border-r border-border/50">
      <SidebarContent className="mt-4 sm:mt-8">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs sm:text-sm font-semibold px-3 py-2 text-muted-foreground/70">
            Dashboard
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-2">
            <SidebarMenu className="space-y-1 px-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.section}>
                  <SidebarMenuButton
                    onClick={() => onSectionChange(item.section)}
                    isActive={activeSection === item.section}
                    tooltip={item.title}
                    className="transition-all duration-200 hover:bg-accent/10 data-[active=true]:bg-gradient-to-r data-[active=true]:from-primary/15 data-[active=true]:via-accent/10 data-[active=true]:to-primary/5 data-[active=true]:border-l-2 data-[active=true]:border-accent rounded-md"
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    <span className="truncate">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
