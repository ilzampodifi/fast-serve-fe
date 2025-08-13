import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";

export const OrderCard = () => {
  return (
    <Card className="col-span-2 rounded-none border-l shadow-none">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
        <CardDescription>List of ordered menu</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter>
        <Button>Confirm Order</Button>
      </CardFooter>
    </Card>
  );
};
