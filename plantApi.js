
// Handle the data when it comes back from the API and insert it into the html
  function updateHtml(data) {
    console.log('received data from API');
    
    // Title
    const titleDOM = document.querySelector('.plant__title');
        // get plant title
        dataTitle = data.suggestions[0].plant_name;

        // update HTML element with title
        titleDOM.textContent = dataTitle;


    // Image
    const imageDOM = document.querySelector('.plant__image');

        // get plant image
        dataImageUrl = data.suggestions[0].similar_images[0].url;

        // update HTML with new image src
        imageDOM.setAttribute('src', dataImageUrl);
  }



// class name of the button that sends the image the api
// (change if needed)
const sendButton = ".plant__sendButton";







// Magic stuff happens here. Don't touch or you'll break it! :D
document.querySelector(sendButton).onclick = function sendIdentification() {
    const files = [...document.querySelector("input[type=file]").files];
    const promises = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const res = event.target.result;
          console.log(res);
          resolve(res);
        };
        reader.readAsDataURL(file);
      });
    });
    Promise.all(promises).then((base64files) => {
      console.log(base64files);
      const data = {
        api_key: "8elQybbT8chQM6rbsHsae04Uz8vjSVLqpjnHSonsz3zBYIZCDk",
        images: base64files,
        modifiers: ["crops_fast", "similar_images"],
        plant_language: "en",
        plant_details: [
          "common_names",
          "url",
          "name_authority",
          "wiki_description",
          "taxonomy",
          "synonyms",
        ],
      };
      fetch("https://api.plant.id/v2/identify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          updateHtml(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
  };


