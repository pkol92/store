import {
  Html,
  Tailwind,
  Preview,
  Head,
  Body,
  Container,
  Heading,
} from "@react-email/components";
import { OrderInformation } from "./components/OrderInformation";

type PurchaseReceiptEmailProps = {
  product: {
    name: string;
    imagePath: string;
    description: string;
  };
  order: { id: string; createdAt: Date; pricePaid: number };
  downloadVerificationId: string;
};

PurchaseReceiptEmail.PreviewProps = {
  product: {
    name: "Some Product",
    description: "A product description",
    imagePath:
      "/products/6b9116e9-3dc0-4b08-afbe-38cb6f740d56-Zrzut ekranu 2024-07-8 o 13.07.30.png",
  },
  order: { id: "123", createdAt: new Date(), pricePaid: 1000 },
  downloadVerificationId: "1234",
} satisfies PurchaseReceiptEmailProps;

export default function PurchaseReceiptEmail({
  product,
  order,
  downloadVerificationId,
}: PurchaseReceiptEmailProps) {
  return (
    <Html>
      <Preview>Download {product.name} and view receipt</Preview>
      <Tailwind>
        <Head />
        <Body className="font-sans bg-white">
          <Container className="max-w-xl">
            <Heading>Purchase Receipt</Heading>
            <OrderInformation
              order={order}
              product={product}
              downloadVerificationId={downloadVerificationId}
            />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
