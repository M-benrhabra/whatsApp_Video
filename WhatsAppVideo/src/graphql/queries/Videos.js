import {gql} from '@apollo/client';

const GET_VIDEOS = gql`
  query GetVideos {
    videos {
      data {
        id
        attributes {
          title
          picture {
            data {
              id
              attributes {
                name
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

export default GET_VIDEOS;
