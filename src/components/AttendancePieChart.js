import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

function AttendancePieChart() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const aa = sessionStorage.getItem("data");
  const xx = JSON.parse(aa);
  //   console.log("-----------------");
  //   console.log(xx.length);
  const new1 = xx[xx.length - 1].attendance_summary;

  console.log(new1.Total);
  console.log(new1.Present);

  const COLORS = ["#0088FE", "#FF6347", "#FFBB28", "#00C49F"];
  const data = [
    { name: "Present", value: new1.Present }, // Simulated values, replace with actual data from dd
    {
      name: "Absent",
      value: new1.Total - new1.Present,
    },
    { name: "Total", value: new1.Total },
  ];

  //   const renderCustomTooltip = ({ active, payload }) => {
  //     if (active && payload && payload.length) {
  //       return (
  //         <div
  //           style={{
  //             backgroundColor: "#fff",
  //             padding: "10px",
  //             border: "1px solid #ccc",
  //           }}
  //         >
  //           <p>{`${payload[0].name}: ${payload[0].value}`}</p>
  //           <p>{`${(payload[0].percent * 100).toFixed(0)}%`}</p>
  //         </div>
  //       );
  //     }
  //     return null;
  //   };

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          <Typography variant="h6" align="center" fontStyle={"bold"}>
            Attendance Summary
          </Typography>
        </Grid>
        <Grid item xs={12} md={12}>
          <ResponsiveContainer width="100%" height={isMobile ? 300 : 400}>
            <PieChart>
              <Pie
                data={data.slice(0, 2)}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={isMobile ? 100 : 150}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              {/* <Tooltip content={renderCustomTooltip} />
              <Legend layout="vertical" align="right" verticalAlign="middle" /> */}
            </PieChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>
      <Grid item xs={12} md={12}>
        <TableContainer
          component={Paper}
          style={{ maxWidth: "100%", margin: "auto" }}
        >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell align="right">Count</TableCell>
                {/* <TableCell align="right">Percentage</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.value}</TableCell>
                  {/* <TableCell align="right"> {row.value}</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </div>
  );
}

export default AttendancePieChart;
