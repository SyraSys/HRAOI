import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface UploadResult {
  url: string;
  publicId: string;
}

/**
 * Upload a file to Cloudinary
 * @param buffer - File buffer
 * @param folder - Cloudinary folder path
 * @param resourceType - Resource type ('image', 'raw', 'video', 'auto')
 * @returns Upload result with URL and public ID
 */
export async function uploadFile(
  buffer: Buffer,
  folder: string,
  resourceType: "image" | "raw" | "video" | "auto" = "auto"
): Promise<UploadResult> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folder,
        resource_type: resourceType,
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else if (result) {
          resolve({
            url: result.secure_url,
            publicId: result.public_id,
          });
        }
      }
    );

    uploadStream.end(buffer);
  });
}

/**
 * Delete a file from Cloudinary
 * @param publicId - Cloudinary public ID of the file
 * @param resourceType - Resource type ('image', 'raw', 'video', 'auto')
 */
export async function deleteFile(
  publicId: string,
  resourceType: "image" | "raw" | "video" | "auto" = "raw"
): Promise<void> {
  // If resourceType is 'auto', we try to delete as 'image' first, then 'raw'
  // because Cloudinary CLI/SDK doesn't support 'auto' for destruction
  if (resourceType === "auto") {
    try {
      const result = await cloudinary.uploader.destroy(publicId, {
        resource_type: "image",
        invalidate: true,
      });
      if (result.result === "ok") return;
    } catch (e) {
      // Fallback to raw
    }
    
    try {
      await cloudinary.uploader.destroy(publicId, {
        resource_type: "raw",
        invalidate: true,
      });
    } catch (e) {
      // Ignore errors during fallback
    }
    return;
  }

  try {
    await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
      invalidate: true,
    });
  } catch (e) {
    console.error("Cloudinary delete error:", e);
    // We don't throw here to allow database cleanup even if Cloudinary file is gone
  }
}

export default cloudinary;
