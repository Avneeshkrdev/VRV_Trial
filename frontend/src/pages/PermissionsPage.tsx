
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
import { Edit,  PlusCircle, Trash } from 'lucide-react'
import { Modal } from "../components/Modal"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea";
import RootLayout from "@/wrapper/sidebar-wrapper";


interface Permission {
  id: number
  name: string
  description: string
}

const initialPermissions: Permission[] = [
  { id: 1, name: "Create User", description: "Ability to create new users" },
  { id: 2, name: "Edit User", description: "Ability to edit existing users" },
  { id: 3, name: "Delete User", description: "Ability to delete users" },
  { id: 4, name: "Manage Roles", description: "Ability to manage roles" },
]

const PermissionsPage: React.FC =() => {
  const [permissions, setPermissions] = useState<Permission[]>(initialPermissions)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPermission, setEditingPermission] = useState<Permission | null>(null)
  const [newPermission, setNewPermission] = useState<Omit<Permission, 'id'>>({ name: "", description: "" })

  const handleAddPermission = (e: React.FormEvent) => {
    e.preventDefault()
    setPermissions([...permissions, { ...newPermission, id: permissions.length + 1 }])
    setNewPermission({ name: "", description: "" })
    setIsModalOpen(false)
  }

  const handleEditPermission = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingPermission) {
      setPermissions(permissions.map(permission => permission.id === editingPermission.id ? editingPermission : permission))
      setEditingPermission(null)
      setIsModalOpen(false)
    }
  }

  const handleDeletePermission = (id: number) => {
    setPermissions(permissions.filter(permission => permission.id !== id))
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex justify-between w-full ml-9 md:ml-0 ">
        <h2 className="text-2xl font-semibold text-center ">Permissions </h2>

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
          {permissions.map((permission) => (
            <TableRow key={permission.id}>
              <TableCell>{permission.name}</TableCell>
              <TableCell>{permission.description}</TableCell>
              <TableCell className="flex ">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mr-2"
                  onClick={() => {
                    setEditingPermission(permission)
                    setIsModalOpen(true)
                  }}
                >
                  <Edit/>
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => handleDeletePermission(permission.id)}
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
          setEditingPermission(null)
        }} 
        title={editingPermission ? "Edit Permission" : "Add Permission"}
      >
        <form onSubmit={editingPermission ? handleEditPermission : handleAddPermission} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
id="name"
              value={editingPermission ? editingPermission.name : newPermission.name}
              onChange={(e) => editingPermission 
                ? setEditingPermission({...editingPermission, name: e.target.value})
                : setNewPermission({...newPermission, name: e.target.value})
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={editingPermission ? editingPermission.description : newPermission.description}
              onChange={(e) => editingPermission
                ? setEditingPermission({...editingPermission, description: e.target.value})
                : setNewPermission({...newPermission, description: e.target.value})
              }
              required
            />
          </div>
          <Button type="submit" className="w-full">{editingPermission ? "Update Permission" : "Add Permission"}</Button>
        </form>
      </Modal>
    </div>
  )
}
const WrappedPermission = RootLayout(PermissionsPage)
export default  WrappedPermission