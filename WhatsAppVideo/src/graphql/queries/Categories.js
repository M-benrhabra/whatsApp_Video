import {gql} from '@apollo/client';

const GET_CATEGOREIS = gql`
  query GetCategories {
    categories {
      data {
        id
        attributes {
          title
          icon_name
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

export default GET_CATEGOREIS;
