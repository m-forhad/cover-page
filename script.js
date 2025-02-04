

function drawImageWithText() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);

    // Get user input values
    const inputTexts = [
        { text: text1.value, x: 950, y: 1960, maxWidth: 1400, wrap:true },
        { text: text2.value, x: 950, y: 2330 },
        { text: text3.value, x: 600, y: 2900 },
        { text: text4.value, x: 1630, y: 2900 },
        { text: formatDate(date1.value), x: 950, y: 2460 },
        { text: number1.value, x: 600, y: 3095 },
        { text: option1.value, x: 1880, y: 3095 },
        { text: option2.value, x: 1890, y: 3220 },
        { text: option3.value, x: 600, y: 3220 }
    ];

    // Apply text styles and draw each text
    ctx.font = "normal 72px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "left";

    inputTexts.forEach(({ text, x, y, maxWidth, wrap }) => {
      if (text) {
        if (wrap) {
          wrapText(ctx, text, x, y, maxWidth, 72); // Wrap text
        }
        else {
          ctx.fillText(text, x, y);
        }
      }
    });

    download.style.display = "block"; // Show download button
}

// Function to formate date to DD-MM-YYYY
function formatDate(dateStr) {
  if (!dateStr) return ""; // Return empty if no date is selected

  let parts = dateStr.split("-"); // Split YYYY-MM-DD
  return `${parts[2]}-${parts[1]}-${parts[0]}`; // Rearrange to DD-MM-YYYY
}

// Function to wrap text
function wrapText(context, text, x, y, maxWidth, lineHeight) {
  let words = text.split(" ");
  let line = "";
  let lines = [];

  for (let i = 0; i < words.length; i++) {
    let testLine = line + (line ? " " : "") + words[i]; // Avoid extra spaces
    let testWidth = context.measureText(testLine).width;

    if (testWidth > maxWidth && line !== "") {
      lines.push(line);
      line = words[i]; // Start new line
    }
    else {
    line = testLine;
    }
  }
  lines.push(line); // Push the last line

  // Draw the wrapped text
  for (let i = 0; i < lines.length; i++) {
  context.fillText(lines[i], x, y + (i * lineHeight));
  }
}

// Update canvas when any input changes
[text1, text2, text3, text4, date1, number1, option1, option2, option3].forEach(input => {
    input.addEventListener("input", drawImageWithText);
});

download.addEventListener("click", function () {
    const link = document.createElement("a");
    link.download = "custom_image.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
});