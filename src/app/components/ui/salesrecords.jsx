const SalesRecord = () => {
  const salesData = [
    {
      id: 1,
      date: "2024-03-15",
      product: "Nike Air Max",
      amount: 8999,
      branch: "Cebu",
    },
    {
      id: 2,
      date: "2024-03-15",
      product: "Adidas Ultra Boost",
      amount: 7599,
      branch: "Davao",
    },
    {
      id: 3,
      date: "2024-03-14",
      product: "Jordan 1 Low",
      amount: 6799,
      branch: "Butuan",
    },
    {
      id: 4,
      date: "2024-03-14",
      product: "Nike Dunk Low",
      amount: 5999,
      branch: "Cebu",
    },
    {
      id: 5,
      date: "2024-03-13",
      product: "Converse Chuck 70",
      amount: 3999,
      branch: "Davao",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800">Recent Sales</h3>
        <button className="text-blue-600 text-sm hover:text-blue-800">
          View All
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                Date
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                Product
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                Branch
              </th>
              <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {salesData.map((sale) => (
              <tr key={sale.id} className="border-b last:border-b-0">
                <td className="py-3 px-4 text-sm text-gray-600">{sale.date}</td>
                <td className="py-3 px-4 text-sm text-gray-800 font-medium">
                  {sale.product}
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">
                  {sale.branch}
                </td>
                <td className="py-3 px-4 text-sm text-gray-800 font-medium text-right">
                  ₱{sale.amount.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesRecord;
