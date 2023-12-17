/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  Transaction - an object like { itemName, category, price, timestamp }.
  Output - [{ category1 - total_amount_spent_on_category1 }, { category2 - total_amount_spent_on_category2 }]
*/

function calculateTotalSpentByCategory(transactions) {
  //create an empty dictionary like object
  let categoryWiseTotal = {};
  for(let transaction in transactions)
    {
      let category = transactions[transaction].category;
      let price = transactions[transaction].price;

      if(category in categoryWiseTotal)
      {
        categoryWiseTotal[category]+=price;
      }
      else{
        categoryWiseTotal[category]=price;
      }
    }
  let ans = [];
  for(const category in categoryWiseTotal){
    ans.push({category:category,totalSpent:categoryWiseTotal[category]});
  }
  return ans;
}

module.exports = calculateTotalSpentByCategory;
