# == Schema Information
#
# Table name: comments
#
#  id         :integer          not null, primary key
#  body       :string           not null
#  user_id    :integer          not null
#  photo_id   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'action_view'

class Comment < ActiveRecord::Base
  include ActionView::Helpers::DateHelper

  validates_presence_of :body, :user_id, :photo_id

  belongs_to :user
  belongs_to :photo

  default_scope { order('updated_at DESC') }

  def time_ago
    distance_of_time_in_words(Time.now, created_at) + " ago"
  end

end
