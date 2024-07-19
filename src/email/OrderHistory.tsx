import {
  Html,
  Tailwind,
  Preview,
  Head,
  Body,
  Container,
  Heading,
  Hr,
} from "@react-email/components";
import { OrderInformation } from "./components/OrderInformation";
import React from "react";

type OrderHistoryEmailProps = {
  orders: Array<{
    id: string;
    pricePaid: number;
    createdAt: Date;
    downloadVerificationId: string;
    product: {
      name: string;
      imagePath: string;
      description: string;
    };
  }>;
};

OrderHistoryEmail.PreviewProps = {
  orders: [
    {
      id: crypto.randomUUID(),
      pricePaid: 1000,
      createdAt: new Date(),
      downloadVerificationId: crypto.randomUUID(),
      product: {
        name: "Some Product",
        description: "A product description",
        imagePath:
          "/products/6b9116e9-3dc0-4b08-afbe-38cb6f740d56-Zrzut ekranu 2024-07-8 o 13.07.30.png",
      },
    },
    {
      id: crypto.randomUUID(),
      pricePaid: 200,
      createdAt: new Date(),
      downloadVerificationId: crypto.randomUUID(),
      product: {
        name: "Some Product 2",
        description: "A product description 2",
        imagePath:
          "/products/6b9116e9-3dc0-4b08-afbe-38cb6f740d56-Zrzut ekranu 2024-07-8 o 13.07.30.png",
      },
    },
  ],
} satisfies OrderHistoryEmailProps;

export default function OrderHistoryEmail({ orders }: OrderHistoryEmailProps) {
  return (
    <Html>
      <Preview>Order History & Downloads</Preview>
      <Tailwind>
        <Head />
        <Body className="font-sans bg-white">
          <Container className="max-w-xl">
            <Heading>Order History</Heading>
            {orders.map((order, index) => (
              <React.Fragment key={order.id}>
                <OrderInformation
                  order={order}
                  product={order.product}
                  downloadVerificationId={order.downloadVerificationId}
                />
                {index < orders.length - 1 && <Hr />}
              </React.Fragment>
            ))}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
