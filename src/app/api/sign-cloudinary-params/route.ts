import { v2 as cloudinary } from "cloudinary";
//
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  const body = await request.json();
  const { paramsToSign } = body;
    console.log(body);
    
  //signature = hashed string that is used to verify the authenticity and integrity of the data being sent to Cloudinary's servers
  const apiSecret = process.env.CLOUDINARY_API_SECRET || "defaultSecret";
  const signature = cloudinary.utils.api_sign_request(paramsToSign,apiSecret);
    
  return Response.json({ signature });
}