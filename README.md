# geofotr

[Project link][project_link]

[project_link]: https://www.geofotr.com

## Minimum Viable Product
Geophotr is a clone of Flickr built on Rails and Backbone. Users can:

- [x] Create accounts
- [x] Create sessions (log in)
- [x] Upload photos
- [x] specifying latitude/longitude for photo uploads (via UI)
- [x] view geotagged photos on map
- [x] View individual photos
- [x] Follow other users
- [x] View public feed without logging in
- [x] View a feed of individual photos from followed users
- [x] 'Like' button for signed-in users
- [x] 'Like' counter on all photos

## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, Basic Photo creation (~1 day)
Implement user authentication in Rails based on the practices learned at
App Academy. Make users and photos controllers. Users will be unable to actually
upload photos; they will be able to upload captions and urls. Eventually the url
field of the photos model will link to assets on AWS.

[Details][phase-one]

### Phase 2: JSON API and First Backbone Views (~2 days)
Add API routes to serve photo data as JSON, then add Backbone models and
collections that fetch data from those routes. Add Backbone
views for 'PhotoShow' and 'PhotoIndex'. By the end of this
phase, the existing Rails views will have been ported over to Backbone.
Authentication will remain server-side. I will start figuring out how to use
CarrierWave and Amazon S3.

[Details][phase-two]

### Phase 3: Photo Uploads (~2 days)
Make photo uploads happen. I'm hoping to do it with a generic file-select
dialog box--hopefully without Filepicker, but instead with CarrierWave and AWS.
I found some RailsCasts on the subject; hopefully it will all work.

[Details][phase-three]

### Phase 4: Photo Feeds (~1-2 days)
Develop the 'PhotoIndex' Backbone view to serve three purposes:
  display all public photos (for non-logged-in users);
    paginate/limit somehow?
  display followed users' photos (for logged-in users).
  display a user's photos (the "profile" page).
    need two different collections to do this? the logged-in/not logged-in will
    hit the same Rails route (Photos#index); user's photos will hit Users#show


[Details][phase-four]

### Phase 5: Google Maps/EXIF Data (~2 days)
Try to incorporate Google Maps API to locations for photos (either public or
followed). Ideally will be able to click on a photo and go to `PhotoShow` view,
but I'd settle for manually setting lat/long for photos.

[Details][phase-five]

### Bonus Features (TBD)
- [ ] Tag photos
- [ ] users can view all of their liked photos
- [ ] users can set their profile picture thumbnail
- [x] map displays medium size photo
- [x] users enter text location and auto-convert to lat/long for map display
- [x] Pagination
- [ ] Search for photos by title
- [ ] Search for photos by tag
- [ ] Reblogging
- [x] Custom urls for photos
- [ ] Support for multiple open sessions


[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md

