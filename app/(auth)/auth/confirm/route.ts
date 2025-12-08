import { createClient } from "@/lib/supabase/server";
import { EmailOtpType } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");
  const type = url.searchParams.get("type") as EmailOtpType | null;
  const email = url.searchParams.get("email");

  if (!token || !type || !email) {
    return NextResponse.redirect(new URL("/error", process.env.APP_URL));
  }

  try {
    url.searchParams.delete("redirect_to");

    const supabase = await createClient();
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type,
    });
    console.log("verifyOtp result:", { data, error });

    if (error) {
      console.error("Supabase verifyOtp error:", error);
      return NextResponse.redirect(new URL("/error", process.env.APP_URL));
    }

    return NextResponse.redirect(new URL("/", process.env.APP_URL));
  } catch (err) {
    console.error("Unexpected error in confirm handler:", err);
    return NextResponse.redirect(new URL("/error", process.env.APP_URL));
  }
}
