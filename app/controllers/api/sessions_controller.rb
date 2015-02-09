class Api::SessionsController < ApplicationController
  def create
    username = params[:user][:username]
    password = params[:user][:password]
    @user = User.find_by_credentials(username, password)

    if @user
      log_in! @user
      render 'api/users/show'
    else
      render json: {}, status: :unprocessable_entity
    end
  end

  def destroy
    log_out!
    render json: { status: "Logged out" }, status: 200
  end
end
