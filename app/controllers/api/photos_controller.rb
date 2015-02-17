class Api::PhotosController < ApplicationController
  wrap_parameters(:posted_photo, include: [:caption, :visibility, :latitude, :longitude, :photo])

  def create
    @photo = current_user.photos.new(photo_params)

    if @photo.save
      render :show
    else
      render json: @photo.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @photo = current_user.photos.find(params[:id])
    @photo.try(:destroy)
    render json: {}
  end

  def index
    if params[:user_id]
      @user = User.find_by(id: params[:user_id])

      if current_user == @user
        @photos = current_user.photos.page(params[:page]).per(1)
      elsif current_user && current_user.following?(@user)
        @photos = @user.follower_photos.page(params[:page]).per(1)
      else
        @photos = @user.public_photos.page(params[:page]).per(1)
      end

      generate_subscription_id
    elsif current_user
      @photos = Photo.user_feed_photos(current_user).page(params[:page]).per(1)
    else
      @photos = Photo.public_photos.page(params[:page]).per(1)
    end
    @page_number = params[:page].to_i
    @total_pages = @photos.total_pages
    puts "*********************************"
    puts "page number:"
    p @page_number.to_i
    puts "total pages:"
    p @total_pages
    puts "*********************************"
  end

  def show
    @original_size = true
    @photo = Photo.find(params[:id])
  end

  def update
    @photo = current_user.photos.find(params[:id])

    if @photo.update(photo_params)
      render :show
    else
      render json: @photo.errors.full_messages, status: :unprocessable_entity
    end
  end

  private

  def photo_params
    params.require(:posted_photo).permit(:caption, :visibility, :latitude, :longitude, :photo)
  end

  def generate_subscription_id
    @subscription_id = nil

    if current_user.following?(@user)
      @subscription = Subscription.find_by(
        follower_id: current_user.id,
        followee_id: @user.id
        )
      @subscription_id = @subscription.id
    end
  end
end
