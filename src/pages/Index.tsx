import { ItemCard } from "@/components/item-card";
import { MenuCard } from "@/components/menu-card";
import { OrderCard } from "@/components/order.card";
import type { Menu } from "@/types/menu";
import { useState } from "react";

export default function Index() {
  const [menu, setMenu] = useState<Menu>();

  return (
    <div className="grid grid-cols-12 min-h-screen">
      <MenuCard onSelectMenu={setMenu} onClearMenu={() => setMenu(undefined)} />
      <ItemCard menu={menu} />
      <OrderCard />
    </div>
  );
}
