"use client";
import { CldUploadButton,CloudinaryUploadWidgetResults } from 'next-cloudinary';
import { Upload } from 'lucide-react';
import { useResources } from '@/hooks/use-resources';
import {CloudinaryResources} from '@/types/cloudinary'

function UploadButton() {
    const {addResources} = useResources();
    //results contain all the resources including all information 
    function handleOnSuccess (results : CloudinaryUploadWidgetResults){
        addResources([results.info as CloudinaryResources])
    }
  return (
    <CldUploadButton signatureEndpoint="/api/sign-cloudinary-params"
    options={{
        autoMinimize : true,    ///inbuilt prop by library which auto close the upload popup
        tags :[String(process.env.NEXT_PUBLIC_CLOUDINARY_LIBRARY_TAG)]
    }}
    onSuccess={ handleOnSuccess}
    >
        <span className='flex gap-2 items-center'>
        <Upload className="w-4 h-4"/> Uploads
        </span>
    </CldUploadButton>

  )
}

export default UploadButton
