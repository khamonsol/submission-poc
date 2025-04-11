import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/component/ui/select'
import { useAtom } from 'jotai/index'
import { productOptionsAtom, selectedProductAtom } from '@/shared/atoms/products'
import { AlertCircleIcon } from 'lucide-react'

export function ProductSelector() {
  const [productOptions] = useAtom(productOptionsAtom);
  const [selectedProduct, setSelectedProduct] = useAtom(selectedProductAtom);
  const iconSize = (selectedProduct?.length > 1) ? 0: 12

  return (
    <>
      <label className="text-sm font-medium">Product</label>
      <Select value={selectedProduct} onValueChange={setSelectedProduct}>
        <SelectTrigger className="w-[180px]">
          <AlertCircleIcon color="red" size={iconSize} />
          <SelectValue placeholder="Select Product" />
        </SelectTrigger>
        <SelectContent>
          {productOptions.map((product) => (
            <SelectItem key={product} value={product}>
              {product}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  )
}