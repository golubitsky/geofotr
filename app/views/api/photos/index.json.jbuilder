json.page_number @page_number
json.total_pages @total_pages

json.photos do
  json.array!(@photos) do |photo|
    json.partial!("photo", photo: photo)
  end
end
