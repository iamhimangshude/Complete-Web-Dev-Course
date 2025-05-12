document.addEventListener("DOMContentLoaded", () => {
  const expenseForm = document.getElementById("expense-form");
  const expenseNameInput = document.getElementById("expense-name");
  const expenseAmountInput = document.getElementById("expense-amount");
  const expenseList = document.getElementById("expense-list");
  const totalAmountDisplay = document.getElementById("total-amount");

  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  let totalAmount = calculateTotal();

  renderExpenses();
  updateTotal();

  expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let name = expenseNameInput.value.trim();
    let amount = parseFloat(expenseAmountInput.value.trim());
    console.log(name, amount);
    if (name !== "" && !isNaN(amount) && amount > 0) {
      const newExpense = {
        id: Date.now(),
        name,
        amount,
      };
      expenses.push(newExpense);
      saveExpensesToLocal();
      calculateTotal();
      updateTotal();
      renderExpenses();

      // clear input
      expenseNameInput.value = "";
      expenseAmountInput.value = "";
    }
  });

  expenseList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      let expenseId = parseInt(e.target.getAttribute("data-id"));
      expenses = expenses.filter((exp) => exp.id !== expenseId);

      saveExpensesToLocal();
      renderExpenses();
      updateTotal();
    }
  });

  function calculateTotal() {
    return expenses.reduce((acc, cur) => acc + cur.amount, 0);
  }

  function renderExpenses() {
    expenseList.innerHTML = "";
    expenses.forEach((exp) => {
      let li = document.createElement("li");
      li.innerHTML = `
      ${exp.name} - $${exp.amount}
      <button data-id="${exp.id}">Delete</button>`;
      expenseList.appendChild(li);
    });
  }

  function updateTotal() {
    totalAmount = calculateTotal();
    totalAmountDisplay.textContent = totalAmount.toFixed(2);
  }

  function saveExpensesToLocal() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }
});
