# == Schema Information
#
# Table name: photos
#
#  id         :integer          not null, primary key
#  user_id    :integer
#  url        :string           not null
#  caption    :string
#  visibility :string           default("public")
#  latitude   :decimal(10, 6)
#  longitude  :decimal(10, 6)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Photo < ActiveRecord::Base
  validates_presence_of :url
  validates :visibility, inclusion: { in: %w/public followers private/ }

  belongs_to :user

  def Photo.public_photos
    Photo.where(visibility: "public")
  end
end
