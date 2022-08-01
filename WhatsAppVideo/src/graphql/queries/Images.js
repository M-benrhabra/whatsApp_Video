import {gql} from '@apollo/client';

const GET_IMAGES = gql`
  query GetImages {
    images {
      data {
        id
        attributes {
          title
          picture {
            data {
              id
              attributes {
                name
                formats
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
