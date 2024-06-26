"use client";
import { DatePickerWithRange } from "@/components/date-range-picker";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useDateRangeStore from "@/lib/stores/dashboard";
import {
  AreaChart,
  DonutChart,
  LineChart,
  BarChart,
  BarList,
  Tracker,
  type CustomColor,
} from "@tremor/react";
import { Exo_2 } from "next/font/google";

interface Tracker {
  color: CustomColor;
  tooltip: string;
}

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
          <CardTitle>Group Performance Per Module</CardTitle>
        </CardHeader>
        <CardContent>
          {/* BAR CHART CAN BE RENDERED USING LOOP
          for module in modules, render
          name recieves {subjects.modules.name} 
          for each student grouped by a common module
          and students' names adds the same way
          students' corresponding scores are 
          {subjects.modules.activities.conf_score(sum) 
          or 
          the last activity cumulative_conf_score} */}
          <BarChart
            data={[
              {
                name: "Module 3",
                Ayazhan: 510,
                Assylkhan: 520,
                Dimash: 570,
                Aqbota: 510,
              },
            ]}
            index="name"
            categories={["Ayazhan", "Assylkhan", "Dimash", "Aqbota"]}
            colors={["blue", "teal", "amber", "rose", "indigo", "emerald"]}
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Group Performance for All Modules</CardTitle>
        </CardHeader>
        <CardContent>
          <BarChart
            data={[
              {
                name: "Module 1",
                Ayazhan: 560,
                Assylkhan: 420,
                Dimash: 550,
                Aqbota: 410,
              },
              {
                name: "Module 2",
                Ayazhan: 570,
                Assylkhan: 500,
                Dimash: 500,
                Aqbota: 480,
              },
              {
                name: "Module 3",
                Ayazhan: 510,
                Assylkhan: 520,
                Dimash: 570,
                Aqbota: 510,
              },
            ]}
            index="name"
            categories={["Ayazhan", "Assylkhan", "Dimash", "Aqbota"]}
            colors={["blue", "teal", "amber", "rose", "indigo", "emerald"]}
          />
        </CardContent>
      </Card>
      <div className="flex gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Individual Performance over modules</CardTitle>
          </CardHeader>
          <CardContent>
            <BarList
              // name is {subjects.module.name} for each module
              // value is
              // {subjects.module.name.conf_score(sum)}
              // or
              // the last activity cumulative_conf_score}
              data={[
                { name: "Module 1", value: 560 },
                { name: "Module 2", value: 570 },
                { name: "Module 3", value: 510 },
              ]}
              sortOrder="ascending"
              color="green"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Individual activity over modules</CardTitle>
          </CardHeader>
          <CardContent>
            {/* tooltip gets "activity_time"+"h" 
          color changes as 
          rose if "activity_time"<1
          yellow if "activity_time">=1 or "activity_time" < 2 
        emerald if "activity_time">2 */}
            <Tracker
              data={[
                { color: "emerald", tooltip: "2h" },
                { color: "emerald", tooltip: "2.5h" },
                { color: "yellow", tooltip: "1h" },
                { color: "emerald", tooltip: "2h" },
                { color: "rose", tooltip: "0h" },
                { color: "emerald", tooltip: "2h" },
              ]}
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
      </div>
    </main>
  );
}
