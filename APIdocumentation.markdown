# API Documentation for VideoTube (Youtube Like Platform)

This document provides detailed information about the API endpoints for a video sharing platform. The API is built using Express.js and follows RESTful conventions. It includes routes for user management, playlists, videos, comments, tweets, subscriptions, likes, and more. The documentation is organized by feature, with each endpoint described in terms of its HTTP method, path, description, middleware, and expected inputs/outputs.

## Base URL

All endpoints are prefixed with `/api/v1`.

## Middleware

- **Authentication**: The `verifyJWT` middleware is used to secure routes, ensuring only authenticated users can access them.
- **File Uploads**: The `upload` middleware (powered by `multer`) handles file uploads for avatars, cover images, videos, and thumbnails.
- **Route Organization**: Routes are modularized into separate routers (e.g., `userRouter`, `videoRouter`) and mounted using `app.use()`.

## Endpoints

### 1. User Management (`/api/v1/users`)

#### Register User

- **Method**: `POST`

- **Path**: `/register`

- **Description**: Registers a new user with optional avatar and cover image uploads.

- **Middleware**:

  - `upload.fields([{ name: "avatar", maxCount: 1 }, { name: "coverImage", maxCount: 1 }])`: Handles file uploads.
  - `registerUser`: Controller to process registration.

- **Request Body**:

  - `username` (string, required): Unique username.
  - `email` (string, required): User's email.
  - `password` (string, required): User's password.
  - `avatar` (file, optional): User's profile picture.
  - `coverImage` (file, optional): User's cover image.

- **Response**:

  - `201 Created`: User registered successfully.
  - `400 Bad Request`: Invalid input or duplicate user.

- **Example**:

  ```bash
  curl -X POST /api/v1/users/register \
  -F "username=johndoe" \
  -F "email=john@example.com" \
  -F "password=secure123" \
  -F "avatar=@/path/to/avatar.jpg" \
  -F "coverImage=@/path/to/cover.jpg"
  ```

#### Login User

- **Method**: `POST`

- **Path**: `/login`

- **Description**: Authenticates a user and returns a JWT token.

- **Middleware**: `loginUser`

- **Request Body**:

  - `username` (string, optional): User's username.
  - `email` (string, optional): User's email.
  - `password` (string, required): User's password.

- **Response**:

  - `200 OK`: Login successful, returns JWT token.
  - `401 Unauthorized`: Invalid credentials.

- **Example**:

  ```bash
  curl -X POST /api/v1/users/login \
  -H "Content-Type: application/json" \
  -d '{"username":"johndoe","password":"secure123"}'
  ```

#### Logout User

- **Method**: `POST`

- **Path**: `/logout`

- **Description**: Logs out the authenticated user, invalidating their JWT.

- **Middleware**: `verifyJWT`, `logOutUser`

- **Response**:

  - `200 OK`: Logout successful.

- **Example**:

  ```bash
  curl -X POST /api/v1/users/logout \
  -H "Authorization: Bearer <JWT_TOKEN>"
  ```

#### Refresh Access Token

- **Method**: `POST`

- **Path**: `/refresh-token`

- **Description**: Refreshes the user's JWT token.

- **Middleware**: `refreshAccessToken`

- **Request Body**:

  - `refreshToken` (string, required): Valid refresh token.

- **Response**:

  - `200 OK`: New access token issued.
  - `401 Unauthorized`: Invalid refresh token.

- **Example**:

  ```bash
  curl -X POST /api/v1/users/refresh-token \
  -H "Content-Type: application/json" \
  -d '{"refreshToken":"<REFRESH_TOKEN>"}'
  ```

#### Change Password

- **Method**: `POST`

- **Path**: `/change-password`

- **Description**: Updates the authenticated user's password.

- **Middleware**: `verifyJWT`, `changePassword`

- **Request Body**:

  - `oldPassword` (string, required): Current password.
  - `newPassword` (string, required): New password.

- **Response**:

  - `200 OK`: Password updated successfully.
  - `401 Unauthorized`: Invalid old password.

- **Example**:

  ```bash
  curl -X POST /api/v1/users/change-password \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"oldPassword":"secure123","newPassword":"newSecure456"}'
  ```

