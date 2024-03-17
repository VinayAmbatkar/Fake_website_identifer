// Function to verify a website
async function verifyWebsite() {
  const url = document.getElementById('urlInput').value;
  const resultElement = document.getElementById('verificationResult');
  const loadingGif = document.getElementById('loadingGif');
  const successGif = document.getElementById('successGif');
  const failedGif = document.getElementById('failedGif');

  console.log("Verifying website:", url);

  // Show loading GIF
  loadingGif.style.display = 'block';
  // Hide other GIFs
  successGif.style.display = 'none';
  failedGif.style.display = 'none';

  // Perform website verification
  isFakeWebsite(url, function(isFake) {
    console.log("Verification result:", isFake);

    // Hide loading GIF after verification
    loadingGif.style.display = 'none';

    if (isFake) {
      // Show failed GIF and set result message
      failedGif.style.display = 'block';
      resultElement.innerHTML = '<p style="color: red;">Website verification failed. It may be potentially pirated or unsafe.</p>';
    } else {
      // Show success GIF and set result message
      successGif.style.display = 'block';
      resultElement.innerHTML = '<p style="color: green;">Website is verified. It is safe to visit.</p>';
    }
  });
}

// Function to check if a website is fake based on URL protocol and CSV file
function isFakeWebsite(url, callback) {
  // Check if the URL starts with "https"
  const isHttps = url.startsWith('https://');

  if (!isHttps) {
    // If the URL doesn't start with "https", consider it failed
    callback(true); // Return true for failure
    return;
  }

  // Fetch the CSV file containing fake website URLs
  fetch('project-fake-urls.csv')
    .then(response => response.text())
    .then(data => {
      // Parse CSV data
      const websites = data.split('\n').map(row => row.trim());

      // Check if the provided URL is in the list of fake websites
      const isFake = websites.includes(url);

      // Return the result to the callback function
      callback(isFake); // Return true if URL is present in the CSV file (considered fake)
    })
    .catch(error => {
      console.error("Error loading CSV file:", error);
      // Treat as not fake if there's an error loading the CSV file
      callback(false);
    });
    // Function to check if a website is potentially fake based on various criteria
async function isFakeWebsite(url, callback) {
  // Check if the URL starts with "https"
  const isHttps = url.startsWith('https://');

  if (!isHttps) {
      // If the URL doesn't start with "https", consider it failed
      callback(true); // Return true for failure
      return;
  }

  try {
      // Fetch the website content
      const response = await fetch(url);
      const text = await response.text();

      // Check for redirects
      const isRedirect = response.redirected;

      // Check for keywords indicating ads or scam content
      const hasAds = text.includes("ad") || text.includes("advertisement");
      const hasScamKeywords = text.includes("scam") || text.includes("fraud");

      // Consider it a potential scam if it redirects or contains ads or scam keywords
      const isPotentialScam = isRedirect || hasAds || hasScamKeywords;

      // Return the result to the callback function
      callback(isPotentialScam);
  } catch (error) {
      console.error("Error fetching website content:", error);
      // Treat as a potential scam if there's an error fetching the website content
      callback(true);
  }
}

}
