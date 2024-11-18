import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId } = await auth();
  const body = await req.json();

  const { name } = body;

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  if (!name) {
    return new NextResponse("Name is required", { status: 400 });
  }

  const store = await prismadb.store.create({
    data: {
      name: name,
      userId: userId,
    },
  });

  return NextResponse.json(store);
  try {
  } catch (error) {
    console.log("[STORE_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}