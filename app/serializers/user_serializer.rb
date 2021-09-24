class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :first_name, :last_name, :account_set_up_at,
    :current_cursor_value, :reserved_points, :total_points
end
