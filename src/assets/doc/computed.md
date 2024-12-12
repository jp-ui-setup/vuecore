### Computed Properties in Vue.js: Real-Time Use Case

**Computed properties** in Vue.js are a powerful feature for managing and optimizing the state of your application. They are essentially getter functions that are cached based on their reactive dependencies. This makes computed properties particularly useful for scenarios where you need to perform calculations or derive values from the component's state, but you only want those calculations to re-run when the underlying data changes.

Let's dive into a real-time use case to understand how computed properties can be used effectively in Vue.js.

### Real-Time Use Case: A Dashboard with Dynamic Data

Imagine you're building a **dashboard** that shows various statistics in real-time. You have data like:

- Number of active users
- Total sales for the day
- A list of transactions, each with a timestamp and amount

In this case, you want to:

1. **Calculate total sales dynamically** from a list of transaction objects.
2. **Compute the number of active users** based on certain criteria (e.g., users who logged in within the last 10 minutes).
3. **Sort a list of transactions** by date (most recent first) without mutating the original array.

Let's see how you could solve these with **computed properties**.

### Full Example: Dashboard with Computed Properties

```html
<template>
  <div>
    <h1>Real-Time Dashboard</h1>

    <div>
      <h2>Active Users: {{ activeUsersCount }}</h2>
      <p>Users who logged in within the last 10 minutes.</p>
    </div>

    <div>
      <h2>Total Sales: ${{ totalSales }}</h2>
      <p>Total sales from all transactions today.</p>
    </div>

    <div>
      <h2>Transactions</h2>
      <ul>
        <li v-for="transaction in sortedTransactions" :key="transaction.id">
          <span>{{ transaction.date }} - ${{ transaction.amount }}</span>
        </li>
      </ul>
    </div>

    <div>
      <button @click="addTransaction">Add Random Transaction</button>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, computed } from 'vue'

  // Interface for user and transaction
  interface User {
    id: number
    name: string
    lastLogin: string // Timestamp of last login
  }

  interface Transaction {
    id: number
    amount: number
    date: string // Timestamp of the transaction
  }

  export default defineComponent({
    name: 'Dashboard',
    setup() {
      // Sample users and transactions data
      const users = ref<User[]>([
        { id: 1, name: 'John Doe', lastLogin: new Date().toISOString() },
        {
          id: 2,
          name: 'Jane Smith',
          lastLogin: new Date(new Date().getTime() - 5000000).toISOString(),
        },
        {
          id: 3,
          name: 'Alice Brown',
          lastLogin: new Date(new Date().getTime() - 300000).toISOString(),
        },
      ])

      const transactions = ref<Transaction[]>([
        { id: 1, amount: 150, date: new Date().toISOString() },
        { id: 2, amount: 300, date: new Date(new Date().getTime() - 10000000).toISOString() },
        { id: 3, amount: 120, date: new Date(new Date().getTime() - 500000).toISOString() },
      ])

      // Computed property to calculate the number of active users (logged in within the last 10 minutes)
      const activeUsersCount = computed(() => {
        const tenMinutesAgo = new Date(new Date().getTime() - 10 * 60 * 1000).toISOString()
        return users.value.filter((user) => new Date(user.lastLogin) >= new Date(tenMinutesAgo))
          .length
      })

      // Computed property to calculate total sales from the transactions array
      const totalSales = computed(() => {
        return transactions.value.reduce((sum, transaction) => sum + transaction.amount, 0)
      })

      // Computed property to sort transactions by date (latest first)
      const sortedTransactions = computed(() => {
        return [...transactions.value].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        )
      })

      // Method to add a random transaction for testing
      const addTransaction = () => {
        const randomAmount = Math.floor(Math.random() * 1000)
        const newTransaction: Transaction = {
          id: transactions.value.length + 1,
          amount: randomAmount,
          date: new Date().toISOString(),
        }
        transactions.value.push(newTransaction)
      }

      return {
        activeUsersCount,
        totalSales,
        sortedTransactions,
        addTransaction,
      }
    },
  })
</script>

<style scoped>
  button {
    padding: 10px 20px;
    background-color: #4caf50;
    color: white;
    border: none;
    cursor: pointer;
  }
  button:hover {
    background-color: #45a049;
  }
</style>
```

### Explanation

#### 1. **Active Users Count** (`activeUsersCount`):

- **Use Case**: You want to know how many users are **active**, i.e., have logged in in the last 10 minutes.
- **How**: The computed property `activeUsersCount` filters the `users` array, checking if the user's last login time is within the last 10 minutes (using a date comparison).
- **Why Computed**: This is a derived value based on the `users` array, and it only needs to be recalculated when the users' data changes (e.g., when their last login is updated).

```ts
const activeUsersCount = computed(() => {
  const tenMinutesAgo = new Date(new Date().getTime() - 10 * 60 * 1000).toISOString()
  return users.value.filter((user) => new Date(user.lastLogin) >= new Date(tenMinutesAgo)).length
})
```

#### 2. **Total Sales** (`totalSales`):

- **Use Case**: You want to calculate the total sales amount from a list of transactions.
- **How**: The computed property `totalSales` uses the `reduce` function to sum the `amount` of each transaction in the `transactions` array.
- **Why Computed**: This value depends on the list of transactions, and it should automatically update whenever new transactions are added or existing ones are modified.

```ts
const totalSales = computed(() => {
  return transactions.value.reduce((sum, transaction) => sum + transaction.amount, 0)
})
```

#### 3. **Sorted Transactions** (`sortedTransactions`):

- **Use Case**: You need to display the transactions in descending order (most recent first).
- **How**: The computed property `sortedTransactions` sorts the `transactions` array by the `date` property (in descending order).
- **Why Computed**: Sorting is a derived value, and sorting should only occur when the transaction data changes. Since the transactions are being updated dynamically, the computed property ensures the list remains up to date without re-sorting manually every time.

```ts
const sortedTransactions = computed(() => {
  return [...transactions.value].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )
})
```

#### 4. **Add Transaction** (`addTransaction`):

- **Use Case**: For testing, you might want to simulate adding a random transaction to see the computed properties update in real-time.
- **How**: The `addTransaction` method adds a new transaction to the `transactions` array with a random amount.

```ts
const addTransaction = () => {
  const randomAmount = Math.floor(Math.random() * 1000)
  const newTransaction: Transaction = {
    id: transactions.value.length + 1,
    amount: randomAmount,
    date: new Date().toISOString(),
  }
  transactions.value.push(newTransaction)
}
```

### Why Use Computed Properties?

1. **Performance**: Computed properties are **cached** based on their reactive dependencies. This means that if the underlying data doesn't change, Vue will return the cached value instead of recomputing the result.
2. **Declarative**: Computed properties provide a **declarative way** to handle derived state. They allow you to define how values should be calculated based on other reactive data without worrying about manually keeping track of updates.

3. **Readability and Maintainability**: Using computed properties makes the code more readable. Instead of performing complex calculations or filtering directly in the template or methods, you move that logic to a computed property, which keeps the template cleaner.

### Real-Time Data Updates

Because Vue's reactivity system is working in the background, any changes to the underlying data (like adding a new transaction or updating the last login time of a user) will automatically trigger updates to the computed properties, and the UI will reflect those changes in real-time.

For instance, when you add a transaction with the "Add Random Transaction" button, both the `totalSales` and `sortedTransactions` computed properties will automatically update, and the dashboard will reflect the new data without any extra code to manually update the UI.

### Conclusion

Computed properties are ideal for cases where you need to derive data based on the component's state or props, but you don't want to recalculate the value unless necessary. They help optimize your app's performance, make your code more declarative, and keep your templates clean and readable.

In this **real-time dashboard** example, we used computed properties
