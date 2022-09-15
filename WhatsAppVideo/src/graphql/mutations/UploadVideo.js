import { gql } from "@apollo/client";

const FILE_UPLOAD= gql`
mutation singleImageUpload($file: Upload!){
   upload(file:$file){
     data{
       id
     }
   }
 }
`;

export default FILE_UPLOAD