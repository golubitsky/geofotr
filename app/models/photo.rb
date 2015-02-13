# == Schema Information
#
# Table name: photos
#
#  id                 :integer          not null, primary key
#  user_id            :integer
#  caption            :string
#  visibility         :string           default("public")
#  latitude           :string
#  longitude          :string
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  photo_file_name    :string
#  photo_content_type :string
#  photo_file_size    :integer
#  photo_updated_at   :datetime
#

class Photo < ActiveRecord::Base
  validates :visibility, inclusion: { in: %w/public followers private/ }

  belongs_to :user
  has_many :comments

  default_scope { order('created_at DESC') }

  def Photo.public_photos
    Photo.where(visibility: "public")
  end

  def Photo.user_feed_photos(current_user)
    follow_ids = User.find(current_user.id).following.pluck(:id) + [current_user.id]
    Photo.where('user_id IN (?)', follow_ids)
  end


  #photo uploads using paperclip
  has_attached_file :photo, :styles => {
        :feed => "800x800>",
        :map => "200x200>",
        :thumb => "50x50#"
      }
  validates_attachment_content_type(
    :photo,
    :content_type => /\Aimage\/.*\Z/
  )

  before_post_process :extract_exif

  def extract_exif
    imgfile = EXIFR::JPEG.new(photo.queued_for_write[:original].path)

    return unless imgfile

    lat = imgfile.gps_latitude.to_f
    lat *= -1 if imgfile.gps_latitude_ref == "S"

    lng = imgfile.gps_longitude.to_f
    lng *= -1 if imgfile.gps_longitude_ref == "W"

    self.latitude = lat.to_s
    self.longitude = lng.to_s
    #store other attributes later, perhaps?
  end

  #like methods
  def like_count
    Like.where(photo_id: self.id).count
  end

  def like_id(current_user)
    return '' unless current_user
    like = Like.find_by(photo_id: self.id, user_id: current_user.id)
    like ? like.id : ''
  end
end
