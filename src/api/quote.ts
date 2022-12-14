import axios from "axios";

export interface Quote {
  text: string;
  from: string;
  who?: string;
  uuid: string;
}

const category = ["a", "b", "c", "d", "e", "f", "h", "i", "j", "k"];

export const getQuote = async (): Promise<Quote> => {
  let quote: Quote = {
    text: "Loading...",
    from: "Loading...",
    who: undefined,
    uuid: "Loading...",
  };
  await axios
    .get("https://v1.hitokoto.cn", {
      params: {
        c: category[Math.floor(Math.random() * category.length)],
        max_length: 26,
        encode: "json",
      },
    })
    .then((res) => {
      quote = {
        text: res.data.hitokoto,
        from: res.data.from,
        who: res.data.from_who,
        uuid: res.data.uuid,
      };
    })
    .catch((err) => {
      console.log(err);
    });

  return quote;
};
