# frozen_string_literal: true

class Article < ApplicationRecord
  has_many :upload_files
  belongs_to :user
  accepts_nested_attributes_for :upload_files, allow_destroy: true
end
