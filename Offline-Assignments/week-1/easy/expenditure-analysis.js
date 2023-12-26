/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  Transaction - an object like { itemName, category, price, timestamp }.
  Output - [{ category1 - total_amount_spent_on_category1 }, { category2 - total_amount_spent_on_category2 }]
*/

function calculateTotalSpentByCategory(transactions) {
  let ans = {};

  for (let i = 0; i < transactions.length; i++) {
    let item = transactions[i];
    let category = item.category;

    if (ans[category]) {
      ans[category].totalSpent += item.price;
    } else {
      ans[category] = { "category": category, "totalSpent": item.price };
    }
  }
  const result = Object.values(ans);
  return result;
}

module.exports = calculateTotalSpentByCategory;
