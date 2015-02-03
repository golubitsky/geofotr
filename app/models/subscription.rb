# == Schema Information
#
# Table name: subscriptions
#
#  id          :integer          not null, primary key
#  follower_id :integer          not null
#  followee_id :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Subscription < ActiveRecord::Base
  validates_presence_of :follower_id, :followee_id
  validates_uniqueness_of :follower_id, :scope => :followee_id

  belongs_to(
    :follower,
    class_name: "User",
    foreign_key: "follower_id"
    )

  belongs_to(
    :followee,
    class_name: "User",
    foreign_key: "followee_id"
    )

end
