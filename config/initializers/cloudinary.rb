require 'dotenv'
Dotenv.load('../.env')
Cloudinary.config do |config|
config.cloud_name: "#{ENV.fetch(cloud_name)}"
config.api_key: "#{ENV.fetch(api_key)}"
config.api_secret: "#{ENV.fetch(api_secret)}"
config.secure: true
config.cdn_subdomain: true
end
