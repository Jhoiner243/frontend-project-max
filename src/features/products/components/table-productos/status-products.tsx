// StatusLegend.tsx
import React from "react";

interface StatusItem {
  value: "Disponible" | "Pocas unidades" | "Agotado";
  label: string;
}

interface StatusLegendProps {
  items: StatusItem[];
}

export const StatusLegend: React.FC<StatusLegendProps> = ({ items }) => {
  const getColor = (value: string) => {
    switch (value) {
      case "Disponible":
        return "green";
      case "Pocas unidades":
        return "yellow";
      case "Agotado":
        return "red";
      default:
        return "gray";
    }
  };

  const getLabelDetail = (value: string) => {
    switch (value) {
      case "Disponible":
        return "15 >";
      case "Pocas unidades":
        return "< 10";
      case "Agotado":
        return "0";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-2">
      {items.map((item) => {
        const color = getColor(item.value);
        return (
          <div key={item.value} className="flex items-center">
            {/* Punto de color */}
            <span className={`w-2 h-2 rounded-full mr-2 bg-${color}-500`} />
            {/* Texto explicativo */}
            <p className="text-sm">{getLabelDetail(item.value)}</p>
            {/* Badge con label */}
            <span
              className={`ml-2 px-2 py-1 rounded-full text-xs font-medium bg-${color}-100 text-${color}-800`}
            >
              {item.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};
