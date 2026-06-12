import React from 'react'
import { MobileNav } from './MobileNav'
import { AvatarDropdownMenu } from '@/components/common_component/AvatarDropdown'

const Header = () => {
  return (
    <div className=' w-full bg-transparent backdrop-blur-sm sticky p-4 top-0 z-50 justify-between gap-6 lg:hidden flex px-4 py-2 items-center'>
        <MobileNav/>
        <AvatarDropdownMenu/>
    </div>
  )
}

export default Header
