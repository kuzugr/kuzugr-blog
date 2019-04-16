# frozen_string_literal: true

module Api
  module V1
    class ArticlesController < ApplicationController
      skip_before_action :authenticate_user_from_token!,
        only: [:index, :show, :search, :monthly_archive]

      def index
        limit = params[:limit] || 5
        articl_ids = Article.latest_ids(published_option, limit)
        @articles = Article.with_comments_and_thumbnail(published_option, articl_ids)
        include_option = params[:limit] == '1' ? true : false
        render status: 200, json: @articles, each_serializer: ArticleSerializer,
          include_comments: include_option, include_thumbnail: !include_option
      end

      def show
        @article = Article.includes(:comments)
                          .where(published: published_option)
                          .order('comments.created_at asc').find(params[:id])
        render status: 200, json: @article, serializer: ArticleSerializer, include_comments: true
      end

      def new
      end

      def edit
        @article = Article.find(params[:id])
      end

      def update
        article = Article.find(params[:id])
        set_upload_files_and_thumbnail(article) if params[:article][:upload_file_uuids].present?
        article.update(article_params) if article.user_id == current_user.id
      end

      def create
        article = Article.new(article_params)
        if params[:article][:upload_file_uuids].present?
          article = set_upload_files_and_thumbnail(article)
        end
        article.user_id = current_user.id
        article.save!
        render status: 201, json: { article_id: article.id }
      end

      def destroy
        article = Article.find(params[:id])
        article.destroy if article.user_id === current_user.id
      end

      def search
        render_invalid_request && return unless search_parms_valid?

        if params[:category_id]
          @articles = Article.with_thumbnail(published_option).by_category(params[:category_id])
        else
          @articles = Article.with_thumbnail(published_option).by_keyword(params[:keyword])
        end
        render status: 200, json: @articles, each_serializer: ArticleSerializer,
          include_thumbnail: true
      end

      def monthly_archive
        archives = Article.where(published: true).monthly_archive
        render status: 200, json: monthly_archive_response(archives)
      end

      def update_publish_status
        article = Article.find(params[:id])
        after_status = article.published ? false : true
        article.published = after_status
        article.save!
        render status: 200, json: article, serializer: ArticleSerializer, include_comments: true
      end

      private
      def article_params
        params[:article].permit(:title, :mark_content, :html_content, :category_id, :published)
      end

      def move_to_index
        redirect_to action: :index unless user_signed_in?
      end

      # 最終的に記事に乗せない画像を削除する
      def upload_files
        return unless params[:article][:upload_file_uuids]
        remove_files = []
        params[:article][:upload_file_uuids].each do |uuid|
          unless params[:article][:mark_content].include?(uuid)
            remove_files.push(uuid)
            UploadFile.remove_upload_file(uuid)
          end
        end
        UploadFile.where(uuid: remove_files).destroy_all if remove_files
        params[:article][:upload_file_uuids] - remove_files
      end

      def set_upload_files_and_thumbnail(article)
        upload_files_params = upload_files
        article_upload_files = UploadFile.where(uuid: upload_files_params).order(:id)
        article.upload_files << article_upload_files
        article.thumbnail = Thumbnail.new(file_name: article_upload_files[0].file_name,
          uuid: article_upload_files[0].uuid) unless article.thumbnail
        article
      end

      def published_option
        User.logged_in?(session) ? [true, false] : true
      end

      def search_parms_valid?
        params[:category_id].present? || params[:keyword].present?
      end

      def monthly_archive_response(archives)
        years = []
        archives.keys.each do |key|
          years << key[0..3]
        end
        years.uniq!
        { years: years, archives: archives }
      end
    end
  end
end
