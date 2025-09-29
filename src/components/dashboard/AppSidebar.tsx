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
    <Sidebar collapsible="icon">
      <SidebarContent className="mt-4">
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.section}>
                  <SidebarMenuButton
                    onClick={() => onSectionChange(item.section)}
                    isActive={activeSection === item.section}
                    tooltip={item.title}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
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
