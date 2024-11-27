
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
import { Textarea } from "../components/ui/textarea"
import RootLayout from '@/wrapper/sidebar-wrapper';

interface Role {
  id: number
  name: string
  description: string
}

const initialRoles: Role[] = [
  { id: 1, name: "Admin", description: "Full access to all features" },
  { id: 2, name: "Editor", description: "Can edit and publish content" },
  { id: 3, name: "Viewer", description: "Can view content only" },
]

const RolesPage: React.FC =() => {
  const [roles, setRoles] = useState<Role[]>(initialRoles)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingRole, setEditingRole] = useState<Role | null>(null)
  const [newRole, setNewRole] = useState<Omit<Role, 'id'>>({ name: "", description: "" })

  const handleAddRole = (e: React.FormEvent) => {
    e.preventDefault()
    setRoles([...roles, { ...newRole, id: roles.length + 1 }])
    setNewRole({ name: "", description: "" })
    setIsModalOpen(false)
  }

  const handleEditRole = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingRole) {
      setRoles(roles.map(role => role.id === editingRole.id ? editingRole : role))
      setEditingRole(null)
      setIsModalOpen(false)
    }
  }

  const handleDeleteRole = (id: number) => {
    setRoles(roles.filter(role => role.id !== id))
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
      <div className="flex justify-between w-full ml-9 md:ml-0 ">
        <h2 className="text-2xl font-semibold text-center ">Roles </h2>

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
            <TableHead>Description</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {roles.map((role) => (
            <TableRow key={role.id}>
              <TableCell>{role.name}</TableCell>
              <TableCell>{role.description}</TableCell>
              <TableCell className="flex">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mr-2"
                  onClick={() => {
                    setEditingRole(role)
                    setIsModalOpen(true)
                  }}
                >
                  <Edit/>
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => handleDeleteRole(role.id)}
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
          setEditingRole(null)
        }} 
        title={editingRole ? "Edit Role" : "Add Role"}
      >
        <form onSubmit={editingRole ? handleEditRole : handleAddRole} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={editingRole ? editingRole.name : newRole.name}
              onChange={(e) => editingRole 
                ? setEditingRole({...editingRole, name: e.target.value})
                : setNewRole({...newRole, name: e.target.value})
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={editingRole ? editingRole.description : newRole.description}
              onChange={(e) => editingRole
                ? setEditingRole({...editingRole, description: e.target.value})
                : setNewRole({...newRole, description: e.target.value})
              }
              required
            />
          </div>
          <Button type="submit" className="w-full">{editingRole ? "Update Role" : "Add Role"}</Button>
        </form>
      </Modal>
    </div>
  )
}
 const WrappedRoles = RootLayout(RolesPage);
export default WrappedRoles