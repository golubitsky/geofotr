Rails.application.routes.draw do
  root "staticpages#index"
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:index, :show, :create]
    resource :session, only: [:new, :create, :destroy]
    resources :photos, except: [:new, :edit]
    resources :subscriptions, only: [:create, :destroy]
    resources :likes, only: [:create, :destroy]
    resources :comments, only: [:create, :update, :destroy]
  end
end