#### Get Current User

- **Method**: `GET`

- **Path**: `/get-user`

- **Description**: Retrieves details of the authenticated user.

- **Middleware**: `verifyJWT`, `getCurrentUser`

- **Response**:

  - `200 OK`: Returns user details (e.g., username, email, avatar).

- **Example**:

  ```bash
  curl -X GET /api/v1/users/get-user \
  -H "Authorization: Bearer <JWT_TOKEN>"
  ```

#### Update User Fields

- **Method**: `PATCH`

- **Path**: `/update-user`

- **Description**: Updates non-file user fields (e.g., username, email).

- **Middleware**: `verifyJWT`, `updateUserFields`

- **Request Body**:

  - Fields to update (e.g., `username`, `email`).

- **Response**:

  - `200 OK`: User fields updated successfully.
  - `400 Bad Request`: Invalid input.

- **Example**:

  ```bash
  curl -X PATCH /api/v1/users/update-user \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"username":"newJohnDoe"}'
  ```

#### Update Avatar

- **Method**: `PATCH`

- **Path**: `/update-avatar`

- **Description**: Updates the authenticated user's avatar.

- **Middleware**: `verifyJWT`, `upload.single("avatar")`, `updateAvatar`

- **Request Body**:

  - `avatar` (file, required): New avatar image.

- **Response**:

  - `200 OK`: Avatar updated successfully.

- **Example**:

  ```bash
  curl -X PATCH /api/v1/users/update-avatar \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -F "avatar=@/path/to/newAvatar.jpg"
  ```

#### Update Cover Image

- **Method**: `PATCH`

- **Path**: `/update-Cimage`

- **Description**: Updates the authenticated user's cover image.

- **Middleware**: `verifyJWT`, `upload.single("coverImage")`, `updateCoverImage`

- **Request Body**:

  - `coverImage` (file, required): New cover image.

- **Response**:

  - `200 OK`: Cover image updated successfully.

- **Example**:

  ```bash
  curl -X PATCH /api/v1/users/update-Cimage \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -F "coverImage=@/path/to/newCover.jpg"
  ```

#### Get User Channel Profile

- **Method**: `GET`

- **Path**: `/c/:username`

- **Description**: Retrieves the profile of a user’s channel.

- **Middleware**: `verifyJWT`, `getUserChannelProfile`

- **Parameters**:

  - `username` (path, required): Username of the channel.

- **Response**:

  - `200 OK`: Returns channel details (e.g., username, avatar, subscribers).

- **Example**:

  ```bash
  curl -X GET /api/v1/users/c/johndoe \
  -H "Authorization: Bearer <JWT_TOKEN>"
  ```

#### Get Watch History

- **Method**: `GET`

- **Path**: `/history`

- **Description**: Retrieves the authenticated user's watch history.

- **Middleware**: `verifyJWT`, `getWatchHistory`

- **Response**:

  - `200 OK`: Returns list of watched videos.

- **Example**:

  ```bash
  curl -X GET /api/v1/users/history \
  -H "Authorization: Bearer <JWT_TOKEN>"
  ```

### 2. Playlist Management (`/api/v1/playlist`)

#### Create Playlist

- **Method**: `POST`

- **Path**: `/`

- **Description**: Creates a new playlist for the authenticated user.

- **Middleware**: `createPlaylist`

- **Request Body**:

  - `name` (string, required): Playlist name.
  - `description` (string, optional): Playlist description.

- **Response**:

  - `201 Created`: Playlist created successfully.

- **Example**:

  ```bash
  curl -X POST /api/v1/playlist/ \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"name":"My Favorites","description":"Best videos"}'
  ```

#### Get Playlist by ID

- **Method**: `GET`

- **Path**: `/:playlistId`

- **Description**: Retrieves a playlist by its ID.

- **Middleware**: `getPlaylistById`

- **Parameters**:

  - `playlistId` (path, required): Playlist ID.

- **Response**:

  - `200 OK`: Returns playlist details.
  - `404 Not Found`: Playlist not found.

- **Example**:

  ```bash
  curl -X GET /api/v1/playlist/12345 \
  -H "Authorization: Bearer <JWT_TOKEN>"
  ```

