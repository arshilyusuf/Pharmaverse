"use client"
import {
  LocalPharmacy,
  Inventory,
  ShoppingCart,
  Store,
  Assessment,
} from "@mui/icons-material";
import { motion } from "framer-motion";

const features = [
  {
    icon: <LocalPharmacy fontSize="large" className="text-blue-500" />,
    title: "Drug Inventory Tracking",
    description:
      "Monitor stock levels in real-time to prevent shortages and overstocking.",
  },
  {
    icon: <ShoppingCart fontSize="large" className="text-green-500" />,
    title: "Supply Order Management",
    description:
      "Easily manage and track your pharmaceutical supply orders with automated alerts.",
  },
  {
    icon: <Store fontSize="large" className="text-purple-500" />,
    title: "Vendor & Drug Management",
    description:
      "Keep track of vendors and manage drug details efficiently in one place.",
  },
  {
    icon: <Assessment fontSize="large" className="text-yellow-500" />,
    title: "Consumption & Order Insights",
    description:
      "Gain insights into drug usage patterns and optimize supply planning.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen py-2 px-4 pt-0 md:px-6 lg:px-8">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl lg:text-7xl font-black w-full md:w-[70%] lg:w-[60%] tracking-tighter mt-10 md:mt-15 text-center md:text-left"
      >
        Pharmaverse - <br className="hidden md:block" />
        <span className="block md:inline">
          Smart Drug Inventory & Supply Management Simplified
        </span>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="py-8 md:py-12 lg:py-16 px-4 md:px-6 w-full"
      >
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.2 * (index + 1),
                }}
                className="rounded-2xl p-4 md:p-6 flex flex-col items-center text-center space-y-3 md:space-y-4"
              >
                <motion.div
                  className="bg-gray-200 shadow-lg p-3 md:p-4 rounded-full"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-lg md:text-xl font-bold">
                  {feature.title}
                </h3>
                <p className="text-sm md:text-base text-[var(--font-nav)]">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
