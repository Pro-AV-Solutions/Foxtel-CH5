document.addEventListener("DOMContentLoaded", function () {
  const sourcesSub = document.getElementById("sources-sub");
  const foxSub = document.getElementById("fox-sub");
  const fetchSub = document.getElementById("fetch-sub"); // in case you want it later
  const foxSourceBtn = document.getElementById("src2");  // Foxtel source icon
  const fetchSourceBtn = document.getElementById("src1"); // Fetch icon
  const remoteBackBtn = document.getElementById("remote-to-sources-btn");

  function showSourcesPage() {
    if (sourcesSub) sourcesSub.style.display = "block";
    if (foxSub) foxSub.style.display = "none";
    if (fetchSub) fetchSub.style.display = "none";
  }

  function showFoxRemotePage() {
    if (sourcesSub) sourcesSub.style.display = "none";
    if (foxSub) foxSub.style.display = "grid"; // Foxtel remote + channels
    if (fetchSub) fetchSub.style.display = "none";
  }

  function showFetchRemotePage() {
    if (sourcesSub) sourcesSub.style.display = "none";
    if (foxSub) foxSub.style.display = "none";
    if (fetchSub) fetchSub.style.display = "grid"; // Fetch remote + channels
  }

  // Start on Sources page
  showSourcesPage();

  // When Foxtel icon tapped -> go to Foxtel remote page
  if (foxSourceBtn) {
    foxSourceBtn.addEventListener("click", showFoxRemotePage);
  }

  // When Fetch icon tapped -> go to Fetch remote page (optional)
  if (fetchSourceBtn) {
    fetchSourceBtn.addEventListener("click", showFetchRemotePage);
  }

  // "Sources" button on remote -> go back to main Sources page
  if (remoteBackBtn) {
    remoteBackBtn.addEventListener("click", showSourcesPage);
  }
});
