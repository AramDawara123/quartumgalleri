import { NavLink, useLocation } from 'react-router-dom';
import { Palette, Users, Calendar, UserCheck, Package } from 'lucide-react';
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
  { title: 'Alle Kunstwerken', icon: Palette, section: 'artworks' },
  { title: 'Per Kunstenaar', icon: UserCheck, section: 'artist-artworks' },
  { title: 'Kunstenaars', icon: Users, section: 'artists' },
  { title: 'Evenementen', icon: Calendar, section: 'events' },
  { title: 'Inkomende Producten', icon: Package, section: 'incoming' },
];

export function AppSidebar({ activeSection, onSectionChange }: { 
  activeSection: string; 
  onSectionChange: (section: string) => void;
}) {
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
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