#### Update Playlist

- **Method**: `PATCH`

- **Path**: `/:playlistId`

- **Description**: Updates a playlist’s details (e.g., name, description).

- **Middleware**: `updatePlaylist`

- **Parameters**:

  - `playlistId` (path, required): Playlist ID.

- **Request Body**:

  - `name` (string, optional): Updated playlist name.
  - `description` (string, optional): Updated description.

- **Response**:

  - `200 OK`: Playlist updated successfully.

- **Example**:

  ```bash
  curl -X PATCH /api/v1/playlist/12345 \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated Favorites"}'
  ```

#### Delete Playlist

- **Method**: `DELETE`

- **Path**: `/:playlistId`

- **Description**: Deletes a playlist.

- **Middleware**: `deletePlaylist`

- **Parameters**:

  - `playlistId` (path, required): Playlist ID.

- **Response**:

  - `200 OK`: Playlist deleted successfully.

- **Example**:

  ```bash
  curl -X DELETE /api/v1/playlist/12345 \
  -H "Authorization: Bearer <JWT_TOKEN>"
  ```

#### Add Video to Playlist

- **Method**: `PATCH`

- **Path**: `/add/:videoId/:playlistId`

- **Description**: Adds a video to a playlist.

- **Middleware**: `addVideoToPlaylist`

- **Parameters**:

  - `videoId` (path, required): Video ID.
  - `playlistId` (path, required): Playlist ID.

- **Response**:

  - `200 OK`: Video added to playlist.

- **Example**:

  ```bash
  curl -X PATCH /api/v1/playlist/add/67890/12345 \
  -H "Authorization: Bearer <JWT_TOKEN>"
  ```

#### Remove Video from Playlist

- **Method**: `PATCH`

- **Path**: `/remove/:videoId/:playlistId`

- **Description**: Removes a video from a playlist.

- **Middleware**: `removeVideoFromPlaylist`

- **Parameters**:

  - `videoId` (path, required): Video ID.
  - `playlistId` (path, required): Playlist ID.

- **Response**:

  - `200 OK`: Video removed from playlist.

- **Example**:

  ```bash
  curl -X PATCH /api/v1/playlist/remove/67890/12345 \
  -H "Authorization: Bearer <JWT_TOKEN>"
  ```

#### Get User Playlists

- **Method**: `GET`

- **Path**: `/user/:userId`

- **Description**: Retrieves all playlists for a specific user.

- **Middleware**: `getUserPlaylists`

- **Parameters**:

  - `userId` (path, required): User ID.

- **Response**:

  - `200 OK`: Returns list of user’s playlists.

- **Example**:

  ```bash
  curl -X GET /api/v1/playlist/user/54321 \
  -H "Authorization: Bearer <JWT_TOKEN>"
  ```

### 3. Video Management (`/api/v1/video`)

#### Get All Videos

- **Method**: `GET`

- **Path**: `/`

- **Description**: Retrieves all published videos.

- **Middleware**: `getAllVideos`

- **Response**:

  - `200 OK`: Returns list of videos.

- **Example**:

  ```bash
  curl -X GET /api/v1/video/
  ```

#### Publish a Video

- **Method**: `POST`

- **Path**: `/`

- **Description**: Publishes a new video with a video file and thumbnail.

- **Middleware**:

  - `upload.fields([{ name: "videoFile", maxCount: 1 }, { name: "thumbnail", maxCount: 1 }])`: Handles file uploads.
  - `publishAVideo`

- **Request Body**:

  - `title` (string, required): Video title.
  - `description` (string, optional): Video description.
  - `videoFile` (file, required): Video file.
  - `thumbnail` (file, required): Thumbnail image.

- **Response**:

  - `201 Created`: Video published successfully.

- **Example**:

  ```bash
  curl -X POST /api/v1/video/ \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -F "title=My Video" \
  -F "description=A great video" \
  -F "videoFile=@/path/to/video.mp4" \
  -F "thumbnail=@/path/to/thumbnail.jpg"
  ```

#### Get Video by ID

- **Method**: `GET`

- **Path**: `/:videoId`

