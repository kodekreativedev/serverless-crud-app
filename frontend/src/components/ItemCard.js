"use client"

const ItemCard = ({ item, onEdit, onDelete }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-400 border-green-500/20"
      case "inactive":
        return "bg-red-500/10 text-red-400 border-red-500/20"
      case "pending":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
      default:
        return "bg-muted/10 text-muted-foreground border-muted/20"
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:border-accent/50 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-card-foreground line-clamp-2">{item.name}</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`}>
          {item.status}
        </span>
      </div>

      <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{item.description}</p>

      <div className="text-xs text-muted-foreground mb-4 space-y-1">
        <div>Created: {formatDate(item.createdAt)}</div>
        {item.updatedAt !== item.createdAt && <div>Updated: {formatDate(item.updatedAt)}</div>}
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onEdit(item)}
          className="flex-1 px-3 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors text-sm font-medium"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(item.id)}
          className="flex-1 px-3 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors text-sm font-medium"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default ItemCard
