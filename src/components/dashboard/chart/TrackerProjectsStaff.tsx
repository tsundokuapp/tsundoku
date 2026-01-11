import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/shadcn/chart"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

interface ChartTypeRegistry {
  ByMonth: boolean
}

const chartConfig = {
  novel: {
    label: "Novel",
    color: "#2563eb",
  },
  comic: {
    label: "Comic",
    color: "#60a5fa",
  },
} satisfies ChartConfig

const chartDataByMonth = [
  { month: "Janeiro", novel: 186, comic: 80 },
  { month: "Fevereiro", novel: 305, comic: 200 },
  { month: "Março", novel: 237, comic: 120 },
  { month: "Abril", novel: 73, comic: 190 },
  { month: "Maio", novel: 209, comic: 130 },
  { month: "Junho", novel: 214, comic: 140 },
  { month: "Julho", novel: 256, comic: 150 },
  { month: "Agosto", novel: 287, comic: 170 },
  { month: "Setembro", novel: 240, comic: 160 },
  { month: "Outubro", novel: 325, comic: 180 },
  { month: "Novembro", novel: 300, comic: 190 },
  { month: "Dezembro", novel: 400, comic: 220 },
]

const chartDataByWeek = [
  { week: "Segunda", novel: 2, comic: 1 },
  { week: "Terça", novel: 3, comic: 0 },
  { week: "Quarta", novel: 1, comic: 3 },
  { week: "Quinta", novel: 0, comic: 2 },
  { week: "Sexta", novel: 2, comic: 0 },
  { week: "Sábado", novel: 5, comic: 0 },
  { week: "Domingo", novel: 1, comic: 0 },
]

export const TrackerProjectsStaff = ({ ByMonth = true }: ChartTypeRegistry) => {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={ByMonth ? chartDataByMonth : chartDataByWeek}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey={ByMonth ? "month" : "week"}
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="novel" fill="var(--color-novel)" radius={4} />
        <Bar dataKey="comic" fill="var(--color-comic)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}