json.partial!("user", user: @user, subscription_id: @subscription_id)

json.subscriptionId @subscription_id

json.photos do
  json.array!(@photos) do |photo|
    json.partial!("api/photos/photo", photo: photo)
  end
end
