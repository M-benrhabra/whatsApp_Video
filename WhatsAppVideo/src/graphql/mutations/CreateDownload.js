import { gql } from "@apollo/client";

const CREATE_DOWNLOAD= gql`
    mutation createDownloadIm($title:String, $description:String, $picture:[ID], $published: Boolean, $categories:[ID]){
    createDownload(data:
      {title:$title, description:$description, picture:$picture, 
      published:$published, categories:$categories}){
      data{
        id
      }
    }
  }
`;

export default CREATE_DOWNLOAD