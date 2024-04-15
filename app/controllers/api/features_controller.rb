module Api
  class FeaturesController < ApplicationController
    def index
      features = Feature.all
      filtered_features = filter_features(features)
      render json: serialize_features(filtered_features)
    end

    private

    def filter_features(features)
      if params['filters'] && params['filters']['mag_type']
        features = features.where(mag_type: params['filters']['mag_type'])
      end
      features.page(params[:page]).per(per_page)
    end

    def per_page
      params[:per_page] ? [params[:per_page].to_i, 1000].min : 100
    end

    def serialize_features(features)
      features.as_json(
        only: [:id],
        methods: %i[magnitude place time tsunami mag_type title coordinates]
      )
    end
  end
end
