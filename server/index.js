const express = require("express");
require("dotenv").config();
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.9lza10n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB!");

    const db = client.db("personal_finance");
    const transactionsCollection = db.collection("transactions");

    // Get all transactions
    app.get("/transactions", async (req, res) => {
      try {
        const transactions = await transactionsCollection
          .find({})
          .sort({ date: -1 })
          .toArray();
        res.status(200).json(transactions);
      } catch (error) {
        res.status(500).json({ message: "Failed to fetch transactions." });
      }
    });

    // Add new transaction
    app.post("/transactions", async (req, res) => {

      const { amount, date, description, category } = req.body;
      if (!amount || !date || !description || !category) {
        return res.status(400).json({ message: "All fields are required." });
      }

      try {
        const newTransaction = {
          amount: parseFloat(amount),
          date: new Date(date),
          description: description.trim(),
          category: category,
        };
        const result = await transactionsCollection.insertOne(newTransaction);
        res.status(201).json(result);
      } catch (error) {
        res.status(500).json({ message: "Failed to add transaction." });
      }
    });

 app.put("/transactions/:id", async (req, res) => {
  const { id } = req.params;
  const { amount, date, description, category } = req.body;

  if (!amount || !date || !description || !category) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const updatedTransaction = {
      amount: parseFloat(amount),
      date: new Date(date),
      description: description.trim(),
      category: category.trim(),  // নতুন ফিল্ড যোগ করা হলো
    };

    const result = await transactionsCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updatedTransaction },
      { returnDocument: "after" }
    );

    if (result) {
      res.status(200).json(result);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update transaction." });
  }
});


    // Delete a transaction by ID
    app.delete("/transactions/:id", async (req, res) => {
      const { id } = req.params;
      try {
        const result = await transactionsCollection.deleteOne({
          _id: new ObjectId(id),
        });
        if (result.deletedCount === 0) {
          return res.status(404).json({ message: "Transaction not found." });
        }
        res.status(200).json({ message: "Transaction deleted successfully." });
      } catch (error) {
        res.status(500).json({ message: "Failed to delete transaction." });
      }
    });
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World! This is a simple Express server.");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
