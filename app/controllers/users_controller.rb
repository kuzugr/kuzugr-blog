# frozen_string_literal: true

class UsersController < ApplicationController
  def index
    render json: {
      user: current_user,
    }
  end
end