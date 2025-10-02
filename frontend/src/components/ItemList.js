import ItemCard from "./ItemCard"

const ItemList = ({ items, loading, onEdit, onDelete }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
        <span className="ml-3 text-muted-foreground">Loading items...</span>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-card border border-border rounded-lg p-8">
          <h3 className="text-lg font-medium text-card-foreground mb-2">No items found</h3>
          <p className="text-muted-foreground">Create your first item to get started.</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">All Items ({items.length})</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </div>
    </div>
  )
}

export default ItemList
