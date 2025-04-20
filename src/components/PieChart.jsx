import React, { useState, useEffect } from "react";
import { ResponsivePie } from "@nivo/pie";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";

const PieChart = () => {
  const [pieData, setPieData] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Fetch data from Spring backend
  useEffect(() => {
    const fetchPieData = async () => {
      try {
        const response = await fetch("http://localhost:8089/api/claims/count");
        const data = await response.json();

        // Map the backend data to match the pie chart format
        setPieData([
          {
            id: "onHold",
            label: "On Hold",
            value: data.onHold,
            color: "hsl(104, 70%, 50%)",
          },
          {
            id: "Accepted",
            label: "Accepted",
            value: data.accepted,
            color: "hsl(291, 70%, 50%)",
          },
          {
            id: "notAccepted",
            label: "Not Accepted",
            value: data.notAccepted,
            color: "hsl(229, 70%, 50%)",
          },
        ]);
      } catch (error) {
        console.error("Error fetching pie chart data:", error);
      }
    };

    fetchPieData();
  }, []);

  return (
    <ResponsivePie
      data={pieData}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.gray[100],
            },
          },
          legend: {
            text: {
              fill: colors.gray[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.gray[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.gray[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.gray[100],
          },
        },
      }}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={colors.gray[100]}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      enableArcLabels={false}
      arcLabelsRadiusOffset={0.4}
      arcLabelsSkipAngle={7}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );
};

export default PieChart;
