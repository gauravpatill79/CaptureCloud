import MediaViewer from '@/components/MediaViewer';
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
//resource is server component
async function Resource({params} :{params : {assetId:string }}) {
  const {resources} = await cloudinary.api.resources_by_asset_ids(params.assetId);
  return (
    //media viewer is the component which is reponsible for the img opened onclick 
    <MediaViewer
      resource={resources[0]}
    />
  );
}

export default Resource;