- **Description**: Retrieves a video by its ID.

- **Middleware**: `getVideoById`

- **Parameters**:

  - `videoId` (path, required): Video ID.

- **Response**:

  - `200 OK`: Returns video details.
  - `404 Not Found`: Video not found.

- **Example**:

  ```bash
  curl -X GET /api/v1/video/67890
  ```

#### Delete Video

- **Method**: `DELETE`

- **Path**: `/:videoId`

- **Description**: Deletes a video.

- **Middleware**: `deleteVideo`

- **Parameters**:

  - `videoId` (path, required): Video ID.

- **Response**:

  - `200 OK`: Video deleted successfully.

- **Example**:

  ```bash
  curl -X DELETE /api/v1/video/67890 \
  -H "Authorization: Bearer <JWT_TOKEN>"
  ```

#### Update Video

- **Method**: `PATCH`

- **Path**: `/:videoId`

- **Description**: Updates a video’s details (e.g., title, description).

- **Middleware**: `updateVideo`

- **Parameters**:

  - `videoId` (path, required): Video ID.

- **Request Body**:

  - `title` (string, optional): Updated title.
  - `description` (string, optional): Updated description.

- **Response**:

  - `200 OK`: Video updated successfully.

- **Example**:

  ```bash
  curl -X PATCH /api/v1/video/67890 \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated Video Title"}'
  ```

#### Update Thumbnail

- **Method**: `PATCH`

- **Path**: `/:videoId/update-thumbnail`

- **Description**: Updates a video’s thumbnail.

- **Middleware**: `upload.single("thumbnail")`, `updateThumbnail`

- **Parameters**:

  - `videoId` (path, required): Video ID.

- **Request Body**:

  - `thumbnail` (file, required): New thumbnail image.

- **Response**:

  - `200 OK`: Thumbnail updated successfully.

- **Example**:

  ```bash
  curl -X PATCH /api/v1/video/67890/update-thumbnail \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -F "thumbnail=@/path/to/newThumbnail.jpg"
  ```

#### Toggle Publish Status

- **Method**: `PATCH`

- **Path**: `/toggle/publish/:videoId`

- **Description**: Toggles a video’s publish status (public/private).

- **Middleware**: `togglePublishStatus`

- **Parameters**:

  - `videoId` (path, required): Video ID.

- **Response**:

  - `200 OK`: Publish status toggled successfully.

- **Example**:

  ```bash
  curl -X PATCH /api/v1/video/toggle/publish/67890 \
  -H "Authorization: Bearer <JWT_TOKEN>"
  ```

### 4. Comment Management (`/api/v1/comment`)

#### Get Video Comments

- **Method**: `GET`

- **Path**: `/:videoId`

- **Description**: Retrieves all comments for a specific video.

- **Middleware**: `getVideoComments`

- **Parameters**:

  - `videoId` (path, required): Video ID.

- **Response**:

  - `200 OK`: Returns list of comments.

- **Example**:

  ```bash
  curl -X GET /api/v1/comment/67890
  ```

#### Add Comment

- **Method**: `POST`

- **Path**: `/:videoId`

- **Description**: Adds a comment to a video.

- **Middleware**: `addComment`

- **Parameters**:

  - `videoId` (path, required): Video ID.

- **Request Body**:

  - `content` (string, required): Comment text.

- **Response**:

  - `201 Created`: Comment added successfully.

- **Example**:

  ```bash
  curl -X POST /api/v1/comment/67890 \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"content":"Great video!"}'
  ```

#### Delete Comment

- **Method**: `DELETE`

- **Path**: `/c/:commentId`

- **Description**: Deletes a comment.

- **Middleware**: `deleteComment`

- **Parameters**:

  - `commentId` (path, required): Comment ID.

- **Response**:

  - `200 OK`: Comment deleted successfully.

- **Example**:

  ```bash
  curl -X DELETE /api/v1/comment/c/98765 \
  -H "Authorization: Bearer <JWT_TOKEN>"
  ```

#### Update Comment

- **Method**: `PATCH`

- **Path**: `/c/:commentId`

- **Description**: Updates a comment’s content.

- **Middleware**: `updateComment`

