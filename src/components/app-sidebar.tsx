"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// נתונים לדוגמה בעברית
const data = {
  user: {
    name: "ליאור מדן",
    email: "lior@example.com",
    avatar: "/avatars/lior.jpg",
  },
  teams: [
    {
      name: "הפורטפוליו שלי",
      logo: GalleryVerticalEnd,
      plan: "מקצועי",
    },
    {
      name: "פרויקטים אישיים",
      logo: AudioWaveform,
      plan: "בסיסי",
    },
    {
      name: "עבודות צד",
      logo: Command,
      plan: "חינם",
    },
  ],
  navMain: [
    {
      title: "דף הבית",
      url: "/",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "היסטוריה",
          url: "#",
        },
        {
          title: "מועדפים",
          url: "#",
        },
        {
          title: "הגדרות",
          url: "#",
        },
      ],
    },
    {
      title: "פרויקטים",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "פרויקט ראשון",
          url: "#",
        },
        {
          title: "פרויקט שני",
          url: "#",
        },
        {
          title: "פרויקט שלישי",
          url: "#",
        },
      ],
    },
    {
      title: "אודות",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "הקדמה",
          url: "#",
        },
        {
          title: "התחלה מהירה",
          url: "#",
        },
        {
          title: "מדריכים",
          url: "#",
        },
        {
          title: "עדכונים",
          url: "#",
        },
      ],
    },
    {
      title: "הגדרות",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "כללי",
          url: "#",
        },
        {
          title: "צוות",
          url: "#",
        },
        {
          title: "חיוב",
          url: "#",
        },
        {
          title: "מגבלות",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "עיצוב ופיתוח",
      url: "#",
      icon: Frame,
    },
    {
      name: "מכירות ושיווק",
      url: "#",
      icon: PieChart,
    },
    {
      name: "נסיעות",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" side="right" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
