// Function to clear only the tiles
function clearTiles() {
    const tiles = document.querySelectorAll('.tile-card');
    tiles.forEach(tile => {
      tile.textContent = "";
});
}
  
  document.querySelector(".reset-button").addEventListener("click", clearTiles);
  