class ProductController < ApplicationController
  skip_before_action :verify_authenticity_token
  def index
    @message = "List of Products"
  end

  def create
    @product = Product.create(id: params[:id],shop_id: params[:shop_id], name: params[:name], metadata: params[:metadata])
    if @product.save
      render json: @product.to_json
    else
      render json: {
        error: @product.errors.full_messages,
        status: 500,
      }, status: 500
    end
  end

  def destroy
    @product = Product.find_by(variant_id: params[:id])
    if @product.destroy
      flash[:success] = 'Product was successfully deleted.'
      render json: {}, status: ok
    else
      flash[:error] = 'Something went wrong'
      render json: { error: 'error' }, status: 500
    end
  end
end

