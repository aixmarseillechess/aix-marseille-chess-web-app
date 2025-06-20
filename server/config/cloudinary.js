import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

// Configure Cloudinary
if (process.env.CLOUDINARY_API_KEY) {
  cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
  console.log('✅ Cloudinary configured successfully');
} else {
  console.log('⚠️ Cloudinary not configured - image uploads will be disabled');
}

// Upload image to Cloudinary
const uploadImage = async (fileBuffer, folder = 'aix-marseille-chess', mimeType = 'image/jpeg') => {
  try {
    // Check if Cloudinary is configured
    if (!process.env.CLOUDINARY_API_KEY) {
      throw new Error('Cloudinary not configured');
    }

    // Convert buffer to base64 string with proper MIME type
    const base64String = `data:${mimeType};base64,${fileBuffer.toString('base64')}`;
    
    const result = await cloudinary.v2.uploader.upload(base64String, {
      folder: folder,
      resource_type: 'auto',
      transformation: [
        { quality: 'auto:good' },
        { fetch_format: 'auto' }
      ]
    });

    return {
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Failed to upload image');
  }
};

// Delete image from Cloudinary
const deleteImage = async (publicId) => {
  try {
    const result = await cloudinary.v2.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw new Error('Failed to delete image');
  }
};

// Generate optimized image URL
const getOptimizedImageUrl = (publicId, options = {}) => {
  const defaultOptions = {
    quality: 'auto:good',
    fetch_format: 'auto',
    ...options
  };

  return cloudinary.v2.url(publicId, defaultOptions);
};

export {
  uploadImage,
  deleteImage,
  getOptimizedImageUrl
}; 