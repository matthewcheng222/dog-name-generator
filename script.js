const prefixes = [ "Sir", "Lady", "Captain", "Dr.", "Count", "Major", "Professor", "Baron", "Duke", "General", "Lil'", "Big", "King", "Queen", "The Honorable", "Monsieur", "Dame", "Commander", "Reverend", "Admiral", "El", "Senor", "Master", "Miss", "Colonel", "Chief", "Judge", "Detective", "Agent", "Sheriff" ];

const firstNames = [ "Barky", "Fluffy", "Sniffles", "Wagster", "Drooly", "Chewie", "Sparky", "Ruff", "Muttley", "Furball", "Booper", "Snoot", "Nibbles", "Zoomie", "Bouncer", "Licky", "Pupper", "Snuggle", "Yapper", "Chonky", "Tater", "Pickles", "Biscuit", "Wiggly", "Mochi", "Tugboat", "Fudge", "Muzzle", "Goober", "Waffles", "Scoots", "Chubby" ];

const lastNames = [ "McSniff", "Von Wigglebutt", "the Destroyer", "McChonkface", "Pawsworth", "Doggo", "O'Fetch", "Tailwagger", "Barkowitz", "Fluffstein", "Snoutson", "Boopington", "Howlington", "Lickman", "Waggington", "Furzalez", "Barkley", "Snifferton", "McLick", "Pawson", "Von Zoom", "Noodleton", "Whiskerford", "Chompski", "Fleabag", "Snugglenose", "Picklepaws", "Snoreworthy", "Hufflebark", "McWoof", "Sprinklestein", "Slobberton", "Sir Wagsalot" ];

const generateButton = document.getElementById('generate-button');
const downloadButton = document.getElementById('download-button');
const nameDisplay = document.getElementById('name');
const image = document.getElementById('dog-image');
const historyList = document.getElementById('history-list');
const favoritesList = document.getElementById('favorites-list');

let currentName = '';
let currentImageUrl = '';

async function fetchRandomDogImage() {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error("Failed to fetch dog image:", error);
    return "https://via.placeholder.com/500x300?text=Dog+Not+Found";
  }
}

function addToHistory(name) {
  const div = document.createElement('div');
  div.className = 'name-item';
  const span = document.createElement('span');
  span.textContent = name;
  const favButton = document.createElement('button');
  favButton.textContent = '❤️ Favorite';
  favButton.onclick = () => addToFavorites(name);
  div.appendChild(span);
  div.appendChild(favButton);
  historyList.prepend(div);
}

function addToFavorites(name) {
  const div = document.createElement('div');
  div.className = 'name-item';
  const span = document.createElement('span');
  span.textContent = name;
  div.appendChild(span);
  favoritesList.prepend(div);
}

async function generateNameAndImage() {
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const first = firstNames[Math.floor(Math.random() * firstNames.length)];
  const last = lastNames[Math.floor(Math.random() * lastNames.length)];
  currentName = `${prefix} ${first} ${last}`;
  nameDisplay.textContent = currentName;

  image.style.opacity = 0;
  currentImageUrl = await fetchRandomDogImage();
  setTimeout(() => {
    image.src = currentImageUrl;
  }, 300);

  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });

  addToHistory(currentName);
}

image.addEventListener("load", () => {
  image.style.opacity = 1;
});

generateButton.addEventListener("click", generateNameAndImage);

downloadButton.addEventListener("click", () => {
  const canvas = document.createElement('canvas');
  canvas.width = 600;
  canvas.height = 400;
  const ctx = canvas.getContext('2d');

  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = currentImageUrl;
  img.onload = () => {
    ctx.drawImage(img, 0, 0, 600, 300);
    ctx.fillStyle = '#ff8c00';
    ctx.font = '30px Fredoka';
    ctx.fillText(currentName, 20, 350);
    const link = document.createElement('a');
    link.download = 'dog-name-card.png';
    link.href = canvas.toDataURL();
    link.click();
  };
});

window.onload = generateNameAndImage;