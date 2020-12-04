import { useEffect, useState } from "react";

const url_es =
  "https://gist.githubusercontent.com/jhonatan89/e379fadf8ed0f5381a2d8f8f3dea90c3/raw/e2bc20df02828d297f99558551e37959ac97a6f8/pokemon-es.json";
const url_en =
  "https://gist.githubusercontent.com/jhonatan89/2089276d3ce0faceff8e55fc3459b818/raw/30ee1a77b3e328108faaaa9aaac6f2ddaa3d3711/pokemons-en.json";

export default function GetData() {
  const [data, setData] = useState();
  let url = url_en;

  if (navigator.language.startsWith("es")) {
    url = url_es;
  }

  useEffect(() => {
    if (!navigator.onLine) {
      if (localStorage.getItem("pokemon") === null) {
        setData([]);
      } else {
        setData(JSON.parse(localStorage.getItem("pokemon")));
      }
    } else {
      fetch(url)
        .then((res) => res.json())
        .then((res) => {
          setData(res);
          localStorage.setItem("pokemon", JSON.stringify(res));
        });
    }
  }, [url]);

  return [data];
}
