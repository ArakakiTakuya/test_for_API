import React, { useEffect } from "react";
const axios = require("axios");

function App() {
  useEffect(() => {
    getData();
  }, []);

  const prefecture = [
    "北海道",
    "青森県",
    "岩手県",
    "宮城県",
    "秋田県",
    "山形県",
    "福島県",
    "茨城県",
    "栃木県",
    "群馬県",
    "埼玉県",
    "千葉県",
    "東京都",
    "神奈川県",
    "新潟県",
    "富山県",
    "石川県",
    "福井県",
    "山梨県",
    "長野県",
    "岐阜県",
    "静岡県",
    "愛知県",
    "三重県",
    "滋賀県",
    "京都府",
    "大阪府",
    "兵庫県",
    "奈良県",
    "和歌山県",
    "鳥取県",
    "島根県",
    "岡山県",
    "広島県",
    "山口県",
    "徳島県",
    "香川県",
    "愛媛県",
    "高知県",
    "福岡県",
    "佐賀県",
    "長崎県",
    "熊本県",
    "大分県",
    "宮崎県",
    "鹿児島県",
    "沖縄県",
  ];

  async function getData() {
    const res = await axios({
      method: "GET",
      url: "https://tripadvisor1.p.rapidapi.com/locations/search",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
        "x-rapidapi-key": "YOUR_API_KEY", // APIキーを入力。
        useQueryString: true,
      },
      params: {
        limit: "30",
        offset: "0", //どこからどこまでか。今は0~29
        lang: "ja_JP",
        query: prefecture[0], //都道府県名を入力
      },
    });

    const data = res.data.data
      .filter((obj) => obj.result_type === "things_to_do") //ここでフィルター。今は観光スポットが取れてる。lodgingでホテル。restaurantsでレストラン情報が取れる。
      .map((obj) => {
        return {
          name: obj.result_object.name,
          location: {
            lat: Number(obj.result_object.latitude),
            lng: Number(obj.result_object.longitude),
          },
          image: obj.result_object.photo["images"]["small"]["url"],
          category: obj.result_object.category["name"],
          rating: obj.result_object.rating,
          //review: obj.review_snippet["snippet"], // 観光地説明のようなもの。これがある県とない県があるため今はコメントアウト中。
        };
      });

    console.log(data);
    console.log(JSON.stringify(data));
  }

  return <div className="App"></div>;
}

export default App;
