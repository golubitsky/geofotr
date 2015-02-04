class Api::PhotosController < ApplicationController

  wrap_parameters(:posted_photo, include: [:url, :caption, :visibility, :latitude, :longitude, :photo])

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
    @photos = Photo.all
    #change later to show either all self/followed photos or all photos
    # if current_user
    #   @photos = current_user.feed_photos
    # else
    #   @photos = Photo.public_photos
    # end
    render :index
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
    params.require(:posted_photo).permit(:url, :caption, :visibility, :latitude, :longitude, :photo)
  end

end
