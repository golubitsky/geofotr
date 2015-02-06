class Api::CommentsController < ApplicationController
  def create
    @comment = Comment.new(comment_params)
    @comment.user_id = current_user.id

    if @comment.save
      render json: @comment
    else
      render json: @comment.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @comment = Comment.find(params[:id])
    @comment.try(:destroy)
    render json: {}
  end

  private

  def comment_params
    params.require(:comment).permit(:body, :user_id, :photo_id)
  end
end
