"use client";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { BarChart } from "@tremor/react";
import { dataFormatter } from "@/lib/utils";
import useUserLinks from "@/hooks/useUserLinks";

const TopPerformingLinks = () => {
  const { data } = useUserLinks();
  const topLinks = data?.sort((a, b) => b.clicks - a.clicks).slice(0, 5);
  const chartdata = topLinks?.map((item) => {
    const url = new URL(item.originalUrl);
    const domain = url.host;
    return {
      domain,
      "Total Clicks": item.clicks,
    };
  });
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Links</CardTitle>
        </CardHeader>
        <CardContent>
          <BarChart
            data={chartdata}
            index="domain"
            categories={["Total Clicks"]}
            colors={["yellow"]}
            valueFormatter={dataFormatter}
            yAxisWidth={48}
            onValueChange={(v) => console.log(v)}
            showGridLines={false}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default TopPerformingLinks;