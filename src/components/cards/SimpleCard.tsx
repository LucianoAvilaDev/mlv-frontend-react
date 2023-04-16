export const SimpleCard = ({ product }: any) => {
  return (
    <>
      <div className="max-w-sm m-4 w-full border border-gray-200 bg-white rounded-lg shadow-gray-500 shadow-md ">
        <div className="p-2 antialiased border-b w-full text-center text-2xl font-medium text-gray-900">
          {product.name}
        </div>
      </div>
    </>
  );
};
