"use client";
import { DatePickerWithRange } from "@/components/date-range-picker";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useDateRangeStore from "@/lib/stores/dashboard";
import { AreaChart, LineChart } from "@tremor/react";

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
    </main>
  );
}
