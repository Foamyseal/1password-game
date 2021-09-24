module API
  module V1
    class Users < Grape::API
      include API::V1::Defaults

      resource :users do
        desc "Return all users"
        get "" do
          User.all
        end

        desc "Returns a Reward for a user"
        params do
          requires :email, type: String, desc: "Email of the user"
        end
        get :rewards do
          user = User.where(email: permitted_params[:email]).first!
          # call the Events api for the User
          # users_signin_attempts = ::EventsAPI.new(
          #   user: user,
          #   path: "api/v1/signinattempts"
          # ).process
          ::UserPoints.new(user: user).calculate
        end

        desc "Return a user"
        params do
          requires :id, type: String, desc: "ID of the user"
        end
        get ":id" do
          User.where(id: permitted_params[:id]).first!
        end
      end
    end
  end
end