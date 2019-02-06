# frozen_string_literal: true

class ArticlesSerializer < ActiveModel::Serializer
  attributes :articles

  def articles
    CollectionSerializer.new(
      object,
      serializer: ArticleSerializer
    )
  end
end
