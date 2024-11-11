window.onload = function () {
    const select = document.createElement("select");
    select.id = "topicSelect";
    const contentDiv = document.createElement("div");
    contentDiv.id = "content";
  
    const disclaimer = document.querySelector(".disclaimer");
    disclaimer.after(select);
    select.after(contentDiv);
  
    // Fetch the text file
    fetch("reactans.txt")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.text();
      })
      .then((text) => {
        // Define escapeHtml function to sanitize the text
        function escapeHtml(unsafe) {
          return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
        }
  
        contentDiv.innerHTML = `<pre><code class="language-txt">${escapeHtml(
          text
        )}</code></pre>`;
        Prism.highlightAll();
  
        const topicsList = [
          "1. Create a stateless function component",
          "2. Stateful class component",
          "3. Conditional rendering using class component",
          "4. (Parent – child) relationship between components",
          "5. Material UI card using React",
          "6. Custom navigation bar",
          "7. HTTP request",
          "8. Dropdown",
          "9. Routing",
          "10. FORM validation",
          "10.1. FORM validation (must install Material UI)"
        ];
  
        const sections = text.split("END");
  
        select.innerHTML = "";
  
        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = "Select a Topic";
        select.appendChild(defaultOption);
  
        topicsList.forEach((topic, index) => {
          const option = document.createElement("option");
          option.value = index;
          option.textContent = topic;
          select.appendChild(option);
        });
  
        select.addEventListener("change", function () {
          if (this.value === "") {
            contentDiv.innerHTML = `<pre><code class="language-txt">${escapeHtml(
              text
            )}</code></pre>`;
          } else {
            const selectedContent = sections[this.value].trim();
            contentDiv.innerHTML = `<pre><code class="language-txt">${escapeHtml(
              selectedContent
            )}</code></pre>`;
          }
          Prism.highlightAll();
        });
      })
      .catch((error) => {
        console.error("Error loading file:", error);
        contentDiv.innerHTML =
          '<p style="color: red;">Error loading content. Please refresh the page.</p>';
      });
  };
