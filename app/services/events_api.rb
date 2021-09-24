require 'uri'
require 'rest-client'


class EventsAPI
  BASE_URL = "https://events.b5test.com"
  API_TOKEN = Rails.application.credentials.one_password[:api_token]

  def initialize(user:, path:)
    @user = user
    @path = path
    @curr_cursor = nil
  end

  def process
    has_more = true
    res = nil
    items = []

    while has_more
      res = RestClient.post(
        "#{BASE_URL}/#{path}",
        payload.to_json,
        headers
      )

      unless res.net_http_res.is_a?(Net::HTTPOK)
        has_more = false
        return nil
      end

      result = JSON.parse(res.body)
      @curr_cursor = result["cursor"]
      has_more = result["has_more"]
      items.push(*result["items"])
      
      # puts has_more
    end

    @user.update!(current_cursor_value: @curr_cursor)

    items = items.select do |item|
      item["target_user"]["email"] == @user.email
    end
    
    curr_total_points = @user.total_points
    @user.update!(total_points: curr_total_points + items.count)
    { items: items }
  end


  private

  def user
    @user
  end

  def path
    @path
  end

  def headers
    {
      content_type: "application/json",
      Authorization: "Bearer #{API_TOKEN}"
    }
  end

  def payload
    if @curr_cursor || user.current_cursor_value.present?
      return {
        cursor:  @curr_cursor || user.current_cursor_value
      }
    end
    
    {
      limit: 20,
      start_time: start_time
    }
  end

  # This is just arbitary for now, but start time should be when the user first logs in to the game app
  def start_time
    "2021-09-23T18:51:30Z"
    # user.account_set_up_at
  end
end
