import type { SupabaseClient } from "@supabase/supabase-js";

export type SignedUrlData = { signedUrl: string } | null;
export type SafeSignedUrlResult = { data: SignedUrlData; error: Error | null };

export async function safeCreateSignedUrl(
  storage: SupabaseClient["storage"],
  bucket: string,
  path?: string | null,
  expires = 60,
): Promise<SafeSignedUrlResult> {
  if (!path || typeof path !== "string") {
    console.warn("safeCreateSignedUrl: invalid path", { bucket, path });
    return { data: null, error: new Error("invalid path for signed url") };
  }

  try {
    const { data, error } = await storage
      .from(bucket)
      .createSignedUrl(path, expires);
    return {
      data: data ?? null,
      error: error ? new Error(error.message) : null,
    };
  } catch (err) {
    console.error("safeCreateSignedUrl threw:", err, { bucket, path });
    return {
      data: null,
      error: err instanceof Error ? err : new Error(String(err)),
    };
  }
}
