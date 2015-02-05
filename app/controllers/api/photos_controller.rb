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
        @photos = current_user.photos
      elsif current_user && current_user.following?(@user)
        @photos = @user.follower_photos
      else
        @photos = @user.public_photos
      end
    else
      @photos = Photo.public_photos

      if current_user
        @photos += current_user.photos
      end
    end
  end

  def show
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

end
