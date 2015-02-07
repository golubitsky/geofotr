json.(user, :id, :username)

json.subscriptionId nil

if current_user
  json.subscriptionId current_user.subscription_id(user)
end
