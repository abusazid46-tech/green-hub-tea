"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import {
  BarChart3,
  Boxes,
  CreditCard,
  FolderPlus,
  Gauge,
  Inbox,
  LayoutDashboard,
  LogOut,
  PackagePlus,
  RefreshCcw,
  Save,
  Search,
  ShieldCheck,
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { Product } from "@/lib/data";
import type { CategoryRow, Inquiry, PaymentRow, ProductRow } from "@/lib/supabase/types";
import { getSupabaseBrowserClient, hasSupabaseBrowserConfig } from "@/lib/supabase/browser";
import { cn } from "@/lib/utils";

type AdminTab = "overview" | "inquiries" | "products" | "categories" | "payments";

type ProductFormState = {
  slug: string;
  name: string;
  category: string;
  short: string;
  description: string;
  price: string;
  image: string;
  gallery: string;
  benefits: string;
  notes: string;
  specs: string;
  strength: string;
  brewWater: string;
  brewTime: string;
  brewTemperature: string;
  brewRatio: string;
  popular: boolean;
};

type CategoryFormState = {
  slug: string;
  name: string;
  description: string;
  sort_order: string;
  active: boolean;
};

type PaymentFormState = {
  customer_name: string;
  customer_email: string;
  product_slug: string;
  amount: string;
  currency: string;
  status: PaymentRow["status"];
  provider: string;
  payment_reference: string;
};

type Analytics = {
  totals: {
    products: number;
    activeProducts: number;
    categories: number;
    inquiries: number;
    newInquiries: number;
    paidRevenue: number;
    pendingRevenue: number;
    refundedRevenue: number;
    failedRevenue: number;
    averageOrderValue: number;
  };
  inquiryStatus: Record<string, number>;
  paymentStatus: Record<string, number>;
  recentInquiries: Inquiry[];
  recentPayments: PaymentRow[];
  topProducts: ProductRow[];
};

const emptyProductForm: ProductFormState = {
  slug: "",
  name: "",
  category: "Black Tea",
  short: "",
  description: "",
  price: "0",
  image: "",
  gallery: "",
  benefits: "",
  notes: "",
  specs: "{}",
  strength: "50",
  brewWater: "220 ml",
  brewTime: "3 min",
  brewTemperature: "95 C",
  brewRatio: "2 g",
  popular: false
};

const emptyCategoryForm: CategoryFormState = {
  slug: "",
  name: "",
  description: "",
  sort_order: "0",
  active: true
};

const emptyPaymentForm: PaymentFormState = {
  customer_name: "",
  customer_email: "",
  product_slug: "",
  amount: "0",
  currency: "INR",
  status: "pending",
  provider: "manual",
  payment_reference: ""
};

const fallbackCategories = ["Orthodox Tea", "Black Tea", "Green Tea", "CTC Tea", "Tea Dust"];
const inquiryStatuses = ["new", "contacted", "quoted", "closed"];
const paymentStatuses: PaymentRow["status"][] = ["paid", "pending", "failed", "refunded"];

const defaultAnalytics: Analytics = {
  totals: {
    products: 0,
    activeProducts: 0,
    categories: 0,
    inquiries: 0,
    newInquiries: 0,
    paidRevenue: 0,
    pendingRevenue: 0,
    refundedRevenue: 0,
    failedRevenue: 0,
    averageOrderValue: 0
  },
  inquiryStatus: {},
  paymentStatus: {},
  recentInquiries: [],
  recentPayments: [],
  topProducts: []
};

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0
});

function linesToArray(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function productToForm(product: Product): ProductFormState {
  return {
    slug: product.slug,
    name: product.name,
    category: product.category,
    short: product.short,
    description: product.description,
    price: String(product.price),
    image: product.image,
    gallery: product.gallery.join("\n"),
    benefits: product.benefits.join("\n"),
    notes: product.notes.join("\n"),
    specs: JSON.stringify(product.specs, null, 2),
    strength: String(product.strength),
    brewWater: product.brew.water,
    brewTime: product.brew.time,
    brewTemperature: product.brew.temperature,
    brewRatio: product.brew.ratio,
    popular: Boolean(product.popular)
  };
}

function getSaveMessage(body: { error?: string; issues?: { fieldErrors?: Record<string, string[]>; formErrors?: string[] } }, fallback: string) {
  const fieldErrors = body.issues?.fieldErrors || {};
  const details = Object.entries(fieldErrors)
    .flatMap(([field, errors]) => errors.map((error) => `${field}: ${error}`))
    .join("; ");

  if (details) return `${body.error || fallback} ${details}`;
  if (body.issues?.formErrors?.length) return `${body.error || fallback} ${body.issues.formErrors.join("; ")}`;
  return body.error || fallback;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-brand-forest">
      <span>{label}</span>
      {children}
    </label>
  );
}

