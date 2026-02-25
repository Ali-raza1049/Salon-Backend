// controllers/dashboardController.js
import Booking from "../modals/Booking.js";

export const getDashboardStats = async (req, res) => {
  try {
    // Total bookings
    const totalBookings = await Booking.countDocuments();

    // Total revenue
    const totalRevenueData = await Booking.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: { $ifNull: ["$service.price", 0] } },
        },
      },
    ]);

    const totalRevenue =
      totalRevenueData.length > 0 ? totalRevenueData[0].totalRevenue : 0;

    // Weekly bookings (Mon-Sun)
    const weeklyBookingsData = await Booking.aggregate([
      {
        $group: {
          _id: { $dayOfWeek: "$date" },
          bookings: { $sum: 1 },
        },
      },
      { $sort: { "_id": 1 } },
    ]);
    const weeklyBookings = [1,2,3,4,5,6,7].map((day) => {
      const found = weeklyBookingsData.find((w) => w._id === day);
      return {
        day,
        bookings: found ? found.bookings : 0,
      };
    });

    res.status(200).json({
      totalRevenue,
      totalBookings,
      weeklyBookings,
    });
  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({ message: error.message });
  }
};