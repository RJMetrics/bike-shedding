class ApplicationController < ActionController::Base
  respond_to :js, :json, :html
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
end
