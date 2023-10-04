import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = "38816166-f921759e60a0931b2b81a2c9d"
export const axiosPixabeyFetch = async (search,page) => {
  return await axios.get(`${BASE_URL}?key=${API_KEY}&q=${search}&orientation=horizontal&per_page=12&page=${page}`).then(response => response.data);
//     {
//     method: 'get',
//     url: BASE_URL,
//     responseType: 'stream',
//     props: {
//       key: API_KEY,
//       q: search,
//       orientation: "horizontal",
//       per_page: 12
//     },
//   })
};
