
import React, { useState, useMemo } from 'react';
import type { PageProps, E1RMDataPoint } from '../types';
import Select from '../components/ui/Select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

const ProgressPage: React.FC<PageProps> = ({ masterExerciseList, e1rmData }) => {
  const [selectedExerciseForChart, setSelectedExerciseForChart] = useState('');

  const exerciseOptions = masterExerciseList.map(ex => ({ value: ex.nombre, label: ex.nombre }));

  const chartData = useMemo(() => {
    if (!selectedExerciseForChart || !e1rmData[selectedExerciseForChart]) {
      return [];
    }
    // Sort by timestamp if not already sorted, then format date for display
    return e1rmData[selectedExerciseForChart]
        .sort((a,b) => a.timestamp - b.timestamp)
        .map(dp => ({
            ...dp,
            // Format date for XAxis. Assuming dp.date is DD/MM/YYYY
            // For better charting, convert to a consistent, sortable format or use timestamps
            // For simplicity, if DD/MM/YYYY, take first 5 chars: DD/MM
            formattedDate: dp.date.length === 10 && dp.date[2] === '/' && dp.date[5] === '/' ? dp.date.substring(0,5) : dp.date 
        }));
  }, [selectedExerciseForChart, e1rmData]);

  const currentE1RM = chartData.length > 0 ? chartData[chartData.length - 1].e1RM : 0;
  
  let percentageChangeText = "";
  let percentageChangeColor = "text-[#90adcb]";

  if (chartData.length >= 2) {
    const lastE1RM = chartData[chartData.length - 1].e1RM;
    // Find a point roughly 3 months ago, or the first point if less than 3 months of data
    const threeMonthsAgoTimestamp = new Date().setMonth(new Date().getMonth() - 3);
    let referencePoint = chartData.find(dp => dp.timestamp <= threeMonthsAgoTimestamp);
    if(!referencePoint && chartData.length > 1) referencePoint = chartData[0]; // Fallback to first point if no 3-month-old data

    if (referencePoint && referencePoint.e1RM > 0 && lastE1RM > 0 && referencePoint.timestamp !== chartData[chartData.length -1].timestamp) {
        const change = ((lastE1RM - referencePoint.e1RM) / referencePoint.e1RM) * 100;
        percentageChangeText = `${change >= 0 ? '+' : ''}${change.toFixed(1)}%`;
        percentageChangeColor = change >= 0 ? 'text-[#0bda5b]' : 'text-red-500';
    } else if (referencePoint && referencePoint.timestamp === chartData[chartData.length -1].timestamp && chartData.length > 1) {
        // If the reference point is the last point, use the second to last as reference
        const secondLastPoint = chartData[chartData.length - 2];
        if (secondLastPoint && secondLastPoint.e1RM > 0 && lastE1RM > 0) {
            const change = ((lastE1RM - secondLastPoint.e1RM) / secondLastPoint.e1RM) * 100;
            percentageChangeText = `${change >= 0 ? '+' : ''}${change.toFixed(1)}% (vs prev)`;
            percentageChangeColor = change >= 0 ? 'text-[#0bda5b]' : 'text-red-500';
        }
    }
  }


  return (
    <div className="p-4 space-y-8 max-w-2xl mx-auto">
      <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] text-center">e1RM Progress</h2>
      
      <div className="bg-[#182634] p-4 rounded-lg">
        <Select
          label="Select Exercise to View Progress"
          options={[{ value: "", label: "Select an exercise" }, ...exerciseOptions]}
          value={selectedExerciseForChart}
          onChange={(e) => setSelectedExerciseForChart(e.target.value)}
          className="bg-[#223649]"
        />
      </div>

      {selectedExerciseForChart && chartData.length > 0 && (
        <div className="bg-[#182634] p-4 rounded-lg">
            <p className="text-white text-base font-medium leading-normal">{selectedExerciseForChart}</p>
            <p className="text-white tracking-light text-[32px] font-bold leading-tight truncate">{currentE1RM} kg</p>
            {percentageChangeText && (
                <div className="flex gap-1">
                    <p className="text-[#90adcb] text-base font-normal leading-normal">Change</p>
                    <p className={`text-base font-medium leading-normal ${percentageChangeColor}`}>{percentageChangeText}</p>
                </div>
            )}
          <div className="min-h-[250px] flex-1 flex-col gap-8 py-4">
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={chartData} margin={{ top: 5, right: 20, left: -25, bottom: 20 }}>
                <defs>
                  <linearGradient id="colorE1RM" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0a65c1" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#0a65c1" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#223649" />
                <XAxis dataKey="formattedDate" stroke="#90adcb" tick={{ fontSize: 12 }} />
                <YAxis stroke="#90adcb" tick={{ fontSize: 12 }} domain={['dataMin - 5', 'dataMax + 5']} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#101a23', border: '1px solid #223649', borderRadius: '0.5rem' }}
                  labelStyle={{ color: '#ffffff', fontWeight: 'bold' }}
                  itemStyle={{ color: '#0a65c1' }}
                  formatter={(value: number, name: string) => [`${value} kg`, name === 'e1RM' ? 'Est. 1RM' : name ]}
                />
                <Legend wrapperStyle={{fontSize: "13px", paddingTop: "10px"}} formatter={(value) => <span className="text-[#90adcb]">{value === 'e1RM' ? 'Est. 1RM' : value}</span>}/>
                <Area type="monotone" dataKey="e1RM" stroke="#0a65c1" fillOpacity={1} fill="url(#colorE1RM)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
             <div className="flex justify-around mt-2">
                {chartData.length > 0 && <p className="text-[#90adcb] text-[13px] font-bold leading-normal tracking-[0.015em]">{chartData[0].formattedDate}</p>}
                {chartData.length > 2 && <p className="text-[#90adcb] text-[13px] font-bold leading-normal tracking-[0.015em]">{chartData[Math.floor(chartData.length / 2)].formattedDate}</p>}
                {chartData.length > 1 && <p className="text-[#90adcb] text-[13px] font-bold leading-normal tracking-[0.015em]">{chartData[chartData.length-1].formattedDate}</p>}
              </div>
          </div>
        </div>
      )}
      {selectedExerciseForChart && chartData.length === 0 && (
        <p className="text-[#90adcb] text-center">No e1RM data available for {selectedExerciseForChart}. Log some workouts!</p>
      )}
    </div>
  );
};

export default ProgressPage;

