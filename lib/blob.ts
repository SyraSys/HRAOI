import { put, del } from "@vercel/blob";

export interface UploadResult {
  url: string;
  publicId: string; // Vercel blob URL itself can act as the unique identifier for deletion
}

/**
 * Upload a file to Vercel Blob
 * @param buffer - File buffer
 * @param filename - Original filename
 * @param folder - Folder path (e.g., 'gallery')
 * @returns Upload result with URL and public ID
 */
export async function uploadFile(
  buffer: Buffer,
  filename: string,
  folder: string
): Promise<UploadResult> {
  // Construct the path, e.g. "gallery/my-image.jpg"
  const blobPath = folder ? `${folder}/${filename}` : filename;
  
  const blob = await put(blobPath, buffer, {
    access: "public",
  });

  return {
    url: blob.url,
    publicId: blob.url, // For Vercel Blob, the URL is used to delete the blob
  };
}

/**
 * Delete a file from Vercel Blob
 * @param publicId - The blob URL
 */
export async function deleteFile(publicId: string): Promise<void> {
  try {
    if (publicId) {
      await del(publicId);
    }
  } catch (e) {
    console.error("Vercel Blob delete error:", e);
    // Don't throw to allow DB cleanup even if blob is already gone
  }
}
