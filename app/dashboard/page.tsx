"use client";
import { DatePickerWithRange } from "@/components/date-range-picker";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useDateRangeStore from "@/lib/stores/dashboard";
import { AreaChart, DonutChart, LineChart } from "@tremor/react";

export default function DashboardPage() {
  return (
    <main className="p-8 space-y-2">
      <div className="flex gap-2">
        <DatePickerWithRange store={useDateRangeStore} />
        <Button>Download</Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Mastery of Subject</CardTitle>
        </CardHeader>
        <CardContent>
          <LineChart
            data={[
              { date: "June", math: 1000, phys: 2000 },
              { date: "June", math: 3000, phys: 2500 },
            ]}
            index="date"
            categories={["math", "phys"]}
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Mastery of Subject</CardTitle>
        </CardHeader>
        <CardContent>
          <AreaChart
            data={[
              { date: "June", math: 1000, phys: 2000 },
              { date: "June", math: 3000, phys: 2500 },
            ]}
            index="date"
            categories={["math", "phys"]}
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Group Performance Donut</CardTitle>
        </CardHeader>
        <CardContent>
          <DonutChart
            data={[
              { name: "Excellent", value: 30 },
              { name: "Good", value: 40 },
              { name: "Satisfactory", value: 20 },
              { name: "Bad", value: 10 },
            ]}
            variant="donut"
            colors={["green", "yellow", "orange", "red"]}
            onValueChange={(v) => console.log(v)}
            label="10B"
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Group Performance Per student</CardTitle>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Individual Performance over modules</CardTitle>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Individual activity over modules</CardTitle>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </main>
  );
}
