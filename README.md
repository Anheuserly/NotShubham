# Notshubham - CityTalk 3D Plaza

A shared 3D city plaza where anyone can join, move with WASD, and chat in real time. Messages float above each character until their next message.

## Features

- 3D realtime plaza with low-poly buildings
- WASD / arrow key movement
- Always-on chat bubbles above characters
- Guest + email/password authentication (Appwrite)
- Customizable avatars (skin, hair, outfit colors)
- Realtime presence via Appwrite documents + subscriptions

## Appwrite Setup

Create a project, database, and two collections:

### Collection: `messages`
Attributes:
- `text` (string)
- `name` (string)
- `userId` (string)
- `isGuest` (boolean)
- `createdAt` (string)

Permissions (suggested):
- Read: `role:all`
- Create: `role:users`

### Collection: `profiles`
Attributes:
- `userId` (string)
- `name` (string)
- `x` (float)
- `z` (float)
- `avatarSkin` (string)
- `avatarHair` (string)
- `avatarOutfit` (string)
- `lastMessage` (string)
- `updatedAt` (string)

Permissions (suggested):
- Read: `role:all`
- Create: `role:users`
- Update: `role:users`

## Environment

Create `.env.local`:

```bash
NEXT_PUBLIC_APPWRITE_ENDPOINT="https://cloud.appwrite.io/v1"
NEXT_PUBLIC_APPWRITE_PROJECT_ID="YOUR_PROJECT_ID"
NEXT_PUBLIC_APPWRITE_DATABASE_ID="YOUR_DATABASE_ID"
NEXT_PUBLIC_APPWRITE_MESSAGES_COLLECTION_ID="YOUR_MESSAGES_COLLECTION_ID"
NEXT_PUBLIC_APPWRITE_PROFILES_COLLECTION_ID="YOUR_PROFILES_COLLECTION_ID"
```

## Development

```bash
npm install
npm run dev
```

## Notes

- Guest sessions are created automatically when someone sends their first message.
- Position updates are throttled to avoid spamming Appwrite.
