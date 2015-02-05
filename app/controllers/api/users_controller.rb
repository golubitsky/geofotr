class Api::UsersController < ApplicationController
  def index
    @users = User.all
  end

  def show
    @user = User.find(params[:id])

    if current_user == @user
      @photos = @user.photos
    elsif current_user && current_user.following?(@user)
      @photos = @user.follower_photos
    else
      @photos = @user.public_photos
    end

    @subscription_id = nil

    if current_user.try(:following?, @user)
      @subscription = Subscription.find_by(
        follower_id: current_user.id,
        followee_id: @user.id
        )
      @subscription_id = @subscription.id
    end
  end
end
