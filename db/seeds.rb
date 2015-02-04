# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
markov = User.create(username: "markov", password: "password")
mahler = User.create(username: "mahler", password: "password")

markov.photos.create(url: "www.spirals.com", caption: "this will be a phenomenal photo", visibility: "public", latitude: 10.4537, longitude: 3.9999)

mahler.photos.create(url: "a url of the photo of alma", caption: "a photo of Alma", visibility: "private")
