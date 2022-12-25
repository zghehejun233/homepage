import axios from "axios";

export interface IpInfo {
  ip: string;
  city: string;
  region: string;
  country: string;
}

export const getIpInfo = async (): Promise<IpInfo> => {
  const ipInfo: IpInfo = {
    ip: "",
    city: "",
    region: "",
    country: "",
  };

  await axios.get("http://ip-api.com/json/").then((res) => {
    console.log(res.data);
    ipInfo.ip = res.data.query;
    ipInfo.city = res.data.city;
    ipInfo.region = getProvinceName(res.data.regionName);
    ipInfo.country = getCountryName(res.data.country);
  });
  return ipInfo;
};

// 将国家的英文名转换为中文名
const getCountryName = (country: string): string => {
  switch (country) {
    case "China":
      return "中国";
    case "United States":
      return "美国";
    case "Japan":
      return "日本";
    case "Germany":
      return "德国";
    case "France":
      return "法国";
    case "United Kingdom":
      return "英国";
    case "Canada":
      return "加拿大";
    case "Russia":
      return "俄罗斯";
    case "South Korea":
      return "韩国";
    case "Brazil":
      return "巴西";
    case "Australia":
      return "澳大利亚";
    case "India":
      return "印度";
    case "Italy":
      return "意大利";
    case "Spain":
      return "西班牙";
    case "Mexico":
      return "墨西哥";
    case "Indonesia":
      return "印度尼西亚";
    case "Netherlands":
      return "荷兰";
    case "Turkey":
      return "土耳其";
    case "Switzerland":
      return "瑞士";
    case "Saudi Arabia":
      return "沙特阿拉伯";
    case "Sweden":
      return "瑞典";
    case "Poland":
      return "波兰";
    case "Belgium":
      return "比利时";
    case "Austria":
      return "奥地利";
    case "Iran":
      return "伊朗";
    default:
      return country;
  }
};

// 将中国的省份拼音大写首字母转换为中文名
const getProvinceName = (province: string): string => {
  switch (province) {
    case "Anhui":
      return "安徽";
    case "Beijing":
      return "北京";
    case "Chongqing":
      return "重庆";
    case "Fujian":
      return "福建";
    case "Gansu":
      return "甘肃";
    case "Guangdong":
      return "广东";
    case "Guangxi":
      return "广西";
    case "Guizhou":
      return "贵州";
    case "Hainan":
      return "海南";
    case "Hebei":
      return "河北";
    case "Heilongjiang":
      return "黑龙江";
    case "Henan":
      return "河南";
    case "Hubei":
      return "湖北";
    case "Hunan":
      return "湖南";
    case "Jiangsu":
      return "江苏";
    case "Jiangxi":
      return "江西";
    case "Jilin":
      return "吉林";
    case "Liaoning":
      return "辽宁";
    case "Nei Mongol":
      return "内蒙古";
    case "Ningxia":
      return "宁夏";
    case "Qinghai":
      return "青海";
    case "Shaanxi":
      return "陕西";
    case "Shandong":
      return "山东";
    case "Shanghai":
      return "上海";
    case "Shanxi":
      return "山西";
    case "Sichuan":
      return "四川";
    case "Tianjin":
      return "天津";
    case "Xinjiang":
      return "新疆";
    case "Xizang":
      return "西藏";
    case "Yunnan":
      return "云南";
    case "Zhejiang":
      return "浙江";
    default:
      return province;
  }
};
