class Api::PhotosController < ApplicationController
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

  private

  def photo_params
    params.require(:photo).permit(:url, :caption, :visibility, :latitude, :longitude)
  end

end
