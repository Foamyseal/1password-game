class AddMoreColumnsToUser < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :account_set_up_at, :string
    add_column :users, :current_cursor_value, :string
    add_column :users, :reserved_points, :integer
    add_column :users, :total_points, :integer
  end
end
