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

json.url image_tag photo.photo.url(:big)
json.liked liked
