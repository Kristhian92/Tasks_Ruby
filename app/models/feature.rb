class Feature < ApplicationRecord
  has_many :comments

  validates_presence_of :title, :url, :place, :mag_type, :latitude, :longitude
  validates_inclusion_of :mag_type, in: %w[md ml ms mw me mi mb mlg]
  validates :magnitude, numericality: { greater_than_or_equal_to: -1.0, less_than_or_equal_to: 10.0 }
  validates :latitude, numericality: { greater_than_or_equal_to: -90.0, less_than_or_equal_to: 90.0 }
  validates :longitude, numericality: { greater_than_or_equal_to: -180.0, less_than_or_equal_to: 180.0 }

  def coordinates
    { latitude:, longitude: }
  end

  def self.unique_features(features)
    features.each do |feature|
      Feature.find_or_create_by(external_id: feature['id']) do |f|
        f.title = feature['properties']['title']
        f.url = feature['properties']['url']
        f.place = feature['properties']['place']
        f.magnitude = feature['properties']['mag']
        f.time = feature['properties']['time']
        f.tsunami = feature['properties']['tsunami']
        f.mag_type = feature['properties']['magType']
        f.longitude = feature['geometry']['coordinates'][0]
        f.latitude = feature['geometry']['coordinates'][1]
      end
    end
  end
end
