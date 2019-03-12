# frozen_string_literal: true

class ArticleSerializer < ActiveModel::Serializer
  attributes :id, :title, :html_content, :mark_content, :user_id, :created_at, :updated_at, :thumbnail_url

  def thumbnail_url
    return nil unless object.thumbnail
    "https://#{UploadFile.s3_bucket_name}.s3.ap-northeast-1.amazonaws.com/images/#{object.thumbnail.uuid}"
  end
end