import { faker } from "@faker-js/faker";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE,
);

const categories = [
  "Housing",
  "Transport",
  "Health",
  "Food",
  "Education",
  "Entertainment",
  "Other",
];

const expenseDescriptions = {
  Housing: [
    "Rent payment",
    "Mortgage installment",
    "Utility bill",
    "Home repairs",
  ],
  Transport: ["Gas refill", "Bus ticket", "Taxi fare", "Car maintenance"],
  Health: [
    "Doctor visit",
    "Medicine purchase",
    "Gym membership",
    "Dental cleaning",
  ],
  Food: ["Grocery shopping", "Restaurant bill", "Coffee shop", "Fast food"],
  Education: ["Books purchase", "Online course", "School fees", "Stationery"],
  Entertainment: [
    "Movie ticket",
    "Concert",
    "Streaming subscription",
    "Video game",
  ],
  Other: ["Gift", "Charity donation", "Miscellaneous purchase"],
};

const incomeDescriptions = [
  "Salary",
  "Freelance payment",
  "Bonus",
  "Gift received",
];
const savingDescriptions = [
  "Deposit to savings",
  "Transferred to savings account",
];
const investmentDescriptions = [
  "Stock purchase",
  "Crypto investment",
  "Mutual fund investment",
];

function getDescription(type, category) {
  switch (type) {
    case "Expense":
      return faker.helpers.arrayElement(expenseDescriptions[category]);
    case "Income":
      return faker.helpers.arrayElement(incomeDescriptions);
    case "Saving":
      return faker.helpers.arrayElement(savingDescriptions);
    case "Investment":
      return faker.helpers.arrayElement(investmentDescriptions);
    default:
      return "Transaction";
  }
}

async function seed() {
  let transactions = [];
  let lastDate = null;

  for (let i = 0; i < 50; i++) {
    // 50% chance to use the same date as the previous transaction
    const reuseDate = lastDate && Math.random() < 0.5;
    const created_at = reuseDate ? lastDate : faker.date.past();
    lastDate = created_at;

    let type,
      category = null;

    const typeBias = Math.random();

    if (typeBias < 0.8) {
      type = "Expense";
      category = faker.helpers.arrayElement(categories);
    } else if (typeBias < 0.9) {
      type = "Income";
    } else {
      type = faker.helpers.arrayElement(["Saving", "Investment"]);
    }

    let amount;
    switch (type) {
      case "Income":
        amount = faker.number.int({ min: 2000, max: 9000 });
        break;
      case "Expense":
        amount = faker.number.int({ min: 10, max: 1000 });
        break;
      case "Investment":
      case "Saving":
        amount = faker.number.int({ min: 3000, max: 10000 });
        break;
    }

    transactions.push({
      created_at,
      amount,
      type,
      description: getDescription(type, category),
      category,
    });
  }

  const { error } = await supabase.from("transactions").insert(transactions);

  if (error) {
    console.error("Error inserting data:", error);
  } else {
    console.log("Data inserted");
  }
}

seed().catch(console.error);
