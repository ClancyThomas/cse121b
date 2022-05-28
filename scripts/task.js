const output = (fishes) => {
    fishes.forEach((fish) => {
      let article = document.createElement("article");

      let fishName = document.createElement("h3")
      fishName.textContent = fish["Species Name"];

      let fishScientificName = document.createElement("h4")
      fishScientificName.textContent = fish["Scientific Name"];
  
      let fishLocationInfo = document.createElement("h5");
      try {
        var location = fish["Location"].replace(/<\/?[^>]+(>|$)/g, "");
        location = location.replace("&nbsp;", "");
        fishLocationInfo.textContent = location;
      }
      catch {
          fishLocationInfo.textContent = "None"
      }

      article.appendChild(fishName);
      article.appendChild(fishScientificName);
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
