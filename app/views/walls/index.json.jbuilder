json.array!(@walls) do |wall|
  json.extract! wall, :id, :name, :description, :background
  json.url wall_url(wall, format: :json)
end
