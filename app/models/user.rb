# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime
#  updated_at      :datetime
#

class User < ActiveRecord::Base
  attr_reader :password
  validates_presence_of :username, :password_digest, :session_token
  validates_uniqueness_of :username
  validates :password, length: { minimum: 6, allow_nil: true }
  after_initialize :ensure_session_token

  has_many :photos

  has_many(
    :outgoing_subscriptions,
    class_name:  "Subscription",
    foreign_key: "follower_id",
    dependent: :destroy
    )

  has_many(
    :incoming_subscriptions,
    class_name: "Subscription",
    foreign_key: "followee_id",
    dependent: :destroy
    )

  has_many :following, through: :outgoing_subscriptions,  source: :followee
  has_many :followers, through: :incoming_subscriptions, source: :follower

  #authentication
  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return nil unless user

    user.is_password?(password) ? user : nil
  end

  def self.generate_session_token
    SecureRandom::urlsafe_base64
  end

  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end

  def reset_session_token!
    self.session_token = User.generate_session_token
    save!
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def password_digest
    BCrypt::Password.new(super)
  end

  def is_password?(password)
    password_digest.is_password?(password)
  end

  #user follow
  def follow(other_user)
    outgoing_subscriptions.create(
      follower_id: self.id,
      followee_id: other_user.id)
  end

  def unfollow(other_user)
    outgoing_subscriptions.find_by(followee_id: other_user.id).destroy
  end

  def following?(other_user)
    following.include?(other_user)
  end

  #photo liking
end
