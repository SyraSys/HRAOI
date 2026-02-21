import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const bucketName = process.env.SUPABASE_STORAGE_BUCKET || "hraoi-assets";

export const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function uploadFile(
  file: File | Buffer,
  path: string,
  contentType?: string
) {
  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(path, file, {
      upsert: true,
      contentType: contentType,
      cacheControl: "3600",
    });

  if (error) {
    throw error;
  }

  const { data: urlData } = supabase.storage
    .from(bucketName)
    .getPublicUrl(data.path);

  return {
    url: urlData.publicUrl,
    path: data.path,
  };
}

export async function deleteFile(path: string) {
  const { error } = await supabase.storage.from(bucketName).remove([path]);

  if (error) {
    throw error;
  }
}
