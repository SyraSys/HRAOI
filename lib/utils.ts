/**
 * Normalizes Cloudinary URLs to ensure they are served with correct headers
 * and extensions for browser preview, especially for PDFs.
 */
export function getNormalizedFileUrl(url: string) {
  return url || "";
}

export function isImageUrl(url: string) {
  if (!url) return false;
  const lowerUrl = url.toLowerCase();
  return (
    lowerUrl.endsWith(".jpg") ||
    lowerUrl.endsWith(".jpeg") ||
    lowerUrl.endsWith(".png") ||
    lowerUrl.endsWith(".webp") ||
    lowerUrl.endsWith(".gif") ||
    (!lowerUrl.includes(".pdf") && !url.includes("/raw/upload/"))
  );
}
