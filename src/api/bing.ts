import axios from "axios";

interface Bing {
  url: string;
}

export const getBing = async (): Promise<Bing> => {
  const bing: Bing = {
    url: "https://cn.bing.com/th?id=OHR.SnowyOwl_ZH-CN1193651608_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp",
  };
  await axios
    .get(" https://bing.biturl.top", {
      params: {
        resolution: "1920",
        format: "json",
        mkt: "zh-CN",
      },
    })
    .then((res) => {
      bing.url = res.data.url;
    })
    .catch((err) => {
      console.log(err);
      bing.url =
        "https://cn.bing.com/th?id=OHR.SnowyOwl_ZH-CN1193651608_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp";
    });
  return bing;
};
