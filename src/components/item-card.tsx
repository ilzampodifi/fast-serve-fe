import {
  Card,
  CardDescription,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";

export const ItemCard = () => {
  return (
    <Card className="col-span-8 rounded-none border-r shadow-none">
      <CardHeader>
        <CardTitle>Breakfast Available Items</CardTitle>
        <CardDescription>
          List of available breakfast menu items
        </CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
};
