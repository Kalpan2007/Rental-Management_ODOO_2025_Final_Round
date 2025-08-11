import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PieChart = ({ data, title, tooltipFormat, darkMode }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // Generate colors based on the number of data points
  const generateColors = (count, opacity = 0.7) => {
    const baseColors = [
      `rgba(79, 70, 229, ${opacity})`, // Indigo
      `rgba(16, 185, 129, ${opacity})`, // Emerald
      `rgba(245, 158, 11, ${opacity})`, // Amber
      `rgba(239, 68, 68, ${opacity})`, // Red
      `rgba(59, 130, 246, ${opacity})`, // Blue
      `rgba(236, 72, 153, ${opacity})`, // Pink
      `rgba(139, 92, 246, ${opacity})`, // Purple
      `rgba(20, 184, 166, ${opacity})`, // Teal
    ];

    // If we have more data points than base colors, we'll cycle through them
    return Array(count).fill().map((_, i) => baseColors[i % baseColors.length]);
  };

  useEffect(() => {
    // If there's an existing chart, destroy it before creating a new one
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    const backgroundColors = generateColors(data.labels.length);
    const borderColors = generateColors(data.labels.length, 1);

    // Create the new chart
    chartInstance.current = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: data.labels,
        datasets: [{
          data: data.values,
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 1,
          hoverOffset: 10,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              color: darkMode ? '#ccc' : '#666',
              padding: 15,
              font: {
                size: 12
              },
              generateLabels: function(chart) {
                const data = chart.data;
                if (data.labels.length && data.datasets.length) {
                  return data.labels.map((label, i) => {
                    const meta = chart.getDatasetMeta(0);
                    const style = meta.controller.getStyle(i);
                    
                    return {
                      text: `${label}: ${tooltipFormat ? tooltipFormat(data.datasets[0].data[i]) : data.datasets[0].data[i]}`,
                      fillStyle: style.backgroundColor,
                      strokeStyle: style.borderColor,
                      lineWidth: style.borderWidth,
                      hidden: isNaN(data.datasets[0].data[i]) || meta.data[i].hidden,
                      index: i
                    };
                  });
                }
                return [];
              }
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const label = context.label || '';
                const value = context.raw;
                const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                const percentage = Math.round((value / total) * 100);
                
                return `${label}: ${tooltipFormat ? tooltipFormat(value) : value} (${percentage}%)`;
              }
            }
          },
          title: {
            display: true,
            text: title,
            color: darkMode ? '#fff' : '#333',
            font: {
              size: 16,
              weight: 'bold'
            }
          }
        },
      }
    });

    // Cleanup function to destroy chart when component unmounts
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, title, tooltipFormat, darkMode]);

  return (
    <div className="w-full h-full">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default PieChart;