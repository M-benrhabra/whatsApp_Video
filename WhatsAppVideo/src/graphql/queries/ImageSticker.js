import {gql} from '@apollo/client';

const GET_IMAGE_BY_CATEGORY = gql`
  query GetCategory($id: ID!) {
    category(id: $id) {
      data {
        id
        attributes {
          title
          images {
            data {
              id
              attributes {
                title
                picture {
                  data {
                    attributes {
                      name
                      formats
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default GET_IMAGE_BY_CATEGORY;
