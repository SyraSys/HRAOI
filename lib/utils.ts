/**
 * Normalizes Cloudinary URLs to ensure they are served with correct headers
 * and extensions for browser preview, especially for PDFs.
 */
export function getNormalizedFileUrl(url: string) {
  if (!url) return "";

  // If it's a Cloudinary URL
  if (url.includes("cloudinary.com")) {
    const secureUrl = url.replace("http://", "https://");
    const isPdf = secureUrl.toLowerCase().includes(".pdf");
    const isImageUpload = secureUrl.includes("/image/upload/");

    // For image/upload/ resources (which include PDFs uploaded as images), 
    // ensuring the .pdf extension helps with browser preview.
    if (isImageUpload && isPdf && !secureUrl.toLowerCase().endsWith(".pdf")) {
      return secureUrl + ".pdf";
    }

    return secureUrl;
  }

  return url;
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
