Rails.application.routes.draw do
  root "staticpages#index"
  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: { format: :json } do
    resources :photos, except: [:new, :edit]
    resources :users, only: [:index, :show]
    resources :subscriptions, only: [:create, :destroy]
    resources :likes, only: [:create, :destroy]
    resources :comments, only: [:create, :update, :destroy]
  end
end
