"use client"
import { Users, Home, NotebookPen, Book, LogOut } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"


export function Sidebaer() {
  const router =  useRouter();
  
  const items = [
    {
      title: "Home",
      url: "home",
      icon: Home,
    },
    {
      title: "Create Post",
      url: "/create_post",
      icon: NotebookPen,
    },
    {
      title: "Users",
      url: "users",
      icon: Users,
    },
    {
      title: "Posts",
      url: "posts",
      icon: Book,
    }
  ]

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarHeader className="flex pt-5 justify-center items-center">
          <Image src={"/Soblo-Photoroom.png"}  width={100} height={10} alt="" />
        </SidebarHeader>
        <SidebarGroup>
          {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => {
                    localStorage.removeItem("admin_sAs_admin");
                    localStorage.removeItem("token");
                    localStorage.removeItem("userId");
                    
router.refresh()
}}>
                      <LogOut />
                      <span>LogOut</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}