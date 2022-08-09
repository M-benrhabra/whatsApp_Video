import {gql} from '@apollo/client';

const GET_TRENDING_VIDEOS = gql`
  query GetTrendigVideos {
    videos(filters:{trend: {eq : true}, and:{published:{eq:true}}})  {
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

export default GET_TRENDING_VIDEOS;
