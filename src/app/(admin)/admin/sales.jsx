const salesData = [
  {
    customer_id: 1,
    store_id: 1,
    product_id: 1,
    product_name: "Nike Vomero 5",
    size: "7",
    quantity: 3,
    total: "300.00",
    date: "2023-09-15T10:00:00Z",
  },
  {
    customer_id: 2,
    store_id: 2,
    product_id: 2,
    product_name: "Nike Vomero 5",
    size: "7.5",
    quantity: 2,
    total: "200.00",
    date: "2023-09-16T11:00:00Z",
  },
  {
    customer_id: 3,
    store_id: 3,
    product_id: 3,
    product_name: "Nike Vomero 5",
    size: "8",
    quantity: 1,
    total: "100.00",
    date: "2023-09-17T12:00:00Z",
  },
  {
    customer_id: 4,
    store_id: 1,
    product_id: 4,
    product_name: "Nike Vomero 5",
    size: "8.5",
    quantity: 5,
    total: "500.00",
    date: "2023-09-18T13:00:00Z",
  },
  {
    customer_id: 5,
    store_id: 2,
    product_id: 5,
    product_name: "Nike Vomero 5",
    size: "9",
    quantity: 4,
    total: "400.00",
    date: "2023-09-19T14:00:00Z",
  },
  {
    customer_id: 6,
    store_id: 3,
    product_id: 6,
    product_name: "Nike Vomero 5",
    size: "9.5",
    quantity: 2,
    total: "200.00",
    date: "2023-09-20T15:00:00Z",
  },
  {
    customer_id: 7,
    store_id: 1,
    product_id: 7,
    product_name: "Nike Vomero 5",
    size: "10",
    quantity: 1,
    total: "100.00",
    date: "2023-09-21T16:00:00Z",
  },
  {
    customer_id: 8,
    store_id: 2,
    product_id: 8,
    product_name: "Nike Vomero 5",
    size: "10.5",
    quantity: 3,
    total: "300.00",
    date: "2023-09-22T17:00:00Z",
  },
  {
    customer_id: 9,
    store_id: 3,
    product_id: 9,
    product_name: "Nike Vomero 5",
    size: "7",
    quantity: 2,
    total: "200.00",
    date: "2023-09-23T18:00:00Z",
  },
  {
    customer_id: 10,
    store_id: 1,
    product_id: 10,
    product_name: "Nike Vomero 5",
    size: "7.5",
    quantity: 4,
    total: "400.00",
    date: "2023-09-24T19:00:00Z",
  },
  // ... (continue adding records up to 1000)
  {
    customer_id: 1000,
    store_id: 3,
    product_id: 50,
    product_name: "Gazelle",
    size: "9",
    quantity: 2,
    total: "200.00",
    date: "2023-10-15T10:00:00Z",
  },
];

// Example of generating more records programmatically
const generateSalesData = () => {
  const products = [
    { product_id: 1, name: "Nike Vomero 5", size: "7" },
    { product_id: 2, name: "Nike Vomero 5", size: "7.5" },
    { product_id: 3, name: "Nike Vomero 5", size: "8" },
    { product_id: 4, name: "Nike Vomero 5", size: "8.5" },
    { product_id: 5, name: "Nike Vomero 5", size: "9" },
    { product_id: 6, name: "Nike Vomero 5", size: "9.5" },
    { product_id: 7, name: "Nike Vomero 5", size: "10" },
    { product_id: 8, name: "Nike Vomero 5", size: "10.5" },
    { product_id: 9, name: "Gazelle", size: "8.5" },
    { product_id: 10, name: "Gazelle", size: "9" },
    // ... add more products as needed
  ];

  const stores = [1, 2, 3]; // Store IDs for Butuan, Cebu, Davao
  const salesRecords = [];

  for (let i = 0; i < 1000; i++) {
    // Generate 1000 sales records
    const customer_id = Math.floor(Math.random() * 100) + 1; // Random customer ID
    const store_id = stores[Math.floor(Math.random() * stores.length)];
    const product = products[Math.floor(Math.random() * products.length)];
    const quantity = Math.floor(Math.random() * 10) + 1; // Random quantity between 1 and 10
    const total = (quantity * (Math.random() * 100 + 20)).toFixed(2); // Random total price
    const date = new Date(
      Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 30)
    ).toISOString(); // Random date within the last month

    salesRecords.push({
      customer_id,
      store_id,
      product_id: product.product_id,
      product_name: product.name,
      size: product.size,
      quantity,
      total,
      date,
    });
  }

  return salesRecords;
};

const largeSalesData = generateSalesData();
console.log(largeSalesData);
