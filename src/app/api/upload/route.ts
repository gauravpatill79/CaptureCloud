//This file is used as Upload Route 
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const { url, publicId,tags =[] } = await request.json();
    
    const uploadOptions: Record<string, string | boolean | Array<string>> = {};
    if (typeof publicId === 'string') {
      uploadOptions.public_id = publicId;
      uploadOptions.invalidate = true;
    }else{
      uploadOptions.tags = [String(process.env.NEXT_PUBLIC_CLOUDINARY_LIBRARY_TAG),...tags]
    }
    const results = await cloudinary.uploader.upload(url, uploadOptions);
    return new Response(JSON.stringify({
      data: results
    }), { status: 200 });
  } catch (error) {
    console.error('Error in POST route:', error);
    return new Response(JSON.stringify({
      error: 'Failed to upload image'
    }), { status: 500 });
  }
}