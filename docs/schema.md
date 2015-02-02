# Schema Information

## photos
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users), index
url         | string    | not null
caption     | string    |
visibility  | string    | not null, [public, followers, private]
latitude    | string    | index
longitude   | string    | index

## subscriptions
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
follower_id | integer   | not null, foreign key (references users), index, [dual unique]
followee_id | integer   | not null, foreign key (references users), index, [dual unique]

## likes
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users), [dual unique]
photo_id    | integer   | not null, foreign key (references photos), index, [dual unique]

## tags
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
label       | string    | not null, unique

## taggings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
photo_id    | integer   | not null, foreign key (references photos), index, [dual unique]
tag_id      | integer   | not null, foreign key (references tags), index, [dual unique]

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
email           | string    | not null, unique
username        | string    | not null, unique, index
password_digest | string    | not null
session_token   | string    | not null, unique

