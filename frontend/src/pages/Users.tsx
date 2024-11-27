import { useState } from "react"
import { Button } from "../components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table"
import { Edit, PlusCircle, Trash } from 'lucide-react'
import { Modal } from "../components/Modal"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import RootLayout from '@/wrapper/sidebar-wrapper';

interface User {
  id: number
  name: string
  email: string
  role: string
}

const initialUsers: User[] = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Editor" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Viewer" },
]

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [newUser, setNewUser] = useState<Omit<User, 'id'>>({ name: "", email: "", role: "" })

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault()
    setUsers([...users, { ...newUser, id: users.length + 1 }])
    setNewUser({ name: "", email: "", role: "" })
    setIsModalOpen(false)
  }

  const handleEditUser = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingUser) {
      setUsers(users.map(user => user.id === editingUser.id ? editingUser : user))
      setEditingUser(null)
      setIsModalOpen(false)
    }
  }

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter(user => user.id !== id))
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
      <div className="flex justify-between w-full ml-9 md:ml-0 ">
        <h2 className="text-2xl font-semibold text-center ">Users </h2>

        <Button onClick={() => setIsModalOpen(true)}>
          <PlusCircle className=" h-4 w-4" /> 
          {/* <p className="hidden">Add Permission</p> */}
        </Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell className="flex">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mr-2"
                  onClick={() => {
                    setEditingUser(user)
                    setIsModalOpen(true)
                  }}
                >
                <Edit/>
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  <Trash/>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false)
          setEditingUser(null)
        }} 
        title={editingUser ? "Edit User" : "Add User"}
      >
        <form onSubmit={editingUser ? handleEditUser : handleAddUser} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={editingUser ? editingUser.name : newUser.name}
              onChange={(e) => editingUser 
                ? setEditingUser({...editingUser, name: e.target.value})
                : setNewUser({...newUser, name: e.target.value})
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={editingUser ? editingUser.email : newUser.email}
              onChange={(e) => editingUser
                ? setEditingUser({...editingUser, email: e.target.value})
                : setNewUser({...newUser, email: e.target.value})
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="role">Role</Label>
            <Select 
              value={editingUser ? editingUser.role : newUser.role}
              onValueChange={(value) => editingUser
                ? setEditingUser({...editingUser, role: value})
                : setNewUser({...newUser, role: value})
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Editor">Editor</SelectItem>
                <SelectItem value="Viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full">{editingUser ? "Update User" : "Add User"}</Button>
        </form>
      </Modal>
    </div>
  )
}

const WrappedUsers = RootLayout(Users);
export default WrappedUsers;