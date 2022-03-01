const cards = document.querySelectorAll(".card");
let cardOne, cardTow;
let disableDeck = false;
var matchedCard = 0;
function flipCard(e) {
  let clickedCard = e.target;
  if (clickedCard !== cardOne && !disableDeck) {
    clickedCard.classList.add("flip");
    if (!cardOne) {
      return (cardOne = clickedCard);
    }
    cardTow = clickedCard;
    disableDeck = true;
    let cardOneImg = cardOne.querySelector("img").src,
      cardTowImg = cardTow.querySelector("img").src;
    matchCards(cardOneImg, cardTowImg);
  }
}
function matchCards(img1, img2) {
  if (img1 == img2) {
    matchedCard++;
    if (matchedCard == 8) {
      setTimeout(() => {
        return shuffleCard();
      }, 1000);
    }
    cardOne.removeEventListener("click", flipCard);
    cardTow.removeEventListener("click", flipCard);
    cardOne = cardTow = "";
    disableDeck = false;
    return;
  }
  setTimeout(() => {
    cardOne.classList.add("shake");
    cardTow.classList.add("shake");
  }, 400);
  setTimeout(() => {
    cardOne.classList.remove("shake", "flip");
    cardTow.classList.remove("shake", "flip");
    cardOne = cardTow = "";
    disableDeck = false;
  }, 1200);
}
function shuffleCard() {
  matchedCard = 0;
  cardOne = cardTow = "";
  disableDeck = false;
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
  arr.sort(() => (Math.random() > 0.5 ? 1 : -1));
  cards.forEach((card, index) => {
    card.classList.remove("flip");
    let imgTag = card.querySelector("img");
    imgTag.src = `images/img-${arr[index]}.png`;
    card.addEventListener("click", flipCard);
  });
}
shuffleCard();
cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});
