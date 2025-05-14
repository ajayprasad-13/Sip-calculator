import { useState } from "react";
import "./App.css";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function App() {
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(100);
  const [expectedReturn, setExpectedReturn] = useState<number>(1);
  const [timePeriod, setTimePeriod] = useState<number>(1);

  function calculateSIP(
    monthlyInvestment: number,
    annualRate: number,
    years: number
  ): number {
    const r = annualRate / 12 / 100;
    const n = years * 12;
    const futureValue =
      monthlyInvestment * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    return futureValue;
  }

  function calculateTotalInvested(
    monthlyInvestment: number,
    years: number
  ): number {
    return monthlyInvestment * years * 12;
  }

  const investedAmount = calculateTotalInvested(monthlyInvestment, timePeriod);
  const futureValue = calculateSIP(
    monthlyInvestment,
    expectedReturn,
    timePeriod
  );
  const returns = futureValue - investedAmount;

  const data = [
    { name: "Invested Amount", value: investedAmount },
    { name: "Returns", value: returns },
  ];

  const COLORS = ["#0088FE", "#00C49F"];

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-10 bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-6xl bg-white border border-gray-200 rounded-2xl shadow-xl p-4 sm:p-6 md:p-10 flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/2 flex flex-col justify-center gap-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
            SIP Calculator
          </h2>

          <div className="flex flex-col">
            <label className="text-gray-600 mb-1">Monthly Investment</label>
            <input
              onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
              value={monthlyInvestment}
              type="number"
              placeholder="e.g. 5000"
              className="border-b border-gray-400 focus:outline-none focus:border-blue-600 px-2 py-2 text-gray-800"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 mb-1">
              Expected Return Rate (p.a)
            </label>
            <input
              onChange={(e) => setExpectedReturn(Number(e.target.value))}
              value={expectedReturn}
              type="number"
              placeholder="e.g. 12"
              className="border-b border-gray-400 focus:outline-none focus:border-blue-600 px-2 py-2 text-gray-800"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 mb-1">Time Period (in years)</label>
            <input
              onChange={(e) => setTimePeriod(Number(e.target.value))}
              value={timePeriod}
              type="number"
              placeholder="e.g. 10"
              className="border-b border-gray-400 focus:outline-none focus:border-blue-600 px-2 py-2 text-gray-800"
            />
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center bg-gray-100 rounded-lg p-4 sm:p-6">
          <div className="w-full h-[250px] sm:h-[300px] md:h-[350px]">
            <ResponsiveContainer>
              <PieChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  label={({ name, value }) =>
                    `${name}: ₹${value.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}`
                  }
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) =>
                    `₹${value.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}`
                  }
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6 space-y-2 text-gray-700 text-base sm:text-lg font-medium text-center sm:text-left">
            <p>
              Invested Amount: ₹
              {investedAmount.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </p>
            <p>
              Returns: ₹
              {returns.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </p>
            <p>
              Total Value: ₹
              {futureValue.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
