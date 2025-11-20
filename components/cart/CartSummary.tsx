import { Button } from '../ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card'

interface CartSummaryProps {
  subtotal: number
  shipping?: number
  tax?: number
  onCheckout: () => void
}

export function CartSummary({
  subtotal,
  shipping = 0,
  tax = 0,
  onCheckout,
}: CartSummaryProps) {
  const total = subtotal + shipping + tax

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="border-t pt-3">
            <div className="flex justify-between font-semibold text-lg text-secondary">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
        <Button
          fullWidth
          size="lg"
          className="mt-6"
          onClick={onCheckout}
        >
          Proceed to Checkout
        </Button>
      </CardContent>
    </Card>
  )
}
