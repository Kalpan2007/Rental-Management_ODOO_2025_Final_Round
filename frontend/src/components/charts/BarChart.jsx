import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const BarChart = ({ data, title, xAxisLabel, yAxisLabel, tooltipFormat, darkMode }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    // If there's an existing chart, destroy it before creating a new one
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');

    // Create the new chart
    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.labels,
        datasets: [{
          label: title,
          data: data.values,
          backgroundColor: darkMode 
            ? 'rgba(79, 70, 229, 0.7)' // Indigo color for dark mode
            : 'rgba(79, 70, 229, 0.5)', // Lighter indigo for light mode
          borderColor: darkMode
            ? 'rgba(79, 70, 229, 0.9)'
            : 'rgba(79, 70, 229, 0.8)',
          borderWidth: 1,
          borderRadius: 4,
          hoverBackgroundColor: 'rgba(79, 70, 229, 0.8)',
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (tooltipFormat) {
                  label += tooltipFormat(context.parsed.y);
                } else {
                  label += context.parsed.y;
                }
                return label;
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
        scales: {
          x: {
            title: {
              display: !!xAxisLabel,
              text: xAxisLabel,
              color: darkMode ? '#ccc' : '#666',
            },
            ticks: {
              color: darkMode ? '#ccc' : '#666',
            },
            grid: {
              display: false,
              color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
            }
          },
          y: {
            title: {
              display: !!yAxisLabel,
              text: yAxisLabel,
              color: darkMode ? '#ccc' : '#666',
            },
            ticks: {
              color: darkMode ? '#ccc' : '#666',
              callback: function(value) {
                if (tooltipFormat) {
                  return tooltipFormat(value);
                }
                return value;
              }
            },
            grid: {
              color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
            },
            beginAtZero: true
          }
        }
      }
    });

    // Cleanup function to destroy chart when component unmounts
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, title, xAxisLabel, yAxisLabel, tooltipFormat, darkMode]);

  return (
    <div className="w-full h-full">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default BarChart;