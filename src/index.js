// Your code here
document.addEventListener('DOMContentLoaded', () => {
  const Bar = document.getElementById('character-bar');
  const Elementt = document.getElementById('name');
  const imageElement = document.getElementById('image');
  const voteCountElement = document.getElementById('vote-count');
  const Formm = document.getElementById('votes-form');
  const votesInput = document.getElementById('votes');
  const resetButton = document.getElementById('reset-btn');

 
 

  // Fetch characters data from the local server
  fetch('http://localhost:3000/characters')
    .then(response => response.json())
    .then(data => {
      characters = data;
      adeshBar();
      console.error('Error fetching characters:', error);
    });

  function adeshBar() {
    characters.forEach(character => {
      const characterNameSpan = document.createElement('span');
      characterNameSpan.innerText = character.name;
      //I appended characterNameSpan so as for user to see the character names
      Bar.appendChild(characterNameSpan);
      characterNameSpan.addEventListener('click', () => {
        selectCharacter(character);
      });
    
    });
  }

  function selectCharacter(character) {
    selectedCharacter = character;
    updateCharacterInfo();
  }

  function updateCharacterInfo() {
    if (selectedCharacter) {
      Elementt.innerText = selectedCharacter.name;
      imageElement.src = selectedCharacter.image;
      voteCountElement.innerText = selectedCharacter.votes;
    }
  }

  Formm.addEventListener('submit', (event) => {
    event.preventDefault();
    const votesToAdd = parseInt(votesInput.value);
    if (!isNaN(votesToAdd) && selectedCharacter) {
      selectedCharacter.votes += votesToAdd;
      voteCountElement.innerText = selectedCharacter.votes;

      
      updateVotes(selectedCharacter.id, selectedCharacter.votes);

      votesInput.value = '';
    }
  });

  resetButton.addEventListener('click', () => {
    if (selectedCharacter) {
      selectedCharacter.votes = 0;
      voteCountElement.innerText = 0;

      // Reset votes on the server
      updateVotes(selectedCharacter.id, 0);
    }
  });

  function updateVotes(id, votes) {
    fetch(`http://localhost:3000/characters/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ votes: votes })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Updated votes:', data);
      // Ensure the selectedCharacter is updated with the latest data
      selectedCharacter.votes = data.votes;
      updateCharacterInfo();
    })
    .catch(error => {
      console.error('Error updating votes:', error);
    });
  }



});