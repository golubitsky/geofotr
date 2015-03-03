json.(photo,
  :id,
  :user_id,
  :caption,
  :visibility,
  :latitude,
  :longitude,
  :created_at,
  :updated_at,
  )
json.user photo.user.username

json.originalUrl image_tag photo.photo.url(:original)
json.feedUrl image_tag photo.photo.url(:feed)
json.mapUrl image_tag photo.photo.url(:map)
json.thumbUrl image_tag photo.photo.url(:thumb)

json.likeId photo.like_id(current_user)
json.likeCount photo.like_count

json.subscriptionId photo.subscription_id(current_user)

json.comments do
  json.array!(photo.comments) do |comment|
    json.partial!("api/photos/photo_comment", comment: comment)
  end
end
