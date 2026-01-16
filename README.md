# 🛡️ TenTalk

A **private, self-destructing chat room** application built with modern web technologies. Create secure, ephemeral chat rooms that automatically destroy themselves after 10 minutes.

![Next.js](https://img.shields.io/badge/Next.js-16.1-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss)

## ✨ Features

- **🔒 Private Rooms** - Each room gets a unique ID and is completely isolated
- **⏱️ Self-Destructing** - Rooms auto-destruct after 10 minutes, permanently deleting all messages
- **💣 Instant Destroy** - Manually destroy a room at any time with one click
- **👤 Anonymous Identity** - Auto-generated anonymous usernames (e.g., `anonymous-wolf-x7k2m`)
- **⚡ Real-time Messaging** - Instant message delivery using Upstash Realtime
- **🎨 Modern UI** - Clean, terminal-inspired dark theme with JetBrains Mono font
- **📋 Easy Sharing** - Copy room link to clipboard with one click

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| [Next.js 16](https://nextjs.org/) | React framework with App Router |
| [React 19](https://react.dev/) | UI library with React Compiler |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe JavaScript |
| [Tailwind CSS 4](https://tailwindcss.com/) | Utility-first CSS |
| [Elysia](https://elysiajs.com/) | Type-safe API layer |
| [Upstash Redis](https://upstash.com/redis) | Serverless Redis for data storage |
| [Upstash Realtime](https://upstash.com/docs/redis/sdks/ts/realtime/overview) | Real-time WebSocket events |
| [TanStack Query](https://tanstack.com/query) | Server state management |
| [Zod](https://zod.dev/) | Schema validation |
| [nanoid](https://github.com/ai/nanoid) | Unique ID generation |

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- [Upstash Redis](https://upstash.com/) account

### Environment Variables

Create a `.env.local` file in the root directory:

```env
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
```

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/realtime_chat.git
cd realtime_chat

# Install dependencies
bun install

# Run the development server
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to start using TenTalk.

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx              # Lobby - create rooms
│   ├── layout.tsx            # Root layout with providers
│   ├── globals.css           # Global styles
│   ├── room/
│   │   └── [roomId]/
│   │       └── page.tsx      # Chat room interface
│   └── api/
│       ├── [[...slugs]]/
│       │   ├── route.ts      # Elysia API routes
│       │   └── auth.ts       # Authentication middleware
│       └── realtime/
│           └── route.ts      # Upstash Realtime handler
├── components/
│   └── providers.tsx         # React Query provider
├── hooks/
│   └── use-username.ts       # Anonymous username hook
└── lib/
    ├── client.ts             # Elysia Eden client
    ├── redis.ts              # Upstash Redis instance
    ├── realtime.ts           # Realtime schema & events
    └── realtime-client.ts    # Client-side realtime hook
```

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/room/create` | Create a new chat room |
| `GET` | `/api/room/ttl` | Get room time-to-live |
| `DELETE` | `/api/room` | Destroy a room immediately |
| `POST` | `/api/messages` | Send a message |
| `GET` | `/api/messages` | Get all messages in a room |
| `GET` | `/api/realtime` | WebSocket connection for real-time events |

## 🎯 How It Works

1. **Create Room** - Click "CREATE SECURE ROOM" to generate a new private room
2. **Share Link** - Copy the room URL and share it with others
3. **Chat** - Send messages that appear instantly for all participants
4. **Auto-Destruct** - Watch the countdown timer; room destroys at 0:00
5. **Manual Destroy** - Click "DESTROY NOW" to immediately delete everything

## 🔐 Security Features

- **Token-based Authentication** - Each user gets a unique token stored in cookies
- **Room Isolation** - Messages are scoped to individual rooms
- **No Persistence** - All data is deleted when the room expires
- **Anonymous by Default** - No accounts, no tracking, no history

## 📜 Scripts

```bash
bun dev      # Start development server
bun build    # Build for production
bun start    # Start production server
bun lint     # Run ESLint
```

## 🌐 Deployment

Deploy easily on [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import the project on Vercel
3. Add your environment variables
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/realtime_chat)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---
