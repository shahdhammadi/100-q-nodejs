const aggregation = await Order.aggregate([
    {
        $group: {
            _id: "$status",
            total: { $sum: "$amount" },
            count: { $sum: 1 }
        }
    },
    { $sort: { total: -1 } }
]);