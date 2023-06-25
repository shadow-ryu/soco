"use client"
import {

  LogOut,
  Mail,
  MessageSquare,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";

import { Button } from "./ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/DropdownMenu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
import {  signOut } from "next-auth/react"
import Link from "next/link";

const UserNav = (session:any) => {
 const{user,ses} =session
  return (
    <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="relative h-12 w-12 rounded-full">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={user["image"] || ""}
                    alt={user["username"]|| "test"}
                  />
                  <AvatarFallback className=" bg-slate-400">
                    {user["username"]?.slice(0, 2).toUpperCase()|| "US"}

                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>

                </DropdownMenuItem>

                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                  {/* <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> */}
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Users className="mr-2 h-4 w-4" />
                  <span>My Subreddit</span>
                </DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <UserPlus className="mr-2 h-4 w-4" />
                    <span>Create</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem>
                        <Mail className="mr-2 h-4 w-4" />
                        <span>Post</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem >
                        <Link href="sr/create" className="flex justify-center items-center">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        <span>Subreddit</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />

              <DropdownMenuSeparator />
             {session
             ?<DropdownMenuItem onClick={()=>signOut()}>
             <LogOut className="mr-2 h-4 w-4" />
             <span>Log out</span>

           </DropdownMenuItem>:''}
            </DropdownMenuContent>
          </DropdownMenu>
  )
}

export default UserNav