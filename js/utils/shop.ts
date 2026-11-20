// Flash 

export interface ShopFlashMessages {
    success?: string | null;
    error?: string | null;
}

export interface ShopPageProps {
    cart_count: number;
    flash: ShopFlashMessages;
}

// Shop

export type Currency = 'PLN' | 'USD' | 'EUR';

export interface CartItem {
    variant_uuid: string;
    sku: string;
    product_name: string;
    product_slug: string;
    unit_price: number;
    regular_price: number | null;
    quantity: number;
    max_stock: number;
    subtotal: number;
    discount_amount: number;
    total: number;
    attributes: Array<{ name: string; label: string }>;
}

export interface Product {
    id: number;
    name: string;
    price: number;
    sale_price: number | null;
}

export interface ProductListItem {
    id: number;
    name: string;
}

export type ProductSummary = Pick<Product, 'id' | 'name'>; // Tylko z id i name

export interface AttributeValue {
    id: number;
    value: string;
}

export interface Attribute {
    id: number;
    name: string; // np. "Rozmiar", "Kolor"
    values: AttributeValue[];
}

export interface VariantFormAttribute {
    shop_attribute_id: number | null;
    shop_attribute_value_id: number | null;
}

export interface VariantForm {
    shop_product_id: number;
    sku: string;
    price: number;
    stock: number;
    attributes: VariantFormAttribute[];
}

// Tech spec Form

export type AttributePickerType = 'select' | 'color' | 'radio' | 'button' | 'checkbox' | 'image';

export interface ShopAttributeOption {
  id: number;
  label: string;
  value: string | null; // np. '#ff0000' dla kolorów lub null
  slug: string;
}

export interface ShopAttribute {
  id: number;
  name: string;
  slug: string;
  picker: AttributePickerType;
  options: ShopAttributeOption[];
}

// Products

export interface VariantAttribute {
    name: string;
    slug: string;
    picker: 'select' | 'radio' | 'color' | 'image' | 'checkbox' | 'button';
    label: string;
    value: string | null;
    value_slug: string;
}

export interface ProductVariant {
    id: number;
    uuid: string;
    sku: string;
    stock: number;
    price: number;
    sale_price: number | null;
    attributes: VariantAttribute[];
}

export interface Product {
    id: number;
    uuid: string;
    slug: string;
    name: string;
    description: string;
    base_price: number;    
    type: string | null;
    variants: ProductVariant[];
}

export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface PaginatedResponse<T> {
    data: T[];
    links: PaginationLink[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}


// Filter product

export interface FilterAttributeValue {
    id: number;
    label: string;
    slug: string;
    value: string | null;
}

export interface FilterAttribute {
    id: number;
    name: string;
    slug: string;
    picker: string;
    values: FilterAttributeValue[];
}

export interface ProductTypeOption {
    id: number;
    parent_id?: number | null;
    name: string;
    slug: string;
    children_recursive?: ProductTypeOption[];
}

export interface FilterOptions {
    types: ProductTypeOption[];
    attributes: FilterAttribute[];
}

export interface ActiveFilters {
    type: string | null;
    attributes: Record<string, string[]>;
}

// Product show

export interface BreadcrumbItem {
    id: number;
    name: string;
    slug: string;
}

export interface ProductTypeNode {
    id: number;
    name: string;
    slug: string;
    parent_id?: number | null;
    parent_recursive?: ProductTypeNode | null; // Rekurencja: obiekt tego samego typu lub null
}

export interface ProductDetail {
    id: number;
    uuid: string;
    slug: string;
    name: string;
    description: string;
    base_price: number;
    technical_specs: Record<string, string | number>;
    is_downloadable: boolean;
    is_virtual: boolean;
    product_type?: ProductTypeNode | null;
    type: {
        name: string;
        slug: string;
        breadcrumbs: BreadcrumbItem[];
    } | null;
    variants: ProductVariant[];
}