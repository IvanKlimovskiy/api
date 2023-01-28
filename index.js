const button = document.querySelector(".button");
const quote = document.querySelector(".quote");
const numberOfLettersQuote = document.querySelector(".number");
const image = document.querySelector(".image");
const regex = /[A-Za-z]/g;
const unsplashApi = "https://api.unsplash.com/photos/random?client_id=or3lTu7HvN52gM-dDrAjiH3HXbvZsqKAYbiDaAF61Os";
const kanyeApi = "https://api.kanye.rest";
const urlImage = document.querySelector('.url');
const buttonToClipBoard = document.querySelector('.clipboard')
const switcher = document.querySelector("input[type=checkbox]");
const switcherLightIcon = document.querySelector(".switcher__light");
const switcherDarkIcon = document.querySelector(".switcher__dark");
const page = document.querySelector(".page");

switcher.addEventListener("change", (event) => {
    if (event.target.checked) {
        page.classList.add("page_theme_dark")
        switcherLightIcon.src = "./images/light-dark.svg"
        switcherDarkIcon.src = "./images/dark-dark.svg"
    } else {
        page.classList.remove("page_theme_dark")
        switcherLightIcon.src = "./images/light.svg"
        switcherDarkIcon.src = "./images/dark.svg"
    }
})

const checkStatusOfResponse = (res) => {
    if (res.ok) {
        return res.json()
    } else {
        return Promise.reject(`Ошибка: ${res.status}`)
    }
}

const renderRandomImage = () => {
    return fetch(unsplashApi).then((res) => {
        return checkStatusOfResponse(res)
    })
};

const renderRandomQuote = () => {
    return fetch(kanyeApi).then((res) => {
        return checkStatusOfResponse(res)
    })
}

const copyToClipBoard = () => {
    urlImage.select();
    navigator.clipboard.writeText(urlImage.value)
        .then(() => {
            buttonToClipBoard.textContent = 'Скопировано'
            buttonToClipBoard.disabled = true;
        })
    setTimeout(() => {
        buttonToClipBoard.textContent = 'Скопировать в буфер обмена';
        buttonToClipBoard.disabled = false;
    }, 2000)
}

function updateQuoteAndImage() {
    renderRandomQuote().then((result) => {
        quote.textContent = result.quote;
        numberOfLettersQuote.textContent = result.quote.match(regex).length;
    });
    renderRandomImage().then((result) => {
        image.src = result.urls.regular;
        urlImage.textContent = result.urls.regular;
    });
}

buttonToClipBoard.addEventListener('click', copyToClipBoard)

button.addEventListener("click", updateQuoteAndImage);
updateQuoteAndImage();

