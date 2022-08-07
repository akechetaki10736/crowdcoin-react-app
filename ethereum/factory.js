import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x06114547EaD444621b6913e5411c506270686E31"
);

export default instance;