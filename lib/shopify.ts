// ===== Shopify Storefront API Client =====
// Connects to Shopify's Storefront API to fetch products, create carts, and handle checkout.

const STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "eaas01-ga.myshopify.com";
const PUBLIC_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_PUBLIC_TOKEN || "648754c13ca0f9118a8eeb02beb265a0";
const PRIVATE_TOKEN = process.env.SHOPIFY_PRIVATE_STOREFRONT_TOKEN;
const API_VERSION = process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION || "2026-07";

const ENDPOINT = `https://${STORE_DOMAIN}/api/${API_VERSION}/graphql.json`;

export type ShopifyImage = {
  url: string;
  altText: string | null;
  width?: number;
  height?: number;
};

export type ShopifyVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  price: { amount: string; currencyCode: string };
  compareAtPrice?: { amount: string; currencyCode: string } | null;
  image?: ShopifyImage | null;
};

export type ShopifyProduct = {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  productType: string;
  vendor: string;
  tags: string[];
  featuredImage: ShopifyImage | null;
  images: { edges: { node: ShopifyImage }[] };
  variants: { edges: { node: ShopifyVariant }[] };
  priceRange: {
    minVariantPrice: { amount: string; currencyCode: string };
    maxVariantPrice: { amount: string; currencyCode: string };
  };
  options: {
    id: string;
    name: string;
    values: string[];
  }[];
};

export type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  lines: {
    edges: {
      node: {
        id: string;
        quantity: number;
        merchandise: {
          id: string;
          title: string;
          price: { amount: string; currencyCode: string };
          image?: ShopifyImage | null;
          product: { title: string; handle: string; featuredImage?: ShopifyImage | null };
        };
      };
    }[];
  };
};

async function shopifyFetch<T>(query: string, variables: Record<string, unknown> = {}, usePrivate = false): Promise<T> {
  const token = usePrivate && PRIVATE_TOKEN ? PRIVATE_TOKEN : PUBLIC_TOKEN;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "X-Shopify-Storefront-Access-Token": token,
  };

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Shopify API error: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();
  if (json.errors) {
    throw new Error(`Shopify GraphQL errors: ${JSON.stringify(json.errors)}`);
  }
  return json.data as T;
}

// ===== Queries =====

const PRODUCT_FIELDS = `
  id
  handle
  title
  description
  descriptionHtml
  productType
  vendor
  tags
  featuredImage { url altText width height }
  images(first: 8) { edges { node { url altText width height } } }
  variants(first: 20) {
    edges {
      node {
        id
        title
        availableForSale
        price { amount currencyCode }
        compareAtPrice { amount currencyCode }
        image { url altText }
      }
    }
  }
  priceRange {
    minVariantPrice { amount currencyCode }
    maxVariantPrice { amount currencyCode }
  }
  options {
    id
    name
    values
  }
`;

const GET_ALL_PRODUCTS = `
  query GetAllProducts {
    products(first: 50) {
      edges {
        node {
          ${PRODUCT_FIELDS}
        }
      }
    }
  }
`;

const GET_PRODUCT_BY_HANDLE = `
  query GetProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      ${PRODUCT_FIELDS}
    }
  }
`;

// ===== API Functions =====

export async function getAllProducts(): Promise<ShopifyProduct[]> {
  const data = await shopifyFetch<{ products: { edges: { node: ShopifyProduct }[] } }>(GET_ALL_PRODUCTS);
  return data.products.edges.map((e) => e.node);
}

export async function getProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  const data = await shopifyFetch<{ productByHandle: ShopifyProduct | null }>(GET_PRODUCT_BY_HANDLE, { handle });
  return data.productByHandle;
}

// ===== Cart Mutations =====

const CREATE_CART = `
  mutation CreateCart($cartInput: CartInput) {
    cartCreate(input: $cartInput) {
      cart {
        id
        checkoutUrl
        totalQuantity
        lines(first: 20) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price { amount currencyCode }
                  image { url altText }
                  product { title handle featuredImage { url altText } }
                }
              }
            }
          }
        }
      }
    }
  }
`;

const ADD_TO_CART = `
  mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        totalQuantity
        lines(first: 20) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price { amount currencyCode }
                  image { url altText }
                  product { title handle featuredImage { url altText } }
                }
              }
            }
          }
        }
      }
    }
  }
`;

const GET_CART = `
  query GetCart($cartId: ID!) {
    cart(id: $cartId) {
      id
      checkoutUrl
      totalQuantity
      lines(first: 20) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                price { amount currencyCode }
                image { url altText }
                product { title handle featuredImage { url altText } }
              }
            }
          }
        }
      }
    }
  }
`;

const REMOVE_FROM_CART = `
  mutation RemoveFromCart($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        id
        checkoutUrl
        totalQuantity
        lines(first: 20) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price { amount currencyCode }
                  image { url altText }
                  product { title handle featuredImage { url altText } }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export async function createCart(variantId?: string, quantity = 1): Promise<ShopifyCart> {
  const cartInput: Record<string, unknown> = {};
  if (variantId) {
    cartInput.lines = [{ merchandiseId: variantId, quantity }];
  }
  const data = await shopifyFetch<{ cartCreate: { cart: ShopifyCart } }>(CREATE_CART, { cartInput });
  return data.cartCreate.cart;
}

export async function addToCart(cartId: string, variantId: string, quantity = 1): Promise<ShopifyCart> {
  const data = await shopifyFetch<{ cartLinesAdd: { cart: ShopifyCart } }>(ADD_TO_CART, {
    cartId,
    lines: [{ merchandiseId: variantId, quantity }],
  });
  return data.cartLinesAdd.cart;
}

export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  const data = await shopifyFetch<{ cart: ShopifyCart | null }>(GET_CART, { cartId });
  return data.cart;
}

export async function removeFromCart(cartId: string, lineIds: string[]): Promise<ShopifyCart> {
  const data = await shopifyFetch<{ cartLinesRemove: { cart: ShopifyCart } }>(REMOVE_FROM_CART, {
    cartId,
    lineIds,
  });
  return data.cartLinesRemove.cart;
}

// ===== Helpers =====

export function formatPrice(amount: string | number, currencyCode = "CAD"): string {
  const value = typeof amount === "string" ? parseFloat(amount) : amount;
  return new Intl.NumberFormat("fr-CA", {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 2,
  }).format(value);
}

export function scrollToId(id: string) {
  if (typeof document !== "undefined") {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }
}
