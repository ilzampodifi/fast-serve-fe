import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardDescription,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "./ui/card";
import { getConfig } from "@/config";
import type { Menu } from "@/types/menu";
import { fetchItems } from "@/lib/fetch";
import { Button } from "./ui/button";

type Props = {
  menu?: Menu;
};

export const ItemCard = ({ menu }: Props) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["items", menu?._id],
    queryFn: () => fetchItems({ menuId: menu?._id || "" }),
    enabled: !!menu?._id,
  });

  return (
    <Card className="col-span-6 rounded-none border-r shadow-none">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold text-gray-900">
          {menu ? `${menu.name} - ${menu.type}` : "Available Items"}
        </CardTitle>
        <CardDescription className="text-base text-gray-600">
          {menu
            ? `Discover our delicious ${menu.type?.toLowerCase()} menu items`
            : "Please choose a menu category to view available items"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="text-gray-600 font-medium">
                Loading delicious items...
              </p>
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <div className="text-red-600 text-lg font-semibold mb-2">
                  Oops! Something went wrong
                </div>
                <p className="text-red-500">{error.message}</p>
              </div>
            </div>
          </div>
        )}

        {!menu && (
          <div className="flex items-center justify-center py-16">
            <div className="text-center max-w-md">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-8 shadow-sm">
                <div className="mb-4">
                  <svg
                    className="w-16 h-16 mx-auto text-blue-400 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div className="text-blue-900 text-xl font-bold mb-3">
                  Choose a Menu Category
                </div>
                <p className="text-blue-700 text-base leading-relaxed">
                  Select a menu category from the left to explore our delicious
                  food items and start building your order.
                </p>
                <div className="mt-6 flex justify-center">
                  <div className="flex items-center space-x-2 text-blue-600 text-sm font-medium">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Browse categories on the left</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {data && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.data.map((item) => (
              <Card
                key={item._id}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md overflow-hidden bg-white"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                <CardContent className="p-4">
                  <CardTitle className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
                    {item.name}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">
                    {item.description ||
                      "A delicious menu item crafted with care."}
                  </CardDescription>
                  {item.price && (
                    <div className="text-xl font-bold text-primary mb-3">
                      ${item.price.toFixed(2)}
                    </div>
                  )}
                </CardContent>

                <CardFooter className="p-4 pt-0">
                  <Button className="w-full">Add to Cart</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {data && data.data.length === 0 && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
                <div className="text-gray-600 text-lg font-semibold mb-2">
                  No items available
                </div>
                <p className="text-gray-500">
                  This menu category doesn't have any items yet.
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
