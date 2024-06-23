import { useQuery, useQueryClient } from '@tanstack/react-query';
import {CloudinaryResources} from '@/types/cloudinary'

interface UseResources {
    initialResources ?: Array<CloudinaryResources>;
    disabledFetch ?: boolean;
    tag? : string;
}

export function useResources(options ?: UseResources){
  const queryClient = useQueryClient();
  const {disabledFetch = false } = options || {};
    const {data : resources} =  useQuery({
        queryKey : ['resources',options?.tag],
        queryFn : async ()=>{
          const {data} = await fetch ('/api/resources').then(r => r.json());
          return data;
        },
        initialData : options?.initialResources,
        enabled : !disabledFetch
      })
      // function used to pass the resources to query-data
      function addResources(results : Array<CloudinaryResources>){
        //merging the old data with new one & by doing this we refresh the data as soon as it gets uploaded
        //so no need to refresh the page 
        queryClient.setQueryData(['resources',String(process.env.NEXT_PUBLIC_CLOUDINARY_LIBRARY_TAG)],(old:Array<CloudinaryResources>)=>{
          return [...results,...old]
        })
        //validating if the new data is being published or not 
        queryClient.invalidateQueries({
          queryKey : ['resources',String(process.env.NEXT_PUBLIC_CLOUDINARY_LIBRARY_TAG)]
        })
      }
      return {
        resources,
        addResources
      }
}
