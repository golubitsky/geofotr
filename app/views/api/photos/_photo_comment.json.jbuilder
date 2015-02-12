json.(comment,
  :id,
  :body,
  :user_id,
  :photo_id,
  :created_at,
  :updated_at,
  )

json.time_ago comment.time_ago
json.user comment.user.username
