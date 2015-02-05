Rails.application.routes.draw do
  root "staticpages#index"
  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:index, :show]
    resources :subscriptions, only: [:create, :destroy]
  end
end
