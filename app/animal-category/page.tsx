'use client'

import { useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { PencilIcon, TrashIcon, PlusIcon } from 'lucide-react'

// Mock data for demonstration
const initialAnimalCategories = [
  {
    a_c_id: '1',
    animal_name: 'Elephant',
    animal_description: 'Large mammal known for its tusks and trunk, native to various regions including Africa and Asia.',
  },
  {
    a_c_id: '2',
    animal_name: 'Tiger',
    animal_description: 'A big cat species, native to parts of Asia, known for its striped coat.',
  },
  // Add more mock animal categories as needed
]

type AnimalCategory = typeof initialAnimalCategories[0]

export default function AnimalCategoryTable() {
  const [animalCategories, setAnimalCategories] = useState(initialAnimalCategories)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentAnimalCategory, setCurrentAnimalCategory] = useState<AnimalCategory | null>(null)

  const handleOpenDialog = (animalCategory: AnimalCategory | null = null) => {
    setCurrentAnimalCategory(animalCategory)
    setIsDialogOpen(true)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const animalCategoryData = Object.fromEntries(formData.entries()) as unknown as AnimalCategory

    if (currentAnimalCategory) {
      // Edit existing animal category
      setAnimalCategories(animalCategories.map(category => category.a_c_id === currentAnimalCategory.a_c_id ? { ...category, ...animalCategoryData } : category))
    } else {
      // Add new animal category
      setAnimalCategories([...animalCategories, { ...animalCategoryData, a_c_id: (animalCategories.length + 1).toString() }])
    }

    setIsDialogOpen(false)
    setCurrentAnimalCategory(null)
  }

  return (
    <div className='flex justify-center items-start w-full h-full mt-20'>
      <div className="space-y-4 w-[90%]">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Animal Categories</h2>
          <Button onClick={() => handleOpenDialog()}><PlusIcon className="mr-2 h-4 w-4" /> Add Category</Button>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{currentAnimalCategory ? 'Edit Category' : 'Add New Category'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="animal_name">Animal Name</Label>
                <Input id="animal_name" name="animal_name" defaultValue={currentAnimalCategory?.animal_name} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="animal_description">Animal Description</Label>
                <Input id="animal_description" name="animal_description" defaultValue={currentAnimalCategory?.animal_description} required />
              </div>
              <Button type="submit">{currentAnimalCategory ? 'Edit Category' : 'Add Category'}</Button>
            </form>
          </DialogContent>
        </Dialog>
        <Table>
          <TableCaption>A list of animal categories.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Animal Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {animalCategories.map((category) => (
              <TableRow key={category.a_c_id}>
                <TableCell>{category.a_c_id}</TableCell>
                <TableCell>{category.animal_name}</TableCell>
                <TableCell>{category.animal_description}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(category)}>
                      <PencilIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
