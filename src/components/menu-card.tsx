import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

export const MenuCard = () => {
  return (
    <Card className="col-span-2 rounded-none border-r shadow-none">
      <CardHeader>
        <CardTitle>Available menu</CardTitle>
        <CardDescription>
          List of available menu at{" "}
          {new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
};
