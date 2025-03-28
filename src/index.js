document.addEventListener("DOMContentLoaded", () => {
  fetchCharacters();
});

// Fetch all characters from db.json
function fetchCharacters() {
  fetch("http://localhost:3000/characters")
      .then(response => response.json())
      .then(data => displayCharacterNames(data))
      .catch(error => console.error("Error fetching characters:", error));
}

// Display character names in the character bar
function displayCharacterNames(characters) {
  const characterBar = document.getElementById("character-bar");
  characterBar.innerHTML = ""; // Clear previous content

  characters.forEach(character => {
      const span = document.createElement("span");
      span.textContent = character.name;
      span.style.cursor = "pointer";
      span.style.marginRight = "10px";
      span.addEventListener("click", () => displayCharacterInfo(character));
      characterBar.appendChild(span);
  });
}

// Display character details when clicked
function displayCharacterInfo(character) {
  document.getElementById("name").textContent = character.name;
  document.getElementById("image").src = character.image;
  document.getElementById("image").alt = character.name;
  document.getElementById("vote-count").textContent = character.votes;

  // Handle voting button click
  document.getElementById("vote-btn").onclick = () => {
      character.votes++;
      document.getElementById("vote-count").textContent = character.votes;
      updateVotes(character.id, character.votes);
  };

  // Handle reset votes button
  document.getElementById("reset-btn").onclick = () => {
      character.votes = 0;
      document.getElementById("vote-count").textContent = character.votes;
      updateVotes(character.id, character.votes);
  };
}

// Update votes in db.json via PATCH request
function updateVotes(characterId, newVotes) {
  fetch(`http://localhost:3000/characters/${characterId}`, {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({ votes: newVotes })
  })
  .catch(error => console.error("Error updating votes:", error));
}
