require 'net/http'
require 'json'

namespace :db do
  desc 'Fetch earthquake data from USGS and store it in the database'
  task fetch_earthquake_data: :environment do
    url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson'
    uri = URI(url)
    response = Net::HTTP.get(uri)
    data = JSON.parse(response)

    Feature.unique_features(data['features'])
  end
end
