json.partial!("api/users/user", user: @user)

json.photos do
  json.array!(@photos) do |photo|
    json.partial!("api/photos/photo", photo: photo)
  end
end
