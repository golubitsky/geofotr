Rails.application.routes.draw do
  root "staticpages#index"
  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: { format: :json } do
    resources :photos, only: [:index, :show, :create, :update, :destroy]
  end
end
