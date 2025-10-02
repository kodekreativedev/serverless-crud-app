"use client"

import { useState, useEffect } from "react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import ItemList from "./components/ItemList"
import ItemForm from "./components/ItemForm"
import Header from "./components/Header"
import { itemService } from "./services/itemService"

function App() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingItem, setEditingItem] = useState(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    try {
      setLoading(true)
      const data = await itemService.getItems()
      setItems(data.items || [])
    } catch (error) {
      toast.error("Failed to fetch items")
      console.error("Error fetching items:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateItem = async (itemData) => {
    try {
      const response = await itemService.createItem(itemData)
      setItems([...items, response.item])
      setShowForm(false)
      toast.success("Item created successfully")
    } catch (error) {
      toast.error("Failed to create item")
      console.error("Error creating item:", error)
    }
  }

  const handleUpdateItem = async (id, itemData) => {
    try {
      const response = await itemService.updateItem(id, itemData)
      setItems(items.map((item) => (item.id === id ? response.item : item)))
      setEditingItem(null)
      setShowForm(false)
      toast.success("Item updated successfully")
    } catch (error) {
      toast.error("Failed to update item")
      console.error("Error updating item:", error)
    }
  }

  const handleDeleteItem = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await itemService.deleteItem(id)
        setItems(items.filter((item) => item.id !== id))
        toast.success("Item deleted successfully")
      } catch (error) {
        toast.error("Failed to delete item")
        console.error("Error deleting item:", error)
      }
    }
  }

  const handleEditItem = (item) => {
    setEditingItem(item)
    setShowForm(true)
  }

  const handleCancelEdit = () => {
    setEditingItem(null)
    setShowForm(false)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header onCreateNew={() => setShowForm(true)} showForm={showForm} onCancel={handleCancelEdit} />
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {showForm && (
          <div className="mb-8">
            <ItemForm
              item={editingItem}
              onSubmit={editingItem ? (data) => handleUpdateItem(editingItem.id, data) : handleCreateItem}
              onCancel={handleCancelEdit}
            />
          </div>
        )}

        <ItemList items={items} loading={loading} onEdit={handleEditItem} onDelete={handleDeleteItem} />
      </main>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        className="toast-container"
      />
    </div>
  )
}

export default App
