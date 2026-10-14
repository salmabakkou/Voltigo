/**
 * Upload a file to Cloudinary using an unsigned upload preset.
 * Automatically chooses the correct resource_type:
 *   - "image" for images (jpg, png, webp, gif…)
 *   - "raw"   for PDFs and other documents
 *
 * @param {File}   file
 * @param {string} folder  - Cloudinary folder (e.g. "voltigo/documents")
 * @returns {Promise<string>} secure_url of the uploaded asset
 */
export async function uploadToCloudinary(file, folder = "voltigo/documents") {
    const cloudName   = "dodacbzhu"; // from NEXT_PUBLIC_CLOUDINARY_URL
    const uploadPreset = process.env.NEXT_PUBLIC_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
        throw new Error(
            "Cloudinary is not configured. Check NEXT_PUBLIC_CLOUDINARY_URL and NEXT_PUBLIC_UPLOAD_PRESET in .env"
        );
    }

    // Determine resource_type based on MIME type
    const isPdf   = file.type === "application/pdf";
    const isImage = file.type.startsWith("image/");
    const resourceType = isPdf ? "raw" : isImage ? "image" : "auto";

    const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    formData.append("folder", folder);

    const res = await fetch(uploadUrl, {
        method: "POST",
        body: formData,
    });

    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error?.message || `Cloudinary upload failed (${res.status})`);
    }

    const data = await res.json();
    return data.secure_url;
}
