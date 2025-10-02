"use client"

const Header = ({ onCreateNew, showForm, onCancel }) => {
  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Item Manager</h1>
            <p className="text-muted-foreground mt-1">Manage your items with full CRUD functionality</p>
          </div>

          <div className="flex gap-3">
            {showForm ? (
              <button
                onClick={onCancel}
                className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-muted transition-colors font-medium"
              >
                Cancel
              </button>
            ) : (
              <button
                onClick={onCreateNew}
                className="px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors font-medium"
              >
                Create New Item
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
