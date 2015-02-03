class SessionsController < ApplicationController
  def new
  end

  def create
    username = params[:user][:username]
    password = params[:user][:password]
    @user = User.find_by_credentials(username, password)

    if @user
      log_in! @user
      redirect_to root_url
    else
      flash.now[:errors] = "Invalid login"
      render :new
    end
  end

  def destroy
    log_out!
    redirect_to new_session_url
  end

end
