/* 
YouTube First Call to ChannelId
¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯

YouTube Get Details from Ids
¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯
*/
import axios from 'axios';

const SearchKey = "AIzaSyB6TDiesYuXK36ogjLqcC5myC6MKACe9Uo"
const ChannelId = "UCO9XI15xOtOyEWOYpn0whDA"

const ChannelList = {
  listarCanal(results,pageToken) {
    return axios.get(`https://www.googleapis.com/youtube/v3/search?key=${SearchKey}&part=snippet&channelId=${ChannelId}&maxResults=${results}&pageToken=${pageToken}`);
  },
  listarIds(ids) {
    return axios.get(`https://www.googleapis.com/youtube/v3/videos?key=${SearchKey}&part=statistics,contentDetails,snippet&id=${ids}`);
  }
};
  
export default ChannelList;