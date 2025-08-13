import { ItemCard } from "@/components/item-card";
import { MenuCard } from "@/components/menu-card";
import { OrderCard } from "@/components/order.card";

export default function Index() {
  return (
    <div className="grid grid-cols-12 min-h-screen">
      <MenuCard />
      <ItemCard />
      <OrderCard />
    </div>
  );
}
