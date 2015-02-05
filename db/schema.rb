# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150205052715) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "likes", force: :cascade do |t|
    t.integer  "user_id",    null: false
    t.integer  "photo_id",   null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "likes", ["photo_id"], name: "index_likes_on_photo_id", using: :btree
  add_index "likes", ["user_id", "photo_id"], name: "index_likes_on_user_id_and_photo_id", unique: true, using: :btree
  add_index "likes", ["user_id"], name: "index_likes_on_user_id", using: :btree

  create_table "photos", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "caption"
    t.string   "visibility",         default: "public"
    t.string   "latitude"
    t.string   "longitude"
    t.datetime "created_at",                            null: false
    t.datetime "updated_at",                            null: false
    t.string   "photo_file_name"
    t.string   "photo_content_type"
    t.integer  "photo_file_size"
    t.datetime "photo_updated_at"
  end

  add_index "photos", ["user_id"], name: "index_photos_on_user_id", using: :btree

  create_table "subscriptions", force: :cascade do |t|
    t.integer  "follower_id", null: false
    t.integer  "followee_id", null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "subscriptions", ["followee_id"], name: "index_subscriptions_on_followee_id", using: :btree
  add_index "subscriptions", ["follower_id", "followee_id"], name: "index_subscriptions_on_follower_id_and_followee_id", unique: true, using: :btree
  add_index "subscriptions", ["follower_id"], name: "index_subscriptions_on_follower_id", using: :btree

  create_table "taggings", force: :cascade do |t|
    t.integer  "tag_id",     null: false
    t.integer  "photo_id",   null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "taggings", ["photo_id"], name: "index_taggings_on_photo_id", using: :btree
  add_index "taggings", ["tag_id", "photo_id"], name: "index_taggings_on_tag_id_and_photo_id", unique: true, using: :btree
  add_index "taggings", ["tag_id"], name: "index_taggings_on_tag_id", using: :btree

  create_table "tags", force: :cascade do |t|
    t.string   "label",      null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "tags", ["label"], name: "index_tags_on_label", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "username",        null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["username"], name: "index_users_on_username", using: :btree

end
