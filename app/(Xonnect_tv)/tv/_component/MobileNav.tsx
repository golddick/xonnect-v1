


"use client"

import { AvatarDropdownMenu } from "@/components/common_component/AvatarDropdown"
import TvSidebar from "@/app/(Xonnect_tv)/tv/_component/tv-sidebar"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { MenuIcon } from "lucide-react"
import { useRef } from "react"

export function MobileNav() {
  const sheetCloseRef = useRef<HTMLButtonElement>(null)

  // Function to close the sheet
  const handleCloseSheet = () => {
    if (sheetCloseRef.current) {
      sheetCloseRef.current.click()
    }
  }

  return (
    <Sheet>
      <div className="flex w-full px-4 py-2 justify-between items-center">
        <SheetTrigger asChild>
          <Button variant='ghost' className="p-1 border bg-red-600 text-white border-white/10">
            <MenuIcon className="w-10 h-10 text-foreground"/>
          </Button>
        </SheetTrigger>
        <AvatarDropdownMenu />
      </div>
      
      <SheetContent side="left" className=" w-[200px] bg-background text-foreground p-0">
        <SheetHeader className="p-6 border-b border-white/10">
          <SheetTitle className="text-2xl font-bold text-foreground">Xonnect TV</SheetTitle>
          <SheetDescription className="text-muted-foreground">
            Bringing the world experience to you! 
          </SheetDescription>
        </SheetHeader>
        
        <div className="flex-1 overflow-y-auto">
          {/* Pass the close function to TvSidebar */}
          <TvSidebar onItemClick={handleCloseSheet} />
        </div>
        
        {/* Hidden close button that we can trigger programmatically */}
        <SheetClose ref={sheetCloseRef} className="hidden" />
      </SheetContent>
    </Sheet>
  )
}
