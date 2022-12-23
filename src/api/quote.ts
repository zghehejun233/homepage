import axios from "axios";

export const getQuote = async (): Promise<any> => {
  let quote = {
    text: "Loading...",
    from: "Loading...",
  };
  await axios
    .get("https://v1.hitokoto.cn", {
      params: {
        c: "a",
        max_length: 26,
        encode: "json",
      },
    })
    .then((res) => {
      quote = {
        text: res.data.hitokoto,
        from: res.data.from,
      };
      console.log(quote);
    })
    .catch((err) => {
      console.log(err);
    });
  console.log("returning quote" + quote);

  return quote;
};
