import {gql} from '@apollo/client';

const GET_IMAGE_BY_CATEGORY = gql`
  query GetCategory($id: ID!) {
    category(id: $id) {
      data {
        id
        attributes {
          title
          images(pagination: { page: 1, pageSize: 20 },filters:{published:{eq:true}}){
            data {
              id
              attributes {
                title
                picture {
                  data {
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
          }
        }
      }
    }
  }
`;

export default GET_IMAGE_BY_CATEGORY;
