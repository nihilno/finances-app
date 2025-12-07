// app/(auth)/auth/confirm/route.ts
import { createClient } from "@/lib/supabase/server";
import { EmailOtpType } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");
  const type = url.searchParams.get("type") as EmailOtpType | null;
  const email = url.searchParams.get("email");
  const redirectTo = url.searchParams.get("redirect_to") ?? "/";

  if (!token || !type || !email) {
    // missing params → redirect to error
    return NextResponse.redirect(new URL("/error", request.url));
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp({
      email,
      token,
      type,
    });

    if (error) {
      console.error("Supabase verifyOtp error:", error);
      return NextResponse.redirect(new URL("/error", request.url));
    }

    // Successful — redirect user
    const redirectUrl = new URL(redirectTo, request.url);
    return NextResponse.redirect(redirectUrl);
  } catch (err) {
    console.error("Unexpected error in confirm handler:", err);
    return NextResponse.redirect(new URL("/error", request.url));
  }
}
