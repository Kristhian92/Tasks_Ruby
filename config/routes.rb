Rails.application.routes.draw do
  root 'pages#index'

  get "up" => "rails/health#show", as: :rails_health_check

  namespace :api do
    resources :features, only: [:index] do
      resources :comments, only: [:create]
    end
  end
end
