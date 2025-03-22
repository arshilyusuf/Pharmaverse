const supplyOrders = [
  {
    drugID: "67dcd9e40a5d333cb783bdda",
    quantity: 50,
    suppliedTo: "City Hospital",
    vendorID: "67dd2ea00a5d333cb783bdf2",
    orderDate: "2025-03-01T10:00:00Z",
    status: "pending",
  },
  {
    drugID: "67dcd9e40a5d333cb783bddb",
    quantity: 100,
    suppliedTo: "HealthCare Pharmacy",
    vendorID: "67dd2ea00a5d333cb783bdf3",
    orderDate: "2025-03-02T11:30:00Z",
    status: "shipped",
  },
  {
    drugID: "67dcd9e40a5d333cb783bddd",
    quantity: 200,
    suppliedTo: "Green Valley Clinic",
    vendorID: "67dd2ea00a5d333cb783bdf4",
    orderDate: "2025-03-03T12:15:00Z",
    status: "delivered",
  },
  {
    drugID: "67dcd9e40a5d333cb783bdde",
    quantity: 80,
    suppliedTo: "Wellness Center",
    vendorID: "67dd2ea00a5d333cb783bdf5",
    orderDate: "2025-03-04T13:45:00Z",
    status: "cancelled",
  },
  {
    drugID: "67dcd9e40a5d333cb783bddf",
    quantity: 30,
    suppliedTo: "MedPoint Pharmacy",
    vendorID: "67dd2ea00a5d333cb783bdf6",
    orderDate: "2025-03-05T14:20:00Z",
    status: "pending",
  },
  {
    drugID: "67dcd9e40a5d333cb783bde0",
    quantity: 90,
    suppliedTo: "Downtown Clinic",
    vendorID: "67dd2ea00a5d333cb783bdf7",
    orderDate: "2025-03-06T15:30:00Z",
    status: "shipped",
  },
  {
    drugID: "67dcd9e40a5d333cb783bde1",
    quantity: 60,
    suppliedTo: "Sunrise Hospital",
    vendorID: "67dd2ea00a5d333cb783bdf2",
    orderDate: "2025-03-07T16:10:00Z",
    status: "delivered",
  },
  {
    drugID: "67dcd9e40a5d333cb783bde2",
    quantity: 120,
    suppliedTo: "Central Drug Store",
    vendorID: "67dd2ea00a5d333cb783bdf3",
    orderDate: "2025-03-08T17:45:00Z",
    status: "pending",
  },
  {
    drugID: "67dcd9e40a5d333cb783bdda",
    quantity: 75,
    suppliedTo: "RapidMed Pharmacy",
    vendorID: "67dd2ea00a5d333cb783bdf4",
    orderDate: "2025-03-09T18:20:00Z",
    status: "shipped",
  },
  {
    drugID: "67dcd9e40a5d333cb783bddb",
    quantity: 40,
    suppliedTo: "CareFirst Hospital",
    vendorID: "67dd2ea00a5d333cb783bdf5",
    orderDate: "2025-03-10T19:00:00Z",
    status: "delivered",
  },
  {
    drugID: "67dcd9e40a5d333cb783bddd",
    quantity: 100,
    suppliedTo: "HealthFirst Clinic",
    vendorID: "67dd2ea00a5d333cb783bdf6",
    orderDate: "2025-03-11T10:30:00Z",
    status: "pending",
  },
  {
    drugID: "67dcd9e40a5d333cb783bdde",
    quantity: 110,
    suppliedTo: "QuickCare Pharmacy",
    vendorID: "67dd2ea00a5d333cb783bdf7",
    orderDate: "2025-03-12T11:15:00Z",
    status: "shipped",
  },
  {
    drugID: "67dcd9e40a5d333cb783bddf",
    quantity: 95,
    suppliedTo: "Superior Health Center",
    vendorID: "67dd2ea00a5d333cb783bdf2",
    orderDate: "2025-03-13T12:50:00Z",
    status: "delivered",
  },
  {
    drugID: "67dcd9e40a5d333cb783bde0",
    quantity: 70,
    suppliedTo: "MedEx Pharmacy",
    vendorID: "67dd2ea00a5d333cb783bdf3",
    orderDate: "2025-03-14T13:25:00Z",
    status: "cancelled",
  },
  {
    drugID: "67dcd9e40a5d333cb783bde1",
    quantity: 130,
    suppliedTo: "Express Care",
    vendorID: "67dd2ea00a5d333cb783bdf4",
    orderDate: "2025-03-15T14:10:00Z",
    status: "pending",
  },
  {
    drugID: "67dcd9e40a5d333cb783bde2",
    quantity: 150,
    suppliedTo: "CarePoint Pharmacy",
    vendorID: "67dd2ea00a5d333cb783bdf5",
    orderDate: "2025-03-16T15:40:00Z",
    status: "shipped",
  },
  {
    drugID: "67dcd9e40a5d333cb783bdda",
    quantity: 65,
    suppliedTo: "Downtown Medical Center",
    vendorID: "67dd2ea00a5d333cb783bdf6",
    orderDate: "2025-03-17T16:30:00Z",
    status: "delivered",
  },
  {
    drugID: "67dcd9e40a5d333cb783bddb",
    quantity: 55,
    suppliedTo: "Vital Pharmacy",
    vendorID: "67dd2ea00a5d333cb783bdf7",
    orderDate: "2025-03-18T17:10:00Z",
    status: "cancelled",
  },
  {
    drugID: "67dcd9e40a5d333cb783bddd",
    quantity: 85,
    suppliedTo: "CareLine Hospital",
    vendorID: "67dd2ea00a5d333cb783bdf2",
    orderDate: "2025-03-19T18:50:00Z",
    status: "pending",
  },
  {
    drugID: "67dcd9e40a5d333cb783bdde",
    quantity: 90,
    suppliedTo: "Prime Health Pharmacy",
    vendorID: "67dd2ea00a5d333cb783bdf3",
    orderDate: "2025-03-20T19:20:00Z",
    status: "shipped",
  },
];


async function seedSupplyOrders() {
  console.log("Starting to seed supply orders...");

  for (const order of supplyOrders) {
    try {
      const response = await fetch("http://localhost:3000/api/supplyorders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      if (!response.ok) {
        throw new Error(`Failed to create order for ${order.suppliedTo}`);
      }

      const result = await response.json();
      console.log(`✅ Created order for ${order.suppliedTo}`);

      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(
        `❌ Failed to create order for ${order.suppliedTo}:`,
        error
      );
    }
  }

  console.log("Finished seeding supply orders");
}

seedSupplyOrders();
