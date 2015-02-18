
json.page_number @page_number
json.total_pages @total_pages

json.user do
  json.partial!("api/users/user", user: @user)
end

json.photos do
  json.array!(@photos) do |photo|
    json.partial!("api/photos/photo", photo: photo)
  end
end
