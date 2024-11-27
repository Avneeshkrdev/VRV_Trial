
import { useState } from 'react'
import { Users, Shield, Key, Menu, X } from 'lucide-react'
import { Button } from "../components/ui/button"
import { Link } from 'react-router-dom'

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => setIsOpen(!isOpen)

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50  md:hidden mt-16 "
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </Button>
      <div className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-gray-800 text-white transform transition-transform duration-200 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0 md:pt-0 pt-32
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

