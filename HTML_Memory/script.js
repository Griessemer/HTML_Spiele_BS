const NUMBER_OF_PAIRS = 6;  // Anzahl der auszuwählenden Paare (also insgesamt 2*6 Karten)

const allImages = [
  'img/001_q.jpg', 'img/002_q.jpg', 'img/Kaernten_2024_005_q.jpg', 'img/Kaernten_2024_008_q.jpg', 'img/Kaernten_2024_012_q.jpg', 'img/Kaernten_2024_028_q.jpg', 'img/Kaernten_2024_029_q.jpg', 'img/Kaernten_2024_031_q.jpg', 'img/Kaernten_2024_032_q.jpg', 'img/Kaernten_2024_040_q.jpg', 'img/Kaernten_2024_042_q.jpg', 'img/Kaernten_2024_043_q.jpg', 'img/WhatsApp Image 2016-08-07_007_q.jpg', 'img/WhatsApp Image 2016-08-07_021_q.jpg', 'img/b92eafd2-0f43-4d6d-8e3a-4eb919956211_q.jpg'
];

function getRandomImages(arr, count) {
  const shuffled = arr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

let images = [];
let cards = [];
let flipped = [];
let matched = 0;
let startTime;
let selected = [];

function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

function createBoard() {
  const board = document.getElementById('game-board');
  board.innerHTML = '';
  selected = getRandomImages(allImages, NUMBER_OF_PAIRS);
  images = shuffle([...selected, ...selected]);

  cards = images.map((src, index) => ({
    id: index,
    src: src,
    matched: false
  }));
  startTime = new Date();
  matched = 0;
  document.getElementById('result').textContent = '';

  cards.forEach((card, index) => {
    const div = document.createElement('div');
    div.classList.add('card', 'hidden');
    div.dataset.index = index;
    div.addEventListener('click', onCardClick);
    board.appendChild(div);
  });
}

function onCardClick(e) {
  const index = e.currentTarget.dataset.index;
  const card = cards[index];
  const div = e.currentTarget;

  if (flipped.length === 2 || card.matched || flipped.includes(index)) return;

  div.classList.remove('hidden');
  div.innerHTML = `<img src="${card.src}" alt="Karte">`;
  flipped.push(index);

  if (flipped.length === 2) {
    setTimeout(checkMatch, 1000);
  }
}

function checkMatch() {
  const [i1, i2] = flipped;
  const c1 = cards[i1], c2 = cards[i2];
  const div1 = document.querySelector(`[data-index='${i1}']`);
  const div2 = document.querySelector(`[data-index='${i2}']`);

  if (c1.src === c2.src) {
    c1.matched = true;
    c2.matched = true;
    matched += 1;

    if (matched === NUMBER_OF_PAIRS) {
      const duration = Math.floor((new Date() - startTime) / 1000);
      const minutes = Math.floor(duration / 60);
      const seconds = duration % 60;
      document.getElementById('result').textContent =
        `🎉 Alle Paare gefunden! Zeit: ${minutes}m ${seconds}s`;
    }
  } else {
    div1.classList.add('hidden');
    div2.classList.add('hidden');
    div1.innerHTML = '';
    div2.innerHTML = '';
  }
  flipped = [];
}

document.getElementById('restart-button').addEventListener('click', createBoard);
createBoard();
