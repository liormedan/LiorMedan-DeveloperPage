"use client"

import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function TestSidebarPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-mr-1" />
            <Separator
              orientation="vertical"
              className="ml-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    הפורטפוליו שלי
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>בדיקת סיידבר</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl flex items-center justify-center">
              <h3 className="text-lg font-semibold">פרויקט 1</h3>
            </div>
            <div className="bg-muted/50 aspect-video rounded-xl flex items-center justify-center">
              <h3 className="text-lg font-semibold">פרויקט 2</h3>
            </div>
            <div className="bg-muted/50 aspect-video rounded-xl flex items-center justify-center">
              <h3 className="text-lg font-semibold">פרויקט 3</h3>
            </div>
          </div>
          <div className="bg-muted/50 min-h-[60vh] flex-1 rounded-xl md:min-h-min flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">ברוכים הבאים לפורטפוליו שלי</h2>
              <p className="text-muted-foreground">
                זהו סיידבר מותאם לעברית עם יישור לימין וצבעים מותאמים
              </p>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}