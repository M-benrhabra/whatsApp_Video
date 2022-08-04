import {gql} from '@apollo/client';

const GET_TRENDING_BY_CATEGORY = gql`
  query GetCategory($id: ID!) {
    category(id: $id) {
      data {
        id
        attributes {
          title
          videos(filters: {trend: {eq: true}}) {
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

export default GET_TRENDING_BY_CATEGORY;
