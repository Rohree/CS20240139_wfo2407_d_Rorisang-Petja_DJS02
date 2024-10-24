const form = document.querySelector("[data-form]");
const result = document.querySelector("[data-result]");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const entries = new FormData(event.target);
  const { dividend, divider } = Object.fromEntries(entries);
  
  // Scenario: Validation when values are missing
  if (!dividend || !divider) {
    result.innerText = "Division not performed. Both values are required in inputs. Try again.";
    return;
  }

  // Ensure the inputs are numbers
  const numDividend = Number(dividend);
  const numDivider = Number(divider);

  // Scenario: Providing anything that is not a number should crash the program
  if (isNaN(numDividend) || isNaN(numDivider)) {
    console.error("Invalid input: One or both inputs are not numbers.");
    document.body.innerHTML = "<h1>Something critical went wrong. Please reload the page.</h1>";
    return;
  }

  // Scenario: An invalid division should log an error in the console (division by zero)
  if (numDivider === 0) {
    result.innerText = "Division not performed. Invalid number provided. Try again.";
    console.error("Division by zero error", new Error().stack);
    return;
  }

  // Scenario: Dividing numbers resulting in a decimal number (rounding off)
  const divisionResult = Math.floor(numDividend / numDivider);
  result.innerText = divisionResult;
});

