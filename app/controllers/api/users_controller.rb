class Api::UsersController < ApplicationController
  def index
    @users = User.all
  end

  def show
    @user = User.find(params[:id])

    if current_user == @user
      @photos = current_user.photos
    elsif current_user && current_user.following?(@user)
      @photos = @user.follower_photos
    else
      @photos = @user.public_photos
    end
  end
end
