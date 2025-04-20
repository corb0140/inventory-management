"use client";

import {
  ExpenseByCategorySummary,
  useGetExpensesByCategoryQuery,
} from "@/lib/state/api";
import React, { useMemo, useState } from "react";
import Loading from "@/Loading.json";
import Lottie from "lottie-react";
import Header from "@/(components)/Header";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

type AggregatedDataItem = {
  name: string;
  color?: string;
  amount: number;
};

type AggregatedData = {
  [category: string]: AggregatedDataItem;
};

const Expenses = () => {
  const {
    data: expensesData,
    isLoading,
    isError,
  } = useGetExpensesByCategoryQuery();
  /**
   * Memoize the expenses data to avoid unnecessary re-renders and to ensure that the component only re-renders when the data changes.
   * This is particularly useful when the data is large or complex.
   * The useMemo hook will only recompute the memoized value when
   * one of the dependencies has changed. In this case, it will recompute the expenses data when expensesData changes.
   * This can help improve performance by preventing unnecessary calculations  and re-renders.
   */
  const expenses = useMemo(() => expensesData ?? [], [expensesData]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const parseDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-CA");
  };

  const aggregateData: AggregatedDataItem[] = useMemo(() => {
    const filtered: AggregatedData = expenses
      .filter((data: ExpenseByCategorySummary) => {
        const matchesCategory =
          selectedCategory === "All" || data.category === selectedCategory;

        const dataDate = parseDate(data.date);

        const matchesDate =
          !startDate ||
          !endDate ||
          (dataDate >= startDate && dataDate <= endDate);

        return matchesCategory && matchesDate;
      })
      .reduce((acc: AggregatedData, data: ExpenseByCategorySummary) => {
        const amount = parseInt(data.amount);
        if (!acc[data.category]) {
          acc[data.category] = {
            name: data.category,
            amount: 0,
          };
          acc[data.category].color = `#${Math.floor(
            Math.random() * 16777215
          ).toString(16)}`;
          acc[data.category].amount += amount;
        }
        return acc;
      }, {});

    return Object.values(filtered);
  }, [expenses, selectedCategory, startDate, endDate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Lottie animationData={Loading} loop={true} className="w-1/2 h-1/2" />
      </div>
    );
  }

  if (isError || !expensesData) {
    return (
      <div className="text-center text-red-500 py-4">Failed to fetch users</div>
    );
  }

  const ClassNames = {
    label: "block text-sm font-medium text-gray-700",
    selectInput:
      "mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md",
  };

  return (
    <div>
      {/* HEADER */}
      <div className="mb-5">
        <Header name="Expenses" />
        <p className="text-sm text-gray-500">
          A visual representation of the expenses over time.
        </p>
      </div>

      {/* FILTERS */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="w-full md:w-1/3 bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">
            Filter by Category and Date
          </h3>
          <div className="space-y-4">
            {/* CATEGORY */}
            <div>
              <label htmlFor="category" className={ClassNames.label}>
                Category
              </label>
              <select
                name="category"
                id="category"
                className={ClassNames.selectInput}
                defaultValue={"All"}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option>All</option>
                <option>Office</option>
                <option>Professional</option>
                <option>Salaries</option>
              </select>
            </div>

            {/* START DATE */}
            <div>
              <label htmlFor="start-date" className={ClassNames.label}>
                Start Date
              </label>
              <input
                name="start-date"
                type="date"
                id="start-date"
                className={ClassNames.selectInput}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            {/* END DATE */}
            <div>
              <label htmlFor="end-date" className={ClassNames.label}>
                End Date
              </label>
              <input
                name="end-date"
                type="date"
                id="end-date"
                className={ClassNames.selectInput}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* PIE CHART */}
        <div className="flex-grow bg-white shadow rounded-lg p-4 lg:p-6">
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={aggregateData}
                cx="50%"
                cy="50%"
                label
                outerRadius={150}
                fill="#8884d8"
                dataKey={"amount"}
                onMouseEnter={(_, index) => setActiveIndex(index)}
              >
                {aggregateData.map(
                  (entry: AggregatedDataItem, index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        index === activeIndex ? "rgb(29, 78, 216)" : entry.color
                      }
                    />
                  )
                )}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Expenses;
