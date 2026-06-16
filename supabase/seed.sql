insert into public.categories (
  slug, name, description, sort_order
) values
  ('orthodox-tea', 'Orthodox Tea', 'Premium long-leaf Assam teas for refined retail and export assortments.', 10),
  ('black-tea', 'Black Tea', 'Strong aromatic Assam black teas for daily cups, cafes, and hospitality buyers.', 20),
  ('green-tea', 'Green Tea', 'Fresh wellness-led Assam green tea selections.', 30),
  ('ctc-tea', 'CTC Tea', 'Brisk bulk-friendly tea grades for strong liquor and food service.', 40),
  ('tea-dust', 'Tea Dust', 'Fast-brewing tea dust and powder for mass service and chai programs.', 50)
on conflict (slug) do nothing;

insert into public.products (
  slug, name, category, short, description, price, image, gallery, benefits, specs, notes, strength, brew, popular, sort_order
) values
(
  'assam-orthodox-tea-leaf',
  'Assam Orthodox Tea Leaf',
  'Orthodox Tea',
  'Superior dried orthodox leaves with strong liquor and a refined malty cup.',
  'A premium orthodox Assam tea crafted for buyers who want layered aroma, long leaf character, and the unmistakable strength of the Brahmaputra valley.',
  920,
  'https://images.unsplash.com/photo-1531969179221-3946e6b5a5e7?auto=format&fit=crop&w=1200&q=82',
  '["https://images.unsplash.com/photo-1531969179221-3946e6b5a5e7?auto=format&fit=crop&w=1200&q=82","https://images.unsplash.com/photo-1560087637-bf797bc7796a?auto=format&fit=crop&w=1400&q=82","https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=1200&q=82"]',
  '["Long leaf grade","Strong liquor","Premium breakfast cup"]',
  '{"Type":"Natural","Style":"Dried","Certification":"FSSAI Certified","Shelf Life":"1 Year","Grade":"Superior"}',
  '["Malt","Honey wood","Deep amber"]',
  86,
  '{"water":"220 ml","time":"3-4 min","temperature":"95 C","ratio":"2.5 g"}',
  true,
  10
),
(
  'assam-black-tea',
  'Assam Black Tea',
  'Black Tea',
  'Aromatic black tea with bright color, strong aroma, and a dependable daily cup.',
  'A robust Assam black tea selected for cafes, hotels, retailers, and tea lovers seeking a clean, fragrant, full-bodied brew.',
  780,
  'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=1200&q=82',
  '["https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=1200&q=82","https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=1200&q=82","https://images.unsplash.com/photo-1560087637-bf797bc7796a?auto=format&fit=crop&w=1400&q=82"]',
  '["Strong aroma","Health-conscious choice","Excellent with milk"]',
  '{"Type":"Natural","Style":"Dried","Certification":"FSSAI Certified","Shelf Life":"1 Year","Grade":"Superior"}',
  '["Roasted malt","Cocoa","Copper liquor"]',
  82,
  '{"water":"220 ml","time":"3 min","temperature":"95 C","ratio":"2 g"}',
  true,
  20
),
(
  'assam-green-tea',
  'Assam Green Tea',
  'Green Tea',
  'Clean, vegetal, and fragrant Assam green tea for wellness-led assortments.',
  'A bright green tea with fresh aroma and a light finish, suited to retail wellness shelves, hospitality menus, and everyday mindful brewing.',
  860,
  'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=1200&q=82',
  '["https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=1200&q=82","https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=1200&q=82","https://images.unsplash.com/photo-1560087637-bf797bc7796a?auto=format&fit=crop&w=1400&q=82"]',
  '["Fresh fragrance","Light body","Wellness positioning"]',
  '{"Type":"Natural","Style":"Dried","Certification":"FSSAI Certified","Shelf Life":"1 Year","Grade":"Superior"}',
  '["Fresh grass","Citrus peel","Soft sweetness"]',
  54,
  '{"water":"220 ml","time":"2 min","temperature":"80 C","ratio":"2 g"}',
  false,
  30
),
(
  'black-tea-bopsm',
  'Black Tea BOPSM',
  'CTC Tea',
  'Best-quality CTC BOPSM tea designed for strong liquor and bulk consistency.',
  'A dependable CTC grade for distributors, canteens, cafes, hotels, and private label packs that need brisk strength and reliable blend performance.',
  640,
  'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=82',
  '["https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=82","https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=1200&q=82","https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=1200&q=82"]',
  '["Bulk friendly","Brisk liquor","Private label ready"]',
  '{"Type":"Natural","Style":"Dried","Certification":"FSSAI Certified","Shelf Life":"1 Year","Grade":"BOPSM"}',
  '["Bold malt","Toasted grain","Brisk finish"]',
  94,
  '{"water":"200 ml","time":"4 min","temperature":"98 C","ratio":"2.5 g"}',
  false,
  40
),
(
  'black-tea-dust-powder',
  'Black Tea Dust Powder',
  'Tea Dust',
  'Aromatic tea dust powder with strong liquor for quick brewing and mass service.',
  'A premium tea dust powder for restaurants, institutional buyers, and packaged tea lines where speed, color, and intensity matter.',
  520,
  'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=1200&q=82',
  '["https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=1200&q=82","https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=82","https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=1200&q=82"]',
  '["Quick extraction","Strong color","Food service ready"]',
  '{"Type":"Natural","Style":"Dried","Certification":"FSSAI Certified","Shelf Life":"1 Year","Grade":"Superior"}',
  '["Deep liquor","Bold tannin","Classic chai base"]',
  98,
  '{"water":"180 ml","time":"3-5 min","temperature":"98 C","ratio":"2 g"}',
  false,
  50
)
on conflict (slug) do nothing;
