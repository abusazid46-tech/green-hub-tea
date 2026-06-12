"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { Inbox, LogOut, PackagePlus, RefreshCcw, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { Inquiry } from "@/lib/supabase/types";
import { getSupabaseBrowserClient, hasSupabaseBrowserConfig } from "@/lib/supabase/browser";
import type { Product } from "@/lib/data";

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

const statuses = ["new", "contacted", "quoted", "closed"];

function linesToArray(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
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

function getProductSaveMessage(body: { error?: string; issues?: { fieldErrors?: Record<string, string[]>; formErrors?: string[] } }) {
  const fieldErrors = body.issues?.fieldErrors || {};
  const details = Object.entries(fieldErrors)
    .flatMap(([field, errors]) => errors.map((error) => `${field}: ${error}`))
    .join("; ");

  if (details) return `${body.error || "Product save failed."} ${details}`;
  if (body.issues?.formErrors?.length) return `${body.error || "Product save failed."} ${body.issues.formErrors.join("; ")}`;
  return body.error || "Product save failed.";
}

export function AdminDashboard() {
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [productForm, setProductForm] = useState<ProductFormState>(emptyProductForm);

  const loadAdminData = useCallback(async (token = session?.access_token) => {
    if (!token) return;
    setLoading(true);
    setMessage("");

    try {
      const headers = { Authorization: `Bearer ${token}` };
      const [inquiryResponse, productResponse] = await Promise.all([
        fetch("/api/inquiries", { headers }),
        fetch("/api/products")
      ]);

      const inquiryJson = await inquiryResponse.json();
      const productJson = await productResponse.json();

      if (!inquiryResponse.ok) throw new Error(inquiryJson.error || "Could not load inquiries.");
      if (!productResponse.ok) throw new Error(productJson.error || "Could not load products.");

      setInquiries(inquiryJson.inquiries || []);
      setProducts(productJson.products || []);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Admin data could not be loaded.");
    } finally {
      setLoading(false);
    }
  }, [session?.access_token]);

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
  }

  async function updateInquiryStatus(id: string, status: string) {
    if (!session) return;

    const response = await fetch("/api/inquiries", {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id, status })
    });

    const body = await response.json();
    if (!response.ok) {
      setMessage(body.error || "Status update failed.");
      return;
    }

    setInquiries((items) => items.map((item) => (item.id === id ? body.inquiry : item)));
  }

  async function saveProduct() {
    if (!session) return;
    setLoading(true);
    setMessage("");

    let specs: Record<string, string>;
    try {
      specs = JSON.parse(productForm.specs || "{}");
    } catch {
      setLoading(false);
      setMessage("Specs must be valid JSON.");
      return;
    }

    const response = await fetch("/api/products", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        "Content-Type": "application/json"
      },
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
      setMessage(getProductSaveMessage(body));
      return;
    }

    setMessage("Product saved.");
    setProductForm(emptyProductForm);
    await loadAdminData();
  }

  if (!hasSupabaseBrowserConfig()) {
    return (
      <section className="min-h-screen bg-brand-cream pt-32 section-padding">
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
      <section className="min-h-screen bg-brand-cream pt-32 section-padding">
        <div className="container-x max-w-xl">
          <Card>
            <CardContent>
              <h1 className="font-display text-4xl text-brand-forest">Green Hub Admin</h1>
              <div className="mt-8 grid gap-4">
                <Input type="email" placeholder="Admin email" value={email} onChange={(event) => setEmail(event.target.value)} />
                <Input type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
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

  return (
    <section className="min-h-screen bg-brand-cream pt-32 section-padding">
      <div className="container-x">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-gold">Admin Dashboard</p>
            <h1 className="mt-2 font-display text-5xl text-brand-forest">Inquiries & Products</h1>
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

        {message ? <p className="mt-6 rounded-md bg-white p-4 text-sm font-semibold text-brand-forest">{message}</p> : null}

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card>
            <CardContent>
              <div className="flex items-center gap-3">
                <Inbox className="h-5 w-5 text-brand-gold" />
                <h2 className="font-display text-3xl text-brand-forest">Latest Inquiries</h2>
              </div>
              <div className="mt-6 grid gap-4">
                {inquiries.length ? inquiries.map((inquiry) => (
                  <div key={inquiry.id} className="rounded-lg border border-brand-forest/10 bg-brand-cream p-4">
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div>
                        <p className="font-semibold text-brand-forest">{inquiry.name}</p>
                        <p className="text-sm text-brand-dark/62">{inquiry.company || "No company"} | {inquiry.inquiry_type} | {inquiry.quantity} kg</p>
                        <p className="mt-2 text-sm text-brand-dark/70">{inquiry.message}</p>
                        <p className="mt-3 text-xs text-brand-dark/50">{inquiry.email} | {inquiry.phone}</p>
                      </div>
                      <Select value={inquiry.status} onChange={(event) => updateInquiryStatus(inquiry.id, event.target.value)} className="md:w-36">
                        {statuses.map((status) => <option key={status} value={status}>{status}</option>)}
                      </Select>
                    </div>
                  </div>
                )) : (
                  <p className="text-sm text-brand-dark/60">No saved inquiries yet.</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <div className="flex items-center gap-3">
                <PackagePlus className="h-5 w-5 text-brand-gold" />
                <h2 className="font-display text-3xl text-brand-forest">Product Editor</h2>
              </div>

              <div className="mt-5 flex gap-2 overflow-x-auto no-scrollbar">
                {products.map((product) => (
                  <Button key={product.slug} type="button" size="sm" variant="outline" onClick={() => setProductForm(productToForm(product))}>
                    {product.name}
                  </Button>
                ))}
              </div>

              <div className="mt-6 grid gap-4">
                <Input placeholder="Slug" value={productForm.slug} onChange={(event) => setProductForm({ ...productForm, slug: event.target.value })} />
                <Input placeholder="Name" value={productForm.name} onChange={(event) => setProductForm({ ...productForm, name: event.target.value })} />
                <Input placeholder="Category" value={productForm.category} onChange={(event) => setProductForm({ ...productForm, category: event.target.value })} />
                <Input placeholder="Price" type="number" value={productForm.price} onChange={(event) => setProductForm({ ...productForm, price: event.target.value })} />
                <Input placeholder="Image URL" value={productForm.image} onChange={(event) => setProductForm({ ...productForm, image: event.target.value })} />
                <Textarea placeholder="Short description" value={productForm.short} onChange={(event) => setProductForm({ ...productForm, short: event.target.value })} />
                <Textarea placeholder="Full description" value={productForm.description} onChange={(event) => setProductForm({ ...productForm, description: event.target.value })} />
                <Textarea placeholder="Gallery URLs, one per line" value={productForm.gallery} onChange={(event) => setProductForm({ ...productForm, gallery: event.target.value })} />
                <Textarea placeholder="Benefits, one per line" value={productForm.benefits} onChange={(event) => setProductForm({ ...productForm, benefits: event.target.value })} />
                <Textarea placeholder="Notes, one per line" value={productForm.notes} onChange={(event) => setProductForm({ ...productForm, notes: event.target.value })} />
                <Textarea placeholder='Specs JSON, for example {"Grade":"Superior"}' value={productForm.specs} onChange={(event) => setProductForm({ ...productForm, specs: event.target.value })} />
                <div className="grid gap-3 md:grid-cols-2">
                  <Input placeholder="Strength 0-100" type="number" value={productForm.strength} onChange={(event) => setProductForm({ ...productForm, strength: event.target.value })} />
                  <Input placeholder="Brew water" value={productForm.brewWater} onChange={(event) => setProductForm({ ...productForm, brewWater: event.target.value })} />
                  <Input placeholder="Brew time" value={productForm.brewTime} onChange={(event) => setProductForm({ ...productForm, brewTime: event.target.value })} />
                  <Input placeholder="Brew temperature" value={productForm.brewTemperature} onChange={(event) => setProductForm({ ...productForm, brewTemperature: event.target.value })} />
                  <Input placeholder="Brew ratio" value={productForm.brewRatio} onChange={(event) => setProductForm({ ...productForm, brewRatio: event.target.value })} />
                  <label className="flex h-11 items-center gap-3 rounded-md border border-brand-forest/15 bg-white px-3 text-sm font-semibold text-brand-forest">
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
        </div>
      </div>
    </section>
  );
}
