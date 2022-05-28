const output = (fishes) => {
    fishes.forEach((fish) => {
      let article = document.createElement("article");

      let fishName = document.createElement("h3")
      fishName.textContent = fish["Species Name"];
  
      let fishLocationInfo = document.createElement("h4");
      fishLocationInfo.textContent = fish["Location"].replace(/<\/?[^>]+(>|$)/g, "");

      article.appendChild(fishName);
      article.appendChild(fishLocationInfo);
  
      document.querySelector("#fishes").appendChild(article);
    });
  };

  const getFishes = async () => {
    const response = await fetch(
        "https://www.fishwatch.gov/api/species"
        );
    fishes = await response.json();
    output(fishes);
  };
  
  getFishes();
