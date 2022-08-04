import {gql} from '@apollo/client';

const GET_VIDEOS_BY_CATEGORY = gql`
  query GetCategory($id: ID!) {
    category(id: $id) {
      data {
        id
        attributes {
          title
          videos {
            data {
              id
              attributes {
                title
                picture {
                  data {
                    attributes {
                      name
                      url
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

export default GET_VIDEOS_BY_CATEGORY;
