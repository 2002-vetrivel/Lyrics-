document.addEventListener('DOMContentLoaded', function() {
  const submit = document.getElementById('submit');

  submit.addEventListener('click', () => {
      const artist = document.getElementById('artist').value;
      const song = document.getElementById('song').value;
      const result = document.getElementById('result');

      if (artist.trim() === "" || song.trim() === "") {
          result.innerHTML = "Input field is empty";
          result.style.cssText = "color: red; font-family: Arial; font-weight: 600; font-style: italic;";
          return; 
      }

      fetch(`https://api.lyrics.ovh/v1/${artist}/${song}`)
          .then(response => {
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              return response.json();
          })
          .then(data => {
              if (data.lyrics) {
                  result.innerHTML = data.lyrics;
                  console.log(data.lyrics);
                  result.style.cssText = "background-color:ghostwhite";
              } else {
                  result.innerHTML = "Lyrics not found.";
              }
          })
          .catch(error => {
              console.error('There was a problem with the fetch operation:', error);
              result.innerHTML = "An error occurred. Please try again.";
              result.style.cssText = "color: black; font-family: Arial; font-weight: 600; font-style: italic;";
          });
  });
});
