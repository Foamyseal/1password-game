require 'uri'
require 'rest-client'


class UserPoints
  def initialize(user:)
    @user = user
  end

  def calculate
    users_signin_attempts = ::EventsAPI.new(
      user: user,
      path: "api/v1/signinattempts" 
    ).process

    # reserved_points = (user.total_points + user.reserved_points) % 5

    # user.update!(reserved_points: reserved_points)

    user.total_points
  end

  attr_reader :user
end