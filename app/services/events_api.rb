require 'uri'
require 'net/http'
require 'rest-client'


class EventsApi
  BASE_URL = "https://events.b5test.com"
  API_TOKEN = Rails.application.credentials.one_password[:api_token]

  def process(path:)
    res = RestClient.post(
      "#{BASE_URL}/#{path}",
      payload.to_json,
      headers
    )
    
    return JSON.parse(res.body) if res.net_http_res.is_a?(Net::HTTPOK)
  end

  private

  def headers
    {
      content_type: "application/json",
      Authorization: "Bearer #{API_TOKEN}"
    }
  end 

  def payload
    {
      limit: 20,
      start_time: "2021-03-01T16:32:50-03:00"
    }
  end
  
  def start_time
    Time.now - 5*60*60
  end
end
