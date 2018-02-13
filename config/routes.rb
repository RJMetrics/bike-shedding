Rails.application.routes.draw do
  namespace :api do
    resources :weather_reports, only: [:index, :show], format: :json
    resources :bike_rides, only: [:index, :show], format: :json
  end

  # You can have the root of your site routed with "root"
  # root 'application#index', format: :json
end