function MetricCard({ label, value, detail, icon: Icon }: { label: string; value: string; detail: string; icon: typeof Gauge }) {
  return (
    <Card className="shadow-none">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-dark/45">{label}</p>
            <p className="mt-2 text-3xl font-bold text-brand-forest">{value}</p>
            <p className="mt-2 text-sm text-brand-dark/58">{detail}</p>
          </div>
          <span className="flex h-11 w-11 items-center justify-center rounded-md bg-brand-forest/8 text-brand-forest">
            <Icon className="h-5 w-5" />
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

export function AdminDashboard() {
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<CategoryRow[]>([]);
  const [payments, setPayments] = useState<PaymentRow[]>([]);
  const [analytics, setAnalytics] = useState<Analytics>(defaultAnalytics);
  const [productForm, setProductForm] = useState<ProductFormState>(emptyProductForm);
  const [categoryForm, setCategoryForm] = useState<CategoryFormState>(emptyCategoryForm);
  const [paymentForm, setPaymentForm] = useState<PaymentFormState>(emptyPaymentForm);

  const categoryOptions = useMemo(() => {
    const names = categories.map((category) => category.name).filter(Boolean);
    return Array.from(new Set([...names, ...fallbackCategories]));
  }, [categories]);

  const filteredInquiries = useMemo(() => {
    const term = searchTerm.toLowerCase();
    if (!term) return inquiries;
    return inquiries.filter((inquiry) =>
      [inquiry.name, inquiry.company || "", inquiry.email, inquiry.phone, inquiry.inquiry_type, inquiry.status]
        .join(" ")
        .toLowerCase()
        .includes(term)
    );
  }, [inquiries, searchTerm]);

  const authHeaders = useCallback((token = session?.access_token) => ({
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
  }), [session?.access_token]);

  const loadAdminData = useCallback(async (token = session?.access_token) => {
    if (!token) return;
    setLoading(true);
    setMessage("");

    try {
      const headers = authHeaders(token);
      const [inquiryResponse, productResponse, categoryResponse, paymentResponse, analyticsResponse] = await Promise.all([
        fetch("/api/inquiries", { headers }),
        fetch("/api/products"),
        fetch("/api/categories", { headers }),
        fetch("/api/payments", { headers }),
        fetch("/api/analytics", { headers })
      ]);

      const [inquiryJson, productJson, categoryJson, paymentJson, analyticsJson] = await Promise.all([
        inquiryResponse.json(),
        productResponse.json(),
        categoryResponse.json(),
        paymentResponse.json(),
        analyticsResponse.json()
      ]);

      const errors = [
        !inquiryResponse.ok ? inquiryJson.error : "",
        !productResponse.ok ? productJson.error : "",
        !categoryResponse.ok ? categoryJson.error : "",
        !paymentResponse.ok ? paymentJson.error : "",
        !analyticsResponse.ok ? analyticsJson.error : ""
      ].filter(Boolean);

      if (errors.length) throw new Error(errors.join(" "));

      setInquiries(inquiryJson.inquiries || []);
      setProducts(productJson.products || []);
      setCategories(categoryJson.categories || []);
      setPayments(paymentJson.payments || []);
      setAnalytics(analyticsJson.analytics || defaultAnalytics);

      if (analyticsJson.warnings?.length) {
        setMessage(`${analyticsJson.warnings.join(" ")} Run the updated Supabase schema if this is a new admin deployment.`);
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Admin data could not be loaded.");
    } finally {
      setLoading(false);
    }
  }, [authHeaders, session?.access_token]);

  useEffect(() => {
    if (!supabase) return;

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    return () => data.subscription.unsubscribe();
  }, [supabase]);

  useEffect(() => {
    if (session) {
      void loadAdminData(session.access_token);
    }
  }, [session, loadAdminData]);

  async function login() {
    if (!supabase) return;
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      setMessage(error.message);
    }
  }

  async function logout() {
    await supabase?.auth.signOut();
    setSession(null);
    setInquiries([]);
    setProducts([]);
    setCategories([]);
    setPayments([]);
    setAnalytics(defaultAnalytics);
  }

  async function updateInquiryStatus(id: string, status: string) {
    if (!session) return;

    const response = await fetch("/api/inquiries", {
      method: "PATCH",
      headers: authHeaders(),
      body: JSON.stringify({ id, status })
    });

    const body = await response.json();
    if (!response.ok) {
      setMessage(body.error || "Status update failed.");
      return;
    }

    setInquiries((items) => items.map((item) => (item.id === id ? body.inquiry : item)));
    await loadAdminData();
  }

  async function saveProduct() {
    if (!session) return;
    setLoading(true);
    setMessage("");

    let specs: Record<string, unknown>;
    try {
      specs = JSON.parse(productForm.specs || "{}");
    } catch {
      setLoading(false);
      setMessage("Specs must be valid JSON.");
      return;
    }

    const response = await fetch("/api/products", {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({
        slug: productForm.slug,
        name: productForm.name,
        category: productForm.category,
        short: productForm.short,
        description: productForm.description,
        price: Number(productForm.price),
        image: productForm.image,
        gallery: linesToArray(productForm.gallery),
        benefits: linesToArray(productForm.benefits),
        notes: linesToArray(productForm.notes),
        specs,
        strength: Number(productForm.strength),
        brew: {
          water: productForm.brewWater,
          time: productForm.brewTime,
          temperature: productForm.brewTemperature,
          ratio: productForm.brewRatio
        },
        popular: productForm.popular,
        active: true,
        sort_order: 0
      })
    });

    const body = await response.json();
    setLoading(false);

    if (!response.ok) {
      setMessage(getSaveMessage(body, "Product save failed."));
      return;
    }

    setMessage("Product saved.");
    setProductForm(emptyProductForm);
    await loadAdminData();
  }

  async function saveCategory() {
    if (!session) return;
    setLoading(true);
    setMessage("");

    const response = await fetch("/api/categories", {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({
        slug: categoryForm.slug,
        name: categoryForm.name,
        description: categoryForm.description,
        sort_order: Number(categoryForm.sort_order),
        active: categoryForm.active
      })
    });

    const body = await response.json();
    setLoading(false);

    if (!response.ok) {
      setMessage(getSaveMessage(body, "Category save failed."));
      return;
    }

    setMessage("Category saved.");
    setCategoryForm(emptyCategoryForm);
    await loadAdminData();
  }

  async function savePayment() {
    if (!session) return;
    setLoading(true);
    setMessage("");

    const response = await fetch("/api/payments", {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({
        customer_name: paymentForm.customer_name,
        customer_email: paymentForm.customer_email,
        product_slug: paymentForm.product_slug,
        amount: Number(paymentForm.amount),
        currency: paymentForm.currency.toUpperCase(),
        status: paymentForm.status,
        provider: paymentForm.provider,
        payment_reference: paymentForm.payment_reference
      })
    });

    const body = await response.json();
    setLoading(false);

    if (!response.ok) {
      setMessage(getSaveMessage(body, "Payment save failed."));
      return;
    }

    setMessage("Payment record saved.");
    setPaymentForm(emptyPaymentForm);
    await loadAdminData();
  }

  if (!hasSupabaseBrowserConfig()) {
    return (
      <section className="min-h-screen bg-[#f6f7f2] pt-32 section-padding">
        <div className="container-x">
          <Card>
            <CardContent>
              <h1 className="font-display text-4xl text-brand-forest">Supabase is not configured yet</h1>
              <p className="mt-4 text-brand-dark/65">
                Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel and locally to enable admin login.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  if (!session) {
    return (
      <section className="min-h-screen bg-[#f6f7f2] pt-32 section-padding">
        <div className="container-x max-w-lg">
          <Card className="shadow-none">
            <CardContent className="p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-brand-forest text-white">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h1 className="mt-6 font-display text-4xl text-brand-forest">Green Hub Admin</h1>
              <div className="mt-8 grid gap-4">
                <Field label="Admin email">
                  <Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                </Field>
                <Field label="Password">
                  <Input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                </Field>
                <Button type="button" variant="gold" onClick={login} disabled={loading}>
                  Sign In
                </Button>
                {message ? <p className="text-sm text-red-600">{message}</p> : null}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  const tabs: { id: AdminTab; label: string; icon: typeof LayoutDashboard }[] = [
    { id: "overview", label: "Dashboard", icon: LayoutDashboard },
    { id: "inquiries", label: "Inquiries", icon: Inbox },
    { id: "products", label: "Products", icon: Boxes },
    { id: "categories", label: "Categories", icon: FolderPlus },
    { id: "payments", label: "Payments", icon: CreditCard }
  ];

  return (
    <section className="min-h-screen bg-[#f6f7f2] pt-24">
      <div className="border-b border-brand-forest/10 bg-white">
        <div className="container-x flex flex-col gap-5 py-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-gold">Back Office</p>
            <h1 className="mt-2 font-display text-4xl text-brand-forest md:text-5xl">Green Hub Operations</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button type="button" variant="outline" onClick={() => loadAdminData()} disabled={loading}>
              <RefreshCcw className="h-4 w-4" />
              Refresh
            </Button>
            <Button type="button" variant="dark" onClick={logout}>
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      <div className="container-x py-6">
        <div className="flex gap-2 overflow-x-auto no-scrollbar border-b border-brand-forest/10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex h-12 items-center gap-2 border-b-2 px-4 text-sm font-bold transition",
                activeTab === tab.id
                  ? "border-brand-gold text-brand-forest"
                  : "border-transparent text-brand-dark/55 hover:text-brand-forest"
              )}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {message ? <p className="mt-5 rounded-md border border-brand-gold/30 bg-white p-4 text-sm font-semibold text-brand-forest">{message}</p> : null}

        {activeTab === "overview" ? (
          <div className="mt-6 grid gap-6">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <MetricCard label="Paid Revenue" value={currencyFormatter.format(analytics.totals.paidRevenue)} detail={`${payments.length} payment records`} icon={TrendingUp} />
              <MetricCard label="New Inquiries" value={String(analytics.totals.newInquiries)} detail={`${analytics.totals.inquiries} total inquiries`} icon={Inbox} />
              <MetricCard label="Active Products" value={String(analytics.totals.activeProducts)} detail={`${analytics.totals.products} products in catalog`} icon={Boxes} />
              <MetricCard label="Categories" value={String(analytics.totals.categories || categories.length)} detail="Manage product grouping" icon={FolderPlus} />
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <Card className="shadow-none">
                <CardContent>
                  <div className="flex items-center gap-3">
                    <BarChart3 className="h-5 w-5 text-brand-gold" />
                    <h2 className="font-display text-3xl text-brand-forest">Payment Analytics</h2>
                  </div>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-md border border-brand-forest/10 bg-[#f6f7f2] p-4">
                      <p className="text-sm text-brand-dark/55">Pending</p>
                      <p className="mt-1 text-2xl font-bold text-brand-forest">{currencyFormatter.format(analytics.totals.pendingRevenue)}</p>
                    </div>
                    <div className="rounded-md border border-brand-forest/10 bg-[#f6f7f2] p-4">
                      <p className="text-sm text-brand-dark/55">Average paid order</p>
                      <p className="mt-1 text-2xl font-bold text-brand-forest">{currencyFormatter.format(analytics.totals.averageOrderValue)}</p>
                    </div>
                  </div>
                  <div className="mt-5 grid gap-3">
                    {paymentStatuses.map((status) => (
                      <div key={status} className="flex items-center justify-between rounded-md border border-brand-forest/10 bg-white p-3 text-sm">
                        <span className="font-semibold capitalize text-brand-forest">{status}</span>
                        <span className="text-brand-dark/65">{analytics.paymentStatus[status] || 0}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-none">
                <CardContent>
                  <h2 className="font-display text-3xl text-brand-forest">Recent Activity</h2>
                  <div className="mt-5 grid gap-3">
                    {analytics.recentInquiries.length ? analytics.recentInquiries.map((inquiry) => (
                      <div key={inquiry.id} className="rounded-md border border-brand-forest/10 bg-[#f6f7f2] p-4">
                        <p className="font-semibold text-brand-forest">{inquiry.name}</p>
                        <p className="mt-1 text-sm text-brand-dark/60">{inquiry.inquiry_type} | {inquiry.quantity} kg | {inquiry.status}</p>
                      </div>
                    )) : <p className="text-sm text-brand-dark/60">No activity yet.</p>}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : null}

        {activeTab === "inquiries" ? (
          <Card className="mt-6 shadow-none">
            <CardContent>
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="font-display text-3xl text-brand-forest">Inquiry Pipeline</h2>
                  <p className="mt-1 text-sm text-brand-dark/60">{filteredInquiries.length} visible inquiries</p>
                </div>
                <div className="relative w-full lg:w-80">
                  <Search className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-brand-dark/40" />
                  <Input className="pl-9" placeholder="Search inquiries" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
                </div>
              </div>
              <div className="mt-6 grid gap-4">
                {filteredInquiries.length ? filteredInquiries.map((inquiry) => (
                  <div key={inquiry.id} className="rounded-md border border-brand-forest/10 bg-white p-4">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <p className="font-semibold text-brand-forest">{inquiry.name}</p>
                        <p className="text-sm text-brand-dark/62">{inquiry.company || "No company"} | {inquiry.inquiry_type} | {inquiry.quantity} kg</p>
                        <p className="mt-2 text-sm text-brand-dark/70">{inquiry.message}</p>
                        <p className="mt-3 text-xs text-brand-dark/50">{inquiry.email} | {inquiry.phone}</p>
                      </div>
                      <Select value={inquiry.status} onChange={(event) => updateInquiryStatus(inquiry.id, event.target.value)} className="lg:w-40">
                        {inquiryStatuses.map((status) => <option key={status} value={status}>{status}</option>)}
                      </Select>
                    </div>
                  </div>
                )) : <p className="text-sm text-brand-dark/60">No saved inquiries yet.</p>}
              </div>
            </CardContent>
          </Card>
        ) : null}

        {activeTab === "products" ? (
          <div className="mt-6 grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <Card className="shadow-none">
              <CardContent>
                <div className="flex items-center gap-3">
                  <PackagePlus className="h-5 w-5 text-brand-gold" />
                  <h2 className="font-display text-3xl text-brand-forest">Product Editor</h2>
                </div>
                <div className="mt-6 grid gap-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Slug"><Input value={productForm.slug} onChange={(event) => setProductForm({ ...productForm, slug: event.target.value })} /></Field>
                    <Field label="Name"><Input value={productForm.name} onChange={(event) => setProductForm({ ...productForm, name: event.target.value })} /></Field>
                    <Field label="Category">
                      <Select value={productForm.category} onChange={(event) => setProductForm({ ...productForm, category: event.target.value })}>
                        {categoryOptions.map((category) => <option key={category} value={category}>{category}</option>)}
                      </Select>
                    </Field>
                    <Field label="Price"><Input type="number" value={productForm.price} onChange={(event) => setProductForm({ ...productForm, price: event.target.value })} /></Field>
                  </div>
                  <Field label="Image URL"><Input value={productForm.image} onChange={(event) => setProductForm({ ...productForm, image: event.target.value })} /></Field>
                  <Field label="Short description"><Textarea value={productForm.short} onChange={(event) => setProductForm({ ...productForm, short: event.target.value })} /></Field>
                  <Field label="Full description"><Textarea value={productForm.description} onChange={(event) => setProductForm({ ...productForm, description: event.target.value })} /></Field>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Gallery URLs"><Textarea value={productForm.gallery} onChange={(event) => setProductForm({ ...productForm, gallery: event.target.value })} /></Field>
                    <Field label="Benefits"><Textarea value={productForm.benefits} onChange={(event) => setProductForm({ ...productForm, benefits: event.target.value })} /></Field>
                    <Field label="Notes"><Textarea value={productForm.notes} onChange={(event) => setProductForm({ ...productForm, notes: event.target.value })} /></Field>
                    <Field label="Specs JSON"><Textarea value={productForm.specs} onChange={(event) => setProductForm({ ...productForm, specs: event.target.value })} /></Field>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Strength"><Input type="number" value={productForm.strength} onChange={(event) => setProductForm({ ...productForm, strength: event.target.value })} /></Field>
                    <Field label="Brew water"><Input value={productForm.brewWater} onChange={(event) => setProductForm({ ...productForm, brewWater: event.target.value })} /></Field>
                    <Field label="Brew time"><Input value={productForm.brewTime} onChange={(event) => setProductForm({ ...productForm, brewTime: event.target.value })} /></Field>
                    <Field label="Brew temperature"><Input value={productForm.brewTemperature} onChange={(event) => setProductForm({ ...productForm, brewTemperature: event.target.value })} /></Field>
                    <Field label="Brew ratio"><Input value={productForm.brewRatio} onChange={(event) => setProductForm({ ...productForm, brewRatio: event.target.value })} /></Field>
                    <label className="flex h-11 items-center gap-3 self-end rounded-md border border-brand-forest/15 bg-white px-3 text-sm font-semibold text-brand-forest">
                      <input type="checkbox" checked={productForm.popular} onChange={(event) => setProductForm({ ...productForm, popular: event.target.checked })} />
                      Popular
                    </label>
                  </div>
                  <Button type="button" variant="gold" onClick={saveProduct} disabled={loading}>
                    <Save className="h-4 w-4" />
                    Save Product
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-none">
              <CardContent>
                <h2 className="font-display text-3xl text-brand-forest">Catalog</h2>
                <div className="mt-6 grid gap-3">
                  {products.map((product) => (
                    <button
                      key={product.slug}
                      type="button"
                      onClick={() => setProductForm(productToForm(product))}
                      className="grid gap-2 rounded-md border border-brand-forest/10 bg-white p-4 text-left transition hover:border-brand-gold/60"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-semibold text-brand-forest">{product.name}</p>
                          <p className="text-sm text-brand-dark/55">{product.category}</p>
                        </div>
                        <span className="text-sm font-bold text-brand-forest">{currencyFormatter.format(product.price)}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : null}

        {activeTab === "categories" ? (
          <div className="mt-6 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <Card className="shadow-none">
              <CardContent>
                <h2 className="font-display text-3xl text-brand-forest">Create Category</h2>
                <div className="mt-6 grid gap-4">
                  <Field label="Name">
                    <Input
                      value={categoryForm.name}
                      onChange={(event) => setCategoryForm({
                        ...categoryForm,
                        name: event.target.value,
                        slug: categoryForm.slug ? categoryForm.slug : slugify(event.target.value)
                      })}
                    />
                  </Field>
                  <Field label="Slug"><Input value={categoryForm.slug} onChange={(event) => setCategoryForm({ ...categoryForm, slug: slugify(event.target.value) })} /></Field>
                  <Field label="Sort order"><Input type="number" value={categoryForm.sort_order} onChange={(event) => setCategoryForm({ ...categoryForm, sort_order: event.target.value })} /></Field>
                  <Field label="Description"><Textarea value={categoryForm.description} onChange={(event) => setCategoryForm({ ...categoryForm, description: event.target.value })} /></Field>
                  <label className="flex h-11 items-center gap-3 rounded-md border border-brand-forest/15 bg-white px-3 text-sm font-semibold text-brand-forest">
                    <input type="checkbox" checked={categoryForm.active} onChange={(event) => setCategoryForm({ ...categoryForm, active: event.target.checked })} />
                    Active
                  </label>
                  <Button type="button" variant="gold" onClick={saveCategory} disabled={loading}>
                    <Save className="h-4 w-4" />
                    Save Category
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-none">
              <CardContent>
                <h2 className="font-display text-3xl text-brand-forest">Categories</h2>
                <div className="mt-6 grid gap-3 md:grid-cols-2">
                  {categories.length ? categories.map((category) => (
                    <button
                      key={category.slug}
                      type="button"
                      onClick={() => setCategoryForm({
                        slug: category.slug,
                        name: category.name,
                        description: category.description || "",
                        sort_order: String(category.sort_order || 0),
                        active: category.active !== false
                      })}
                      className="rounded-md border border-brand-forest/10 bg-white p-4 text-left transition hover:border-brand-gold/60"
                    >
                      <p className="font-semibold text-brand-forest">{category.name}</p>
                      <p className="mt-1 text-sm text-brand-dark/55">{category.slug}</p>
                      <p className="mt-3 text-sm text-brand-dark/62">{category.description || "No description"}</p>
                    </button>
                  )) : <p className="text-sm text-brand-dark/60">Run the updated schema and seed to load categories.</p>}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : null}

        {activeTab === "payments" ? (
          <div className="mt-6 grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
            <Card className="shadow-none">
              <CardContent>
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-brand-gold" />
                  <h2 className="font-display text-3xl text-brand-forest">Payment Record</h2>
                </div>
                <div className="mt-6 grid gap-4">
                  <Field label="Customer name"><Input value={paymentForm.customer_name} onChange={(event) => setPaymentForm({ ...paymentForm, customer_name: event.target.value })} /></Field>
                  <Field label="Customer email"><Input type="email" value={paymentForm.customer_email} onChange={(event) => setPaymentForm({ ...paymentForm, customer_email: event.target.value })} /></Field>
                  <Field label="Product">
                    <Select value={paymentForm.product_slug} onChange={(event) => setPaymentForm({ ...paymentForm, product_slug: event.target.value })}>
                      <option value="">General payment</option>
                      {products.map((product) => <option key={product.slug} value={product.slug}>{product.name}</option>)}
                    </Select>
                  </Field>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Amount"><Input type="number" value={paymentForm.amount} onChange={(event) => setPaymentForm({ ...paymentForm, amount: event.target.value })} /></Field>
                    <Field label="Currency"><Input value={paymentForm.currency} onChange={(event) => setPaymentForm({ ...paymentForm, currency: event.target.value })} /></Field>
                    <Field label="Status">
                      <Select value={paymentForm.status} onChange={(event) => setPaymentForm({ ...paymentForm, status: event.target.value as PaymentRow["status"] })}>
                        {paymentStatuses.map((status) => <option key={status} value={status}>{status}</option>)}
                      </Select>
                    </Field>
                    <Field label="Provider"><Input value={paymentForm.provider} onChange={(event) => setPaymentForm({ ...paymentForm, provider: event.target.value })} /></Field>
                  </div>
                  <Field label="Reference"><Input value={paymentForm.payment_reference} onChange={(event) => setPaymentForm({ ...paymentForm, payment_reference: event.target.value })} /></Field>
                  <Button type="button" variant="gold" onClick={savePayment} disabled={loading}>
                    <Save className="h-4 w-4" />
                    Save Payment
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6">
              <div className="grid gap-4 md:grid-cols-3">
                <MetricCard label="Paid" value={currencyFormatter.format(analytics.totals.paidRevenue)} detail={`${analytics.paymentStatus.paid || 0} successful`} icon={TrendingUp} />
                <MetricCard label="Pending" value={currencyFormatter.format(analytics.totals.pendingRevenue)} detail={`${analytics.paymentStatus.pending || 0} pending`} icon={Gauge} />
                <MetricCard label="Refunded" value={currencyFormatter.format(analytics.totals.refundedRevenue)} detail={`${analytics.paymentStatus.refunded || 0} refunded`} icon={CreditCard} />
              </div>
              <Card className="shadow-none">
                <CardContent>
                  <h2 className="font-display text-3xl text-brand-forest">Payments</h2>
                  <div className="mt-6 grid gap-3">
                    {payments.length ? payments.map((payment) => (
                      <div key={payment.id} className="rounded-md border border-brand-forest/10 bg-white p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="font-semibold text-brand-forest">{payment.customer_name}</p>
                            <p className="text-sm text-brand-dark/55">{payment.provider} | {payment.payment_reference || "no reference"}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-brand-forest">{currencyFormatter.format(Number(payment.amount || 0))}</p>
                            <p className="text-sm capitalize text-brand-dark/55">{payment.status}</p>
                          </div>
                        </div>
                      </div>
                    )) : <p className="text-sm text-brand-dark/60">No payment records yet.</p>}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
