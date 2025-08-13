import { fetchMenu } from "@/lib/fetch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { Loader2, RefreshCcw } from "lucide-react";
import { useState } from "react";
import type { Menu } from "@/types/menu";

type Props = {
  onSelectMenu: (menu: Menu) => void;
  onClearMenu?: () => void;
};

export const MenuCard = ({ onSelectMenu, onClearMenu }: Props) => {
  const [time, setTime] = useState(
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
  );
  const [selectedMenu, setSelectedMenu] = useState<string>("");

  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ["menu", time],
    queryFn: () => fetchMenu({ time }),
  });

  return (
    <Card className="col-span-3 rounded-none border-r shadow-none">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Available menu</CardTitle>
            <CardDescription>List of available menu at {time}</CardDescription>
          </div>
          <Button
            onClick={() => {
              // Clear the selected menu state
              setSelectedMenu("");
              // Clear the parent menu state
              onClearMenu?.();
              // Update time to trigger refetch
              setTime(
                new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })
              );
            }}
            variant="outline"
            disabled={isFetching}
          >
            <RefreshCcw className={isFetching ? "animate-spin" : ""} />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {(isLoading || isFetching) && (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="animate-spin size-4" />
          </div>
        )}
        {error && <div>Error: {error.message}</div>}
        {data && (
          <RadioGroup
            value={selectedMenu}
            onValueChange={(menu) => {
              setSelectedMenu(menu);
              onSelectMenu(data.data.find((m) => m._id === menu) as Menu);
            }}
            className="flex flex-col h-full gap-4"
          >
            {data.data.map((menu) => (
              <div key={menu._id} className="relative">
                <Label htmlFor={menu._id} className="cursor-pointer block">
                  <Card
                    className={`transition-colors hover:bg-muted/50 ${
                      selectedMenu === menu._id
                        ? "ring-2 ring-primary bg-muted/30"
                        : ""
                    }`}
                  >
                    <CardHeader className="flex flex-row items-start space-y-0 space-x-3 pb-3">
                      <RadioGroupItem
                        value={menu._id || ""}
                        id={menu._id}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <CardTitle className="text-base">
                          {menu.name} - {menu.type}
                        </CardTitle>
                        <CardDescription className="mt-1">
                          {menu.startTime} - {menu.endTime}
                        </CardDescription>
                      </div>
                    </CardHeader>
                  </Card>
                </Label>
              </div>
            ))}
          </RadioGroup>
        )}
      </CardContent>
    </Card>
  );
};
