import {gql} from '@apollo/client';

const GET_IMAGES = gql`
  query GetImages {
    images(pagination: { page: 1, pageSize: 20 }, filters:{published:{eq:true}}) {
      data {
        id
        attributes {
          title
          picture{
            data {
              id
              attributes {
                name
                formats
                ext
                url
              }
            }
          }
        }
      }
      meta {
        pagination {
          page
          pageSize
          total
          pageCount
        }
      }
    }
  }
`;

export default GET_IMAGES;