- **Parameters**:

  - `commentId` (path, required): Comment ID.

- **Request Body**:

  - `content` (string, required): Updated comment text.

- **Response**:

  - `200 OK`: Comment updated successfully.

- **Example**:

  ```bash
  curl -X PATCH /api/v1/comment/c/98765 \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"content":"Updated comment"}'
  ```

### 5. Tweet Management (`/api/v1/tweet`)

#### Create Tweet

- **Method**: `POST`

- **Path**: `/`

- **Description**: Creates a new tweet.

- **Middleware**: `createTweet`

- **Request Body**:

  - `content` (string, required): Tweet text.

- **Response**:

  - `201 Created`: Tweet created successfully.

- **Example**:

  ```bash
  curl -X POST /api/v1/tweet/ \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"content":"Hello, world!"}'
  ```

#### Get User Tweets

- **Method**: `GET`

- **Path**: `/user/:userId`

- **Description**: Retrieves all tweets by a specific user.

- **Middleware**: `getUserTweets`

- **Parameters**:

  - `userId` (path, required): User ID.

- **Response**:

  - `200 OK`: Returns list of user’s tweets.

- **Example**:

  ```bash
  curl -X GET /api/v1/tweet/user/54321
  ```

#### Update Tweet

- **Method**: `PATCH`

- **Path**: `/:tweetId`

- **Description**: Updates a tweet’s content.

- **Middleware**: `updateTweet`

- **Parameters**:

  - `tweetId` (path, required): Tweet ID.

- **Request Body**:

  - `content` (string, required): Updated tweet text.

- **Response**:

  - `200 OK`: Tweet updated successfully.

- **Example**:

  ```bash
  curl -X PATCH /api/v1/tweet/12345 \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"content":"Updated tweet"}'
  ```

#### Delete Tweet

- **Method**: `DELETE`

- **Path**: `/:tweetId`

- **Description**: Deletes a tweet.

- **Middleware**: `deleteTweet`

- **Parameters**:

  - `tweetId` (path, required): Tweet ID.

- **Response**:

  - `200 OK`: Tweet deleted successfully.

- **Example**:

  ```bash
  curl -X DELETE /api/v1/tweet/12345 \
  -H "Authorization: Bearer <JWT_TOKEN>"
  ```

### 6. Subscription Management (`/api/v1/subscription`)

#### Get Subscribed Channels

- **Method**: `GET`

- **Path**: `/c/:channelId`

- **Description**: Retrieves all channels subscribed to by a user.

- **Middleware**: `getSubscribedChannels`

- **Parameters**:

  - `channelId` (path, required): Channel ID.

- **Response**:

  - `200 OK`: Returns list of subscribed channels.

- **Example**:

  ```bash
  curl -X GET /api/v1/subscription/c/54321 \
  -H "Authorization: Bearer <JWT_TOKEN>"
  ```

#### Toggle Subscription

- **Method**: `POST`

- **Path**: `/c/:channelId`

- **Description**: Subscribes or unsubscribes the authenticated user to/from a channel.

- **Middleware**: `toggleSubscription`

- **Parameters**:

  - `channelId` (path, required): Channel ID.

- **Response**:

  - `200 OK`: Subscription status toggled successfully.

- **Example**:

  ```bash
  curl -X POST /api/v1/subscription/c/54321 \
  -H "Authorization: Bearer <JWT_TOKEN>"
  ```

#### Get User Channel Subscribers

- **Method**: `GET`

- **Path**: `/u/:subscriberId`

- **Description**: Retrieves all subscribers to a specific channel.

- **Middleware**: `getUserChannelSubscribers`

- **Parameters**:

  - `subscriberId` (path, required): Subscriber ID.

- **Response**:

  - `200 OK`: Returns list of subscribers.

- **Example**:

  ```bash
  curl -X GET /api/v1/subscription/u/54321 \
  -H "Authorization: Bearer <JWT_TOKEN>"
  ```

### 7. Like Management (`/api/v1/like`)

#### Toggle Video Like

- **Method**: `POST`

- **Path**: `/toggle/v/:videoId`

- **Description**: Toggles like status for a video.

- **Middleware**: `toggleVideoLike`

- **Parameters**:

  - `videoId` (path, required): Video ID.

- **Response**:

  - `200 OK`: Like status toggled successfully.

- **Example**:

  ```bash
  curl -X POST /api/v1/like/toggle/v/67890 \
  -H "Authorization: Bearer <JWT_TOKEN>"
  ```

#### Toggle Comment Like

- **Method**: `POST`

- **Path**: `/toggle/c/:commentId`

- **Description**: Toggles like status for a comment.

- **Middleware**: `toggleCommentLike`

- **Parameters**:

  - `commentId` (path, required): Comment ID.

- **Response**:

  - `200 OK`: Like status toggled successfully.

- **Example**:

  ```bash
  curl -X POST /api/v1/like/toggle/c/98765 \
  -H "Authorization: Bearer <JWT_TOKEN>"
  ```

#### Toggle Tweet Like

- **Method**: `POST`

- **Path**: `/toggle/t/:tweetId`

- **Description**: Toggles like status for a tweet.

- **Middleware**: `toggleTweetLike`

- **Parameters**:

  - `tweetId` (path, required): Tweet ID.

- **Response**:

  - `200 OK`: Like status toggled successfully.

- **Example**:

  ```bash
  curl -X POST /api/v1/like/toggle/t/12345 \
  -H "Authorization: Bearer <JWT_TOKEN>"
  ```

#### Get Liked Videos

- **Method**: `GET`

- **Path**: `/videos`

- **Description**: Retrieves all videos liked by the authenticated user.

- **Middleware**: `getLikedVideos`

- **Response**:

  - `200 OK`: Returns list of liked videos.

- **Example**:

  ```bash
  curl -X GET /api/v1/like/videos \
  -H "Authorization: Bearer <JWT_TOKEN>"
  ```

### 8. Admin Dashboard (`/api/v1/dashboard`)

#### Get Channel Stats

- **Method**: `GET`

- **Path**: `/stats`

- **Description**: Retrieves statistics for a channel (e.g., views, likes, subscribers).

- **Middleware**: `getChannelStats`

- **Response**:

  - `200 OK`: Returns channel statistics.

- **Example**:

  ```bash
  curl -X GET /api/v1/dashboard/stats \
  -H "Authorization: Bearer <JWT_TOKEN>"
  ```

#### Get Channel Videos

- **Method**: `GET`

- **Path**: `/videos`

- **Description**: Retrieves all videos uploaded to a channel.

- **Middleware**: `getChannelVideos`

- **Response**:

  - `200 OK`: Returns list of channel videos.

- **Example**:

  ```bash
  curl -X GET /api/v1/dashboard/videos \
  -H "Authorization: Bearer <JWT_TOKEN>"
  ```

### 9. Healthcheck (`/api/v1/healthcheck`)

#### Healthcheck

- **Method**: `GET`

- **Path**: `/`

- **Description**: Checks the health of the API.

- **Middleware**: `healthcheck`

- **Response**:

  - `200 OK`: API is healthy.

- **Example**:

  ```bash
  curl -X GET /api/v1/healthcheck/
  ```

## Authentication

- **JWT**: Secured routes require a valid JWT token passed in the `Authorization` header as `Bearer <JWT_TOKEN>`.
- **Refresh Tokens**: Use the `/refresh-token` endpoint to obtain a new access token when the current one expires.

## File Uploads

- File uploads are handled using `multer` middleware.
- Supported file types: Images (JPEG, PNG), Videos (MP4).
- Files are temporarily stored locally before being uploaded to a cloud storage service (e.g., Cloudinary).

## Error Handling

- **400 Bad Request**: Invalid input or missing required fields.
- **401 Unauthorized**: Missing or invalid JWT token.
- **404 Not Found**: Resource (e.g., video, playlist, comment) not found.
- **500 Internal Server Error**: Unexpected server issues.

## Notes

- All endpoints assume JSON responses unless files are involved.
- File uploads require `multipart/form-data` content type.
- Secured routes require authentication via `verifyJWT` middleware.

The API uses Cloudinary for storing uploaded files (videos, thumbnails, avatars, cover images).
