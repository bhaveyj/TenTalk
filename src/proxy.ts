import { NextRequest, NextResponse } from "next/server";
import { redis } from "./lib/redis";
import { nanoid } from "nanoid";

const MAX_ROOM_PARTICIPANTS = 3;

const BOT_UA_PATTERN =
  /(bot|crawler|spider|preview|facebookexternalhit|whatsapp|telegrambot|twitterbot|slackbot|discordbot|linkedinbot)/i;

const shouldSkipParticipantRegistration = (req: NextRequest) => {
  const userAgent = req.headers.get("user-agent") ?? "";
  const purpose = req.headers.get("purpose") ?? req.headers.get("sec-purpose") ?? "";
  const nextRouterPrefetch = req.headers.get("next-router-prefetch") ?? "";

  if (BOT_UA_PATTERN.test(userAgent)) return true;
  if (purpose.toLowerCase().includes("prefetch")) return true;
  if (nextRouterPrefetch) return true;

  return false;
};

export const proxy = async (req: NextRequest) => {
  const pathname = req.nextUrl.pathname;
  const roomMatch = pathname.match(/^\/room\/([^/]+)$/);

  if (!roomMatch) return NextResponse.redirect(new URL("/", req.url));

  const roomId = roomMatch[1];
  const meta = await redis.hgetall<{ connected: string[]; createdAt: number }>(
    `meta:${roomId}`
  );

  if (!meta)
    return NextResponse.redirect(new URL("/?error=room-not-found", req.url));

  if (shouldSkipParticipantRegistration(req)) {
    return NextResponse.next();
  }

  const existingToken = req.cookies.get("x-auth-token")?.value;

  if (existingToken && meta.connected.includes(existingToken)) {
    return NextResponse.next();
  }

  if (meta.connected.length >= MAX_ROOM_PARTICIPANTS) {
    return NextResponse.redirect(new URL("/?error=room-full", req.url));
  }

  const response = NextResponse.next();

  const token = nanoid();

  response.cookies.set("x-auth-token", token, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  await redis.hset(`meta:${roomId}`, {
    connected: [...meta.connected, token],
  });

  return response;
};

export const config = {
  matcher: "/room/:path*",
};
