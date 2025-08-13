import { getConfig } from "@/config";
import type { BaseResponse } from "@/types/base";
import type { Item } from "@/types/item";
import type { Menu } from "@/types/menu";
import axios from "axios";

export const fetchMenu = async ({ time }: { time: string }) => {
  const config = getConfig();
  const response = await axios.get<BaseResponse<Menu[]>>(`${config.VITE_API_URL}/menu`, {
   
    params: {
      time,
    },
  });

  return response.data;
};


export const fetchItems = async ({ menuId }: { menuId: string }) => {
  const config = getConfig();
  const response = await axios.get<BaseResponse<Item[]>>(`${config.VITE_API_URL}/menu/${menuId}`);
  return response.data;
};