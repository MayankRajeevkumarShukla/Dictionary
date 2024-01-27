let input = document.querySelector(".input");
let search = document.querySelector(".sbtn");
let content = document.querySelector(".container");
let hbtn = document.querySelector(".hbtn");
let historyContainer = document.querySelector(".historyContainer");


let cardHistory = [];

const find = () => {
    let api = `https://api.dictionaryapi.dev/api/v2/entries/en/${input.value}`;

    fetch(api)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            let div = document.createElement('div');
            div.classList.add('divChild');
            div.innerHTML = `<h3>Word: ${input.value}</h3><p>Definition: ${data[0]?.meanings[0]?.definitions[0]?.definition}</p>`;
            content.appendChild(div);

            let btn = document.createElement('button');
            btn.classList.add("btnChild");
            btn.innerHTML = `<img src="delete.png" ></img>`;
            btn.addEventListener("click", () => {
               
                content.removeChild(div);

                cardHistory.push({ word: input.value, definition: div.textContent });
            });
            div.appendChild(btn);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            content.textContent = "Error fetching definition.";
        });
};

const recreateCardsFromHistory = () => {
    content.innerHTML = "";

   
    cardHistory.forEach((cardInfo) => {
        let div = document.createElement('div');
        div.classList.add('divChild');

        
        div.innerHTML = `<h3>Word: ${cardInfo.word}</h3><p>Definition: ${cardInfo.definition}</p>`;
        content.appendChild(div);

        let btn = document.createElement('button');
        btn.classList.add("btnChild");
        btn.innerHTML = `<img src="delete.png" ></img>`;
        btn.addEventListener("click", () => {
           
            content.removeChild(div);

            cardHistory.push({ word: cardInfo.word, definition: cardInfo.definition });

            
            saveToLocalStorage();
        });
        div.appendChild(btn);
    });
};

search.addEventListener("click", find);

hbtn.addEventListener("click", () => {
    
    historyContainer.classList.toggle("hidden");

   
    if (!historyContainer.classList.contains("hidden")) {
       
        content.innerHTML = "";

        
        recreateCardsFromHistory();
    }
});
