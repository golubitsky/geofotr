class Api::SubscriptionsController < ApplicationController
  def create
    @subscription = Subscription.new(subscription_params)

    if @subscription.save
      render json: @subscription
    else
      render json: @subscription.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @subscription = Subscription.find(params[:id])
    @subscription.try(:destroy)
    render json: {}
  end

  private

  def subscription_params
    params.require(:subscription).permit(:follower_id, :followee_id)
  end
end
