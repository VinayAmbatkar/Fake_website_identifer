async function isWebsiteSafe(url) {
    try {
      // Extract domain from the URL
      const domain = extractDomain(url);
  
      // Simulate database lookup (replace with actual implementation)
      const isInDatabase = await checkDatabase(domain);
  
      // Return false if the domain is found in the database (potentially pirated)
      return !isInDatabase;
    } catch (error) {
      console.error('Error occurred during website verification:', error);
      return false; // Return false in case of error
    }
  }
  
  async function checkDatabase(domain) {
    // Simulate database lookup (replace with actual implementation)
    // For demonstration, return a promise that resolves with a boolean value
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const database = ['paypal.com']; // Simulated database of pirated websites
        const isInDatabase = database.includes(domain);
        resolve(isInDatabase);
      }, 2000); // Simulate 2-second delay
    });
  }
  
  function extractDomain(url) {
    // Extract domain from URL
    const matches = url.match(/^https?:\/\/(?:www\.)?([^\/?#]+)/i);
    return matches && matches[1]; // Return the captured domain part of the URL
  }
  
  async function verifyWebsite() {
    var url = document.getElementById('urlInput').value;
    var resultElement = document.getElementById('verificationResult');
    var loadingGif = document.getElementById('loadingGif');
    var successGif = document.getElementById('successGif');
    var failedGif = document.getElementById('failedGif');
  
    // Show loading GIF
    loadingGif.style.display = 'block';
  
    // Perform website verification
    var isVerified = await isWebsiteSafe(url);
  
    // Hide loading GIF after verification
    loadingGif.style.display = 'none';
  
    if (isVerified) {
      resultElement.innerHTML = '<p style="color: green;">Website is verified. It is safe to visit.</p>';
      // Show success GIF
      successGif.style.display = 'block';
      // Hide failed GIF if it's visible
      failedGif.style.display = 'none';
    } else {
      resultElement.innerHTML = '<p style="color: red;">Website verification failed. It may be potentially pirated or unsafe.</p>';
      // Show failed GIF
      failedGif.style.display = 'block';
      // Hide success GIF if it's visible
      successGif.style.display = 'none';
    }
  }
  
  