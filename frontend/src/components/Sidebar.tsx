

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Users, Shield, Key, Menu, X, User, LogOut } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

// Mock user data (replace with actual authentication in a real app)
const currentUser = {
  name: "Jane Doe",
  email: "jane@example.com",
  avatar: "https://github.com/shadcn.png", // replace with actual avatar URL
}

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => setIsOpen(!isOpen)

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </Button>
      <div className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-gray-800 text-white transform transition-transform duration-200 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0 md:pt-0 pt-16
      `}>
        <nav className="h-full flex flex-col py-6">
          <div className="px-4 mb-6">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          </div>
          <div className="flex-1 px-2 space-y-1">
            <NavItem href="/" icon={<Users size={20} />} onClick={toggleSidebar}>
              Dashboard
            </NavItem>
            <NavItem href="/users" icon={<Users size={20} />} onClick={toggleSidebar}>
              Users
            </NavItem>
            <NavItem href="/roles" icon={<Shield size={20} />} onClick={toggleSidebar}>
              Roles
            </NavItem>
            <NavItem href="/permissions" icon={<Key size={20} />} onClick={toggleSidebar}>
              Permissions
            </NavItem>
          </div>
          <Separator className="my-4" />
          <div className="px-4">
            <div className="flex items-center space-x-4 mb-2">
              <Avatar>
                <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{currentUser.name}</p>
                <p className="text-xs text-gray-400">{currentUser.email}</p>
              </div>
            </div>
            <Button variant="ghost" className="w-full justify-start" onClick={() => console.log("Profile clicked")}>
              <User className="mr-2 h-4 w-4" />
              Profile
            </Button>
            <Button variant="ghost" className="w-full justify-start text-red-400" onClick={() => console.log("Logout clicked")}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </nav>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  )
}

interface NavItemProps {
  href: string
  icon: React.ReactNode
  children: React.ReactNode
  onClick: () => void
}

const NavItem: React.FC<NavItemProps> = ({ href, icon, children, onClick }) => (
  <Link
    to={href}
    className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition-colors duration-200"
    onClick={onClick}
  >
    {icon}
    <span className="ml-3">{children}</span>
  </Link>
)

export default Sidebar

