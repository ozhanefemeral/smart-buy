// lib/errors.ts

import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export function handleError(message: string, statusCode: number) {
  return redirect("/404");
}
