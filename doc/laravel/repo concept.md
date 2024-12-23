To implement the **Repository Pattern** for managing transactions in a **Laravel** application, we can separate the concerns of data access logic (queries) from the controller. This improves the maintainability, testability, and scalability of the application. The **Repository** will handle all the complex queries and business logic related to transactions, while the **Controller** will delegate to the Repository.

Here's how you can set up a **Transaction Repository** to handle data operations for transactions.

### 1. **Create a Transaction Repository Interface**

A repository interface allows for decoupling the implementation details from the application’s logic. This helps in following the **Dependency Inversion Principle** (DIP) by depending on abstractions rather than concrete implementations.

Run the following command to create the interface:

```bash
php artisan make:interface TransactionRepositoryInterface
```

Then, create the interface file in `app/Repositories/TransactionRepositoryInterface.php`:

```php
<?php

namespace App\Repositories;

use Illuminate\Pagination\LengthAwarePaginator;

interface TransactionRepositoryInterface
{
    /**
     * Get filtered, searched, and paginated transactions.
     *
     * @param array $filters
     * @param string $search
     * @param int $perPage
     * @return LengthAwarePaginator
     */
    public function getTransactions(array $filters, string $search, int $perPage = 10): LengthAwarePaginator;

    /**
     * Find a transaction by its ID.
     *
     * @param int $id
     * @return \App\Models\Transaction|null
     */
    public function findById(int $id);
}
```

### Explanation:

- **`getTransactions`**: Defines the method signature for fetching filtered, searched, and paginated transactions.
- **`findById`**: Defines the method for finding a specific transaction by its ID.

### 2. **Create a Transaction Repository Implementation**

Next, we need to create the actual implementation of the interface. This class will contain the logic for querying the database.

Run the following command to create the repository:

```bash
php artisan make:repository TransactionRepository
```

Then, implement the `TransactionRepositoryInterface` in `app/Repositories/TransactionRepository.php`:

```php
<?php

namespace App\Repositories;

use App\Models\Transaction;
use Illuminate\Pagination\LengthAwarePaginator;

class TransactionRepository implements TransactionRepositoryInterface
{
    /**
     * Get filtered, searched, and paginated transactions.
     *
     * @param array $filters
     * @param string $search
     * @param int $perPage
     * @return LengthAwarePaginator
     */
    public function getTransactions(array $filters, string $search, int $perPage = 10): LengthAwarePaginator
    {
        $query = Transaction::query();

        // Apply filters
        if (!empty($filters['transaction_type'])) {
            $query->where('transaction_type', $filters['transaction_type']);
        }

        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        // Apply search
        if (!empty($search)) {
            $query->where(function ($query) use ($search) {
                $query->where('transaction_id', 'like', "%$search%")
                      ->orWhere('amount', 'like', "%$search%");
            });
        }

        // Paginate the results
        return $query->paginate($perPage);
    }

    /**
     * Find a transaction by its ID.
     *
     * @param int $id
     * @return \App\Models\Transaction|null
     */
    public function findById(int $id)
    {
        return Transaction::find($id);
    }
}
```

### Explanation:

- **`getTransactions`**: This method builds the query by applying any provided filters, performing a search, and paginating the results. It returns the paginated result using `paginate()`.
- **`findById`**: A simple method to find a transaction by its ID using `find()`.

### 3. **Bind the Interface to the Repository in the ServiceProvider**

Now, we need to bind the `TransactionRepositoryInterface` to the `TransactionRepository` in a ServiceProvider so that Laravel can inject the repository into controllers or services.

In `app/Providers/AppServiceProvider.php`, update the `register` method to bind the interface to its implementation:

```php
<?php

namespace App\Providers;

use App\Repositories\TransactionRepositoryInterface;
use App\Repositories\TransactionRepository;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        // Bind the interface to the implementation
        $this->app->bind(TransactionRepositoryInterface::class, TransactionRepository::class);
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
```

This tells Laravel to inject the `TransactionRepository` whenever `TransactionRepositoryInterface` is required.

### 4. **Inject the Repository into the Controller**

In the `TransactionController`, inject the `TransactionRepositoryInterface` and delegate the database logic to the repository.

Update `TransactionController.php`:

```php
<?php

namespace App\Http\Controllers;

use App\Repositories\TransactionRepositoryInterface;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    protected $transactionRepository;

    public function __construct(TransactionRepositoryInterface $transactionRepository)
    {
        $this->transactionRepository = $transactionRepository;
    }

    /**
     * Display a listing of the transactions with search, filter, and pagination.
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $filters = $request->only(['transaction_type', 'status']);
        $search = $request->input('search', '');

        // Get the filtered, searched, and paginated transactions
        $transactions = $this->transactionRepository->getTransactions($filters, $search);

        return response()->json($transactions);
    }

    /**
     * Display a specific transaction.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $transaction = $this->transactionRepository->findById($id);

        if (!$transaction) {
            return response()->json(['message' => 'Transaction not found'], 404);
        }

        return response()->json($transaction);
    }
}
```

### Explanation:

- **Constructor**: The repository is injected into the controller’s constructor, which will automatically resolve it via the ServiceProvider.
- **Delegation**: The controller calls the repository methods to fetch the transactions (`getTransactions` and `findById`).

### 5. **Define Routes**

Finally, ensure that you define the appropriate routes in `routes/api.php` for the controller actions:

```php
use App\Http\Controllers\TransactionController;

Route::get('/transactions', [TransactionController::class, 'index']);
Route::get('/transactions/{id}', [TransactionController::class, 'show']);
```

### 6. **Unit Testing the Repository**

To test the repository, you can mock the `TransactionRepositoryInterface` in your tests, allowing you to verify that the controller and service behave as expected without interacting with the database.

#### Example Test:

```php
<?php

namespace Tests\Unit;

use App\Models\Transaction;
use App\Repositories\TransactionRepositoryInterface;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TransactionRepositoryTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_can_get_transactions_with_filters_and_search()
    {
        // Create sample transactions
        Transaction::factory()->create(['transaction_type' => 'Credit', 'amount' => 100]);
        Transaction::factory()->create(['transaction_type' => 'Debit', 'amount' => 50]);

        // Mock the repository
        $repository = app(TransactionRepositoryInterface::class);

        $filters = ['transaction_type' => 'Credit'];
        $search = '';

        // Fetch the filtered, searched, and paginated transactions
        $transactions = $repository->getTransactions($filters, $search);

        // Assert that the correct transactions are returned
        $this->assertCount(1, $transactions);
        $this->assertEquals('Credit', $transactions->first()->transaction_type);
    }
}
```

### Summary:

- **Repository Interface**: Defines the contract for the repository.
- **Repository Implementation**: Contains the logic for filtering, searching, and paginating transactions.
- **Controller**: Uses the repository to handle business logic.
- **ServiceProvider**: Binds the interface to the implementation to facilitate dependency injection.
- **Unit Testing**: You can now test the repository logic independently from the database layer.

By using the **Repository Pattern**, you follow SOLID principles, particularly **Single Responsibility** and **Dependency Inversion**, improving the testability and maintainability of your application.
