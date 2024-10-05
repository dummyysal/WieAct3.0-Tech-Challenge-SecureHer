document.addEventListener("DOMContentLoaded", () => {
  const selectedTextArea = document.getElementById("selectedText");
  const scanButton = document.getElementById("scanButton");
  const resultDiv = document.getElementById("result");
  const linkResultDiv = document.getElementById("linkResult");
  const checkLinkButton = document.getElementById("checkLinkButton");

  // Request the selected text from the background script
  chrome.runtime.sendMessage({ action: "getSelectedText" }, (response) => {
      selectedTextArea.value = response.selectedText || "No text selected";
  });

  // Handle the scan button click for harassment detection
  scanButton.addEventListener("click", async () => {
      const text = selectedTextArea.value;
      if (text === "No text selected" || text === "") {
          resultDiv.innerText = "Please select some text to scan.";
          return;
      }

      // Send the selected text to the server for detection
      try {
          const response = await fetch("http://localhost:5000/", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({ text }),
          });
      
          const data = await response.json();
          console.log("Response from server:", data);
            if (data.harassment) {
                resultDiv.innerText = "Harassment detected!";
                resultDiv.style.backgroundColor = "#f88fa9";




                 // Create a security advice paragraph
                const harassmentAdvice = document.createElement("p");
                harassmentAdvice.innerText = "Make sure to report or block the content !";
                //harassmentAdvice.style.color = "violet"; // Set advice color
                harassmentAdvice.style.fontWeight = "bold";
                
                // Append this to the harassmentAdviceContainer
                const adviceContainer = document.getElementById("harassmentAdviceContainer");
                adviceContainer.innerHTML = ""; // Clear previous advice if any
                adviceContainer.appendChild(harassmentAdvice);
            } else {
                resultDiv.innerText = "No harassment detected";
                resultDiv.style.backgroundColor = "#d8bfd8";

                document.getElementById("harassmentAdviceContainer").innerHTML = "";
            }
        }
    catch (error) {
        resultDiv.innerText = "Error connecting to the server.";
        resultDiv.style.backgroundColor = "#ffcccb";
    }
  });

  // Handle the check link button click for basic malicious link detection
  checkLinkButton.addEventListener("click", () => {
      // Get the current tab's URL
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          const currentTabUrl = tabs[0].url;

          // Perform simple checks on the URL to determine if it's suspicious
          const isMalicious = checkIfLinkIsMalicious(currentTabUrl);

          if (isMalicious) {
              linkResultDiv.innerText = " Potentially Malicious Link !";
              linkResultDiv.style.backgroundColor = "#f88fa9";
                
                const securityAdvice = document.createElement("p");
                securityAdvice.innerText = "For your safety, avoid sharing any personal data while browsing this page !";
                securityAdvice.style.color = "voilet";
                securityAdvice.style.fontWeight = "bold";
                
                // Append this recommendation to a container in the popup
                adviceContainer.appendChild(securityAdvice);






                //////
          } else {
              linkResultDiv.innerText = "Safe Link";
              linkResultDiv.style.backgroundColor = "#d8bfd8";
          }
      });
  });

  // Simple heuristic to check if a link is malicious
  function checkIfLinkIsMalicious(url) {
      // Check if URL is using HTTPS
      if (!url.startsWith("https")) {
          return true; // URLs not using HTTPS are considered less safe
      }

      // Check for suspicious keywords in the URL
      const suspiciousKeywords = ["malware", "phishing", "untrusted", "attack", "suspicious"];
      for (let keyword of suspiciousKeywords) {
          if (url.includes(keyword)) {
              return true; // Flag URLs containing suspicious keywords
          }
      }

      // Check if URL is too long or has too many query parameters
      if (url.length > 100 || url.split("?").length > 2) {
          return true; // Extremely long URLs or too many parameters are suspicious
      }

      return false; // If none of the checks flag the URL, it's considered safe
  }
});

  