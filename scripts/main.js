
const output = (fishes) => {
    fishes.forEach((fish) => {
      let article = document.createElement("article");

      let fishName = document.createElement("h2")
      fishName.textContent = fish["Species Name"];

      let fishImg = document.createElement("img");
      try {
        console.log(fish["Image Gallery"]["src"])
        fishImg.setAttribute("src", fish["Image Gallery"]["src"]);
        fishImg.setAttribute("alt", "No image available");
      } 
      catch {
        fishImg.setAttribute("src", "No image available");
        fishImg.setAttribute("alt", "No image available");
      }

      let fishScientificName = document.createElement("h3")
      fishScientificName.textContent = fish["Scientific Name"];
  
      let fishLocationInfo = document.createElement("h4");
      try {
        var location = fish["Location"].replace(/<\/?[^>]+(>|$)/g, "");
        location = location.replace("&nbsp;", "");
        fishLocationInfo.textContent = location;
      }
      catch {
          fishLocationInfo.textContent = "No Location Information"
      }

      article.appendChild(fishName);
      article.appendChild(fishImg);
      article.appendChild(fishScientificName);
      article.appendChild(fishLocationInfo);
  
      document.querySelector("#fishes").appendChild(article);
    });
  };

  const getFishes = async () => {
    const response = await fetch(
        "https://www.fishwatch.gov/api/species/?_limit=10"
        );
    fishes = await response.json();
    output(fishes);
  };
  
  getFishes();


  const clearFishes = () => {
    document.querySelector("#fishes").innerHTML = "";
  };


  
  const sortBy = () => {
    clearFishes();
  
    let filter = document.querySelector("#sortBy").value;
  
    switch (filter) {
      case "fishNameAscending":
        output(
          fishes.sort((fish1, fish2) => {
            let fishName1 = fish1.fishName.toLowerCase();
            let fishName2 = fish2.fishName.toLowerCase();
            if (fishName1 < fishName2) return -1;
            else if (fishName1 > fishName2) return 1;
            else return 0;
          })
        );
        break;
      case "fishNameDescending":
        output(
          fishes.sort((fish1, fish2) => {
            let fishName1 = fish1.fishName.toLowerCase();
            let fishName2 = fish2.fishName.toLowerCase();
            if (fishName1 > fishName2) return -1;
            else if (fishName1 < fishName2) return 1;
            else return 0;
          })
        );
        break;
      default:
        // using ternary operators
        output(
          fishes.sort((fish1, fish2) =>
            fish1.fishName.toLowerCase() > fish2.fishName.toLowerCase()
              ? 1
              : fish2.fishName.toLowerCase() >
                fish1.fishName.toLowerCase()
              ? -1
              : 0
          )
        );
        break;
    }
  };

  document.querySelector("#sortBy").addEventListener("change", sortBy);