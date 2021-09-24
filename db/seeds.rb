# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


one_password_users = [
  { email: "amanpatel19.ap@gmail.com", first_name: "Aman", last_name: "Patel", account_set_up_at: "2021-09-22T18:51:30Z", current_cursor_value: nil, reserved_points: 0, total_points: 0 }
  ]

one_password_users.each do |user|
  User.create!(
    email: user[:email],
    first_name: user[:first_name],
    last_name: user[:last_name],
    account_set_up_at: user[:account_set_up_at],
    current_cursor_value: user[:current_cursor_value],
    reserved_points: user[:reserved_points],
    total_points: user[:total_points]
  )
end