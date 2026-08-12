import type { Locale } from '@/i18n/config';

/**
 * Single source of truth for the Haven menu, in both languages.
 * Consumed by the landing page preview, the full /menu page, and the QR menu at /m.
 */

export type Localized = { en: string; ar: string };

const L = (en: string, ar: string): Localized => ({ en, ar });

export type MenuItem = {
  name: Localized;
  desc: Localized;
  price: number; // EGP
  tag?: 'popular' | 'new' | 'signature';
};

export type MenuCategory = {
  id: string;
  title: Localized;
  tagline: Localized;
  items: MenuItem[];
};

export type MenuGroup = {
  id: string;
  label: Localized;
  emoji: string;
  categories: MenuCategory[];
};

export const pick = (value: Localized, locale: Locale) => value[locale];

export const menu: MenuGroup[] = [
  {
    id: 'coffee',
    label: L('Coffee', 'قهوة'),
    emoji: '☕',
    categories: [
      {
        id: 'espresso',
        title: L('Espresso & Classics', 'إسبريسو وكلاسيكيات'),
        tagline: L('Specialty-grade, brewed your way', 'بدرجة مختصة، محضّرة كما تحب'),
        items: [
          {
            name: L('Espresso', 'إسبريسو'),
            desc: L(
              'Ground coffee, hot water, extracted under high pressure for richness.',
              'بن مطحون وماء ساخن، يُستخلص تحت ضغط عالٍ لقوام غني.'
            ),
            price: 85,
          },
          {
            name: L('Americano', 'أمريكانو'),
            desc: L(
              'Concentrated coffee, hot water, diluted for a smooth and light body.',
              'قهوة مركّزة وماء ساخن، مخففة لقوام ناعم وخفيف.'
            ),
            price: 100,
          },
          {
            name: L('Macchiato', 'ماكياتو'),
            desc: L(
              'Concentrated coffee, small amount of steamed milk, dollop of foam.',
              'قهوة مركّزة وقليل من الحليب المبخّر ولمسة من الرغوة.'
            ),
            price: 105,
          },
          {
            name: L('Cortado', 'كورتادو'),
            desc: L(
              'Equal parts concentrated coffee, warm steamed milk, balanced and strong.',
              'أجزاء متساوية من القهوة المركّزة والحليب المبخّر الدافئ، متوازن وقوي.'
            ),
            price: 105,
          },
          {
            name: L('Cappuccino', 'كابتشينو'),
            desc: L(
              'Concentrated coffee, equal parts steamed milk, thick layer of foam.',
              'قهوة مركّزة وحليب مبخّر بنسب متساوية، مع طبقة رغوة كثيفة.'
            ),
            price: 120,
          },
          {
            name: L('Flat White', 'فلات وايت'),
            desc: L(
              'Concentrated coffee, thin layer of velvety steamed milk, smooth texture.',
              'قهوة مركّزة وطبقة رقيقة من الحليب المبخّر المخملي، بقوام ناعم.'
            ),
            price: 120,
            tag: 'popular',
          },
          {
            name: L('Mocha', 'موكا'),
            desc: L(
              'Concentrated coffee, steamed milk, chocolate syrup, light whipped cream topping.',
              'قهوة مركّزة وحليب مبخّر وصوص شوكولاتة، مع طبقة خفيفة من الكريمة المخفوقة.'
            ),
            price: 160,
          },
          {
            name: L('White Mocha', 'وايت موكا'),
            desc: L(
              'Concentrated coffee, steamed milk, white chocolate sauce, whipped cream topping.',
              'قهوة مركّزة وحليب مبخّر وصوص شوكولاتة بيضاء، مع كريمة مخفوقة.'
            ),
            price: 165,
          },
          {
            name: L('Caramel Macchiato', 'كراميل ماكياتو'),
            desc: L(
              'Milk, concentrated coffee, vanilla syrup, sweet caramel sauce, served layered.',
              'حليب وقهوة مركّزة وشراب فانيليا وصوص كراميل، تُقدَّم بطبقات.'
            ),
            price: 165,
          },
          {
            name: L('Affogato', 'أفوجاتو'),
            desc: L(
              'Vanilla ice cream, hot concentrated coffee shot, poured over the top.',
              'آيس كريم فانيليا مع شوت قهوة مركّزة ساخنة يُسكب فوقه.'
            ),
            price: 135,
          },
          {
            name: L('Filtered Coffee', 'قهوة فلتر'),
            desc: L(
              'Ground beans, hot water, slowly brewed using a paper filter.',
              'حبوب مطحونة وماء ساخن، تُخمَّر ببطء عبر فلتر ورقي.'
            ),
            price: 250,
          },
        ],
      },
      {
        id: 'latte',
        title: L('Signature Lattes', 'لاتيه مميز'),
        tagline: L('Rich, crafted, made to order', 'غني ومتقن، يُحضَّر عند الطلب'),
        items: [
          {
            name: L('Classic Latte', 'لاتيه كلاسيك'),
            desc: L(
              'Concentrated coffee, large amount of steamed milk, light foam layer.',
              'قهوة مركّزة وكمية وفيرة من الحليب المبخّر مع طبقة رغوة خفيفة.'
            ),
            price: 130,
          },
          {
            name: L('Spanish Latte', 'سبانيش لاتيه'),
            desc: L(
              'Concentrated coffee, steamed milk, sweetened condensed milk, rich and creamy.',
              'قهوة مركّزة وحليب مبخّر وحليب مكثف محلّى، غني وكريمي.'
            ),
            price: 165,
            tag: 'signature',
          },
          {
            name: L('Salted Caramel Latte', 'لاتيه كراميل مملح'),
            desc: L(
              'Concentrated coffee, milk, caramel syrup, sea salt, sweet and savory.',
              'قهوة مركّزة وحليب وصوص كراميل وملح البحر، حلو ومالح.'
            ),
            price: 160,
          },
          {
            name: L('Butter Scotch Latte', 'لاتيه بترسكوتش'),
            desc: L(
              'Concentrated coffee, milk, butterscotch syrup, toasted sugar and butter flavors.',
              'قهوة مركّزة وحليب وشراب بترسكوتش بنكهة السكر المحمّص والزبدة.'
            ),
            price: 195,
          },
          {
            name: L('Lotus Latte', 'لاتيه لوتس'),
            desc: L(
              'Concentrated coffee, milk, speculoos biscuit spread, spiced cookie flavor profile.',
              'قهوة مركّزة وحليب وكريمة بسكويت اللوتس، بنكهة البسكويت المتبّل.'
            ),
            price: 195,
          },
          {
            name: L('Pistachio Latte', 'لاتيه فستق'),
            desc: L(
              'Concentrated coffee, milk, creamy pistachio sauce, nutty and rich flavor.',
              'قهوة مركّزة وحليب وصوص فستق كريمي، بنكهة غنية ولذيذة.'
            ),
            price: 195,
            tag: 'popular',
          },
          {
            name: L('Salted Peanut Butter Latte', 'لاتيه زبدة الفول السوداني المملحة'),
            desc: L(
              'Concentrated coffee, milk, peanut butter, sea salt, creamy and nutty.',
              'قهوة مركّزة وحليب وزبدة فول سوداني وملح البحر، كريمي بطعم المكسرات.'
            ),
            price: 165,
          },
        ],
      },
    ],
  },
  {
    id: 'iced',
    label: L('Iced Coffee', 'قهوة مثلجة'),
    emoji: '🧊',
    categories: [
      {
        id: 'iced-drinks',
        title: L('Iced Coffee', 'قهوة مثلجة'),
        tagline: L('Cold, refreshing, and full of flavour', 'باردة ومنعشة ومليئة بالنكهة'),
        items: [
          {
            name: L('Americano Iced', 'أمريكانو مثلج'),
            desc: L(
              'Concentrated coffee shots, cold water, ice, refreshing and light body.',
              'شوتات قهوة مركّزة وماء بارد وثلج، منعش وخفيف.'
            ),
            price: 100,
          },
          {
            name: L('Espresso Freddo', 'إسبريسو فريدو'),
            desc: L(
              'Concentrated coffee, ice, shaken until frothy, served over fresh ice.',
              'قهوة مركّزة وثلج، تُخض حتى ترغي وتُقدَّم على ثلج طازج.'
            ),
            price: 95,
          },
          {
            name: L('Latte Iced', 'لاتيه مثلج'),
            desc: L(
              'Concentrated coffee, cold milk, ice cubes, simple and refreshing blend.',
              'قهوة مركّزة وحليب بارد ومكعبات ثلج، مزيج بسيط ومنعش.'
            ),
            price: 130,
          },
          {
            name: L('Spanish Latte Iced', 'سبانيش لاتيه مثلج'),
            desc: L(
              'Concentrated coffee, milk, sweetened condensed milk, ice, creamy and cold.',
              'قهوة مركّزة وحليب وحليب مكثف محلّى وثلج، كريمي وبارد.'
            ),
            price: 165,
            tag: 'signature',
          },
          {
            name: L('Caramel Macchiato Iced', 'كراميل ماكياتو مثلج'),
            desc: L(
              'Cold milk, concentrated coffee, vanilla, ice, sweet caramel sauce drizzle.',
              'حليب بارد وقهوة مركّزة وفانيليا وثلج، مع رشة صوص كراميل.'
            ),
            price: 165,
          },
          {
            name: L('Mocha Iced', 'موكا مثلجة'),
            desc: L(
              'Concentrated coffee, milk, chocolate syrup, ice, topped with whipped cream.',
              'قهوة مركّزة وحليب وصوص شوكولاتة وثلج، مغطاة بكريمة مخفوقة.'
            ),
            price: 165,
          },
          {
            name: L('White Mocha Iced', 'وايت موكا مثلجة'),
            desc: L(
              'Concentrated coffee, milk, white chocolate, ice, topped with whipped cream.',
              'قهوة مركّزة وحليب وشوكولاتة بيضاء وثلج، مغطاة بكريمة مخفوقة.'
            ),
            price: 165,
          },
          {
            name: L('Pistachio Latte Iced', 'لاتيه فستق مثلج'),
            desc: L(
              'Concentrated coffee, milk, pistachio sauce, ice, nutty and refreshing finish.',
              'قهوة مركّزة وحليب وصوص فستق وثلج، بنكهة المكسرات المنعشة.'
            ),
            price: 195,
            tag: 'popular',
          },
          {
            name: L('Peanut Butter Latte Iced', 'لاتيه زبدة الفول السوداني مثلج'),
            desc: L(
              'Concentrated coffee, milk, peanut butter, ice, sea salt, cold nutty.',
              'قهوة مركّزة وحليب وزبدة فول سوداني وثلج وملح البحر، بارد بطعم المكسرات.'
            ),
            price: 170,
          },
          {
            name: L('Butter Scotch Latte Iced', 'لاتيه بترسكوتش مثلج'),
            desc: L(
              'Concentrated coffee, milk, butterscotch syrup, ice, sweet toasted sugar flavor.',
              'قهوة مركّزة وحليب وشراب بترسكوتش وثلج، بنكهة السكر المحمّص.'
            ),
            price: 195,
          },
        ],
      },
      {
        id: 'frappe',
        title: L('Frappé', 'فرابيه'),
        tagline: L('Blended, thick, and indulgent', 'مخفوق وكثيف ولذيذ'),
        items: [
          {
            name: L('Salted Caramel Frappé', 'فرابيه كراميل مملح'),
            desc: L(
              'Blended ice, coffee, milk, caramel syrup, sea salt, whipped cream.',
              'ثلج مخفوق وقهوة وحليب وصوص كراميل وملح البحر وكريمة مخفوقة.'
            ),
            price: 165,
          },
          {
            name: L('Chocolate Frappé', 'فرابيه شوكولاتة'),
            desc: L(
              'Blended ice, coffee, milk, chocolate syrup, topped with whipped cream.',
              'ثلج مخفوق وقهوة وحليب وصوص شوكولاتة، مغطى بكريمة مخفوقة.'
            ),
            price: 170,
          },
          {
            name: L('Spanish Frappé', 'فرابيه سبانيش'),
            desc: L(
              'Blended ice, coffee, milk, sweetened condensed milk, thick and cold.',
              'ثلج مخفوق وقهوة وحليب وحليب مكثف محلّى، كثيف وبارد.'
            ),
            price: 175,
          },
          {
            name: L('Vanilla Frappé', 'فرابيه فانيليا'),
            desc: L(
              'Blended ice, milk, vanilla ice cream, topped with whipped cream.',
              'ثلج مخفوق وحليب وآيس كريم فانيليا، مغطى بكريمة مخفوقة.'
            ),
            price: 165,
          },
          {
            name: L('Pistachio Frappé', 'فرابيه فستق'),
            desc: L(
              'Blended ice, coffee, milk, pistachio sauce, topped with whipped cream.',
              'ثلج مخفوق وقهوة وحليب وصوص فستق، مغطى بكريمة مخفوقة.'
            ),
            price: 200,
          },
        ],
      },
    ],
  },
  {
    id: 'matcha',
    label: L('Matcha', 'ماتشا'),
    emoji: '🍵',
    categories: [
      {
        id: 'hot-matcha',
        title: L('Hot Matcha', 'ماتشا ساخنة'),
        tagline: L('Earthy, vibrant, ceremonial grade', 'بنكهة ترابية نابضة، بدرجة احتفالية'),
        items: [
          {
            name: L('Latte Matcha', 'ماتشا لاتيه'),
            desc: L(
              'Ground green tea, hot water, steamed milk, earthy herbal taste.',
              'شاي أخضر مطحون وماء ساخن وحليب مبخّر، بطعم عشبي ترابي.'
            ),
            price: 160,
          },
          {
            name: L('Salted Vanilla Matcha', 'ماتشا فانيليا مملحة'),
            desc: L(
              'Ground green tea, milk, vanilla syrup, sea salt, balanced flavors.',
              'شاي أخضر مطحون وحليب وشراب فانيليا وملح البحر، نكهات متوازنة.'
            ),
            price: 175,
          },
          {
            name: L('Strawberry Matcha', 'ماتشا فراولة'),
            desc: L(
              'Ground green tea, milk, strawberry puree, fruity and herbal blend.',
              'شاي أخضر مطحون وحليب وبيوريه فراولة، مزيج فاكهي وعشبي.'
            ),
            price: 175,
          },
          {
            name: L('Lavender Matcha', 'ماتشا لافندر'),
            desc: L(
              'Ground green tea, milk, lavender syrup, floral and aromatic tea.',
              'شاي أخضر مطحون وحليب وشراب لافندر، شاي زهري وعطري.'
            ),
            price: 180,
            tag: 'new',
          },
          {
            name: L('Salted Banana Matcha', 'ماتشا موز مملحة'),
            desc: L(
              'Ground green tea, milk, banana syrup, sea salt, creamy fruit.',
              'شاي أخضر مطحون وحليب وشراب موز وملح البحر، كريمي بطعم الفاكهة.'
            ),
            price: 180,
          },
          {
            name: L('Spicy White Chocolate Matcha', 'ماتشا شوكولاتة بيضاء بالتوابل'),
            desc: L(
              'Ground green tea, milk, white chocolate, cinnamon, ginger, warming spices.',
              'شاي أخضر مطحون وحليب وشوكولاتة بيضاء وقرفة وزنجبيل وتوابل دافئة.'
            ),
            price: 185,
          },
        ],
      },
      {
        id: 'iced-matcha',
        title: L('Iced Matcha', 'ماتشا مثلجة'),
        tagline: L('Cool, refreshing botanical drinks', 'مشروبات نباتية باردة ومنعشة'),
        items: [
          {
            name: L('Iced Matcha Latte', 'ماتشا لاتيه مثلجة'),
            desc: L(
              'Ground green tea, cold milk, ice, refreshing and herbal drink.',
              'شاي أخضر مطحون وحليب بارد وثلج، مشروب عشبي منعش.'
            ),
            price: 165,
            tag: 'popular',
          },
          {
            name: L('Iced Spanish Matcha', 'ماتشا سبانيش مثلجة'),
            desc: L(
              'Ground green tea, milk, sweetened condensed milk, ice, creamy herbal.',
              'شاي أخضر مطحون وحليب وحليب مكثف محلّى وثلج، كريمي وعشبي.'
            ),
            price: 185,
          },
          {
            name: L('Iced Lavender Matcha', 'ماتشا لافندر مثلجة'),
            desc: L(
              'Ground green tea, milk, lavender syrup, ice, floral botanical blend.',
              'شاي أخضر مطحون وحليب وشراب لافندر وثلج، مزيج زهري نباتي.'
            ),
            price: 185,
          },
          {
            name: L('Iced Strawberry Matcha', 'ماتشا فراولة مثلجة'),
            desc: L(
              'Ground green tea, milk, strawberry puree, ice, fruity cold tea.',
              'شاي أخضر مطحون وحليب وبيوريه فراولة وثلج، شاي بارد بطعم الفاكهة.'
            ),
            price: 175,
          },
          {
            name: L('Iced Salted Vanilla Matcha', 'ماتشا فانيليا مملحة مثلجة'),
            desc: L(
              'Ground green tea, milk, vanilla, sea salt, ice, balanced tea.',
              'شاي أخضر مطحون وحليب وفانيليا وملح البحر وثلج، شاي متوازن.'
            ),
            price: 175,
          },
          {
            name: L('Iced Spicy White Chocolate Matcha', 'ماتشا شوكولاتة بيضاء بالتوابل مثلجة'),
            desc: L(
              'Ground green tea, milk, white chocolate, spices, ice, bold flavor.',
              'شاي أخضر مطحون وحليب وشوكولاتة بيضاء وتوابل وثلج، نكهة جريئة.'
            ),
            price: 175,
          },
        ],
      },
    ],
  },
  {
    id: 'drinks',
    label: L('Drinks', 'مشروبات'),
    emoji: '🥤',
    categories: [
      {
        id: 'hot-drinks',
        title: L('Hot Drinks', 'مشروبات ساخنة'),
        tagline: L('Warm, comforting, made with care', 'دافئة ومريحة، محضّرة بعناية'),
        items: [
          {
            name: L('Green Tea', 'شاي أخضر'),
            desc: L(
              'Unoxidized tea leaves, hot water, light and herbal flavor profile.',
              'أوراق شاي غير مؤكسدة وماء ساخن، بنكهة خفيفة وعشبية.'
            ),
            price: 75,
          },
          {
            name: L('Black Tea', 'شاي أسود'),
            desc: L(
              'A classic tea made from oxidized tea leaves, known for its bold flavor.',
              'شاي كلاسيكي من أوراق مؤكسدة، معروف بنكهته القوية.'
            ),
            price: 75,
          },
          {
            name: L('Hot Matcha Latte', 'ماتشا لاتيه ساخنة'),
            desc: L(
              'Latte blended with matcha green tea powder for a vibrant green color and grassy flavor.',
              'لاتيه ممزوج بمسحوق الماتشا الأخضر، بلون نابض ونكهة عشبية.'
            ),
            price: 115,
          },
          {
            name: L('Caramel Machiato', 'كراميل ماكياتو'),
            desc: L('Espresso, hot milk, caramel syrup.', 'إسبريسو وحليب ساخن وشراب كراميل.'),
            price: 115,
          },
          {
            name: L('Hot Spanish Latte', 'سبانيش لاتيه ساخن'),
            desc: L(
              'Latte sweetened with additional sugar or syrup for a sweeter coffee drink.',
              'لاتيه محلّى بسكر أو شراب إضافي لمذاق أحلى.'
            ),
            price: 110,
          },
          {
            name: L('Hot Mocha', 'موكا ساخنة'),
            desc: L(
              'Cappuccino with added chocolate syrup or powder for a rich, chocolatey coffee drink.',
              'كابتشينو مع صوص أو بودرة شوكولاتة، لقهوة غنية بالشوكولاتة.'
            ),
            price: 115,
          },
          {
            name: L('Hot White Mocha', 'وايت موكا ساخنة'),
            desc: L(
              'Mocha made with white chocolate for a sweeter, creamier chocolate flavor.',
              'موكا بالشوكولاتة البيضاء لنكهة أحلى وأكثر كريمية.'
            ),
            price: 115,
          },
          {
            name: L('Hot Pistachio Latte', 'لاتيه فستق ساخن'),
            desc: L(
              'Latte flavored with pistachio syrup or extract for a nutty taste.',
              'لاتيه بنكهة شراب أو خلاصة الفستق.'
            ),
            price: 130,
          },
          {
            name: L('Salted Caramel Peanut Butter Latte', 'لاتيه كراميل مملح وزبدة فول سوداني'),
            desc: L(
              'Latte flavored with salted caramel and peanut butter syrups, sweet and salty.',
              'لاتيه بنكهة الكراميل المملح وزبدة الفول السوداني، حلو ومالح.'
            ),
            price: 115,
          },
          {
            name: L('Hot Classic (Filtered)', 'قهوة فلتر ساخنة'),
            desc: L('Hot brewed coffee, one size.', 'قهوة مخمّرة ساخنة، حجم واحد.'),
            price: 115,
          },
          {
            name: L('Iced Classic (Filtered)', 'قهوة فلتر مثلجة'),
            desc: L('Iced brewed coffee, one size.', 'قهوة مخمّرة مثلجة، حجم واحد.'),
            price: 115,
          },
        ],
      },
      {
        id: 'non-coffee',
        title: L('Non-Coffee', 'بدون قهوة'),
        tagline: L('No espresso, all flavour', 'بلا إسبريسو، وكل النكهة'),
        items: [
          {
            name: L('Hot Chocolate', 'شوكولاتة ساخنة'),
            desc: L(
              'Warm milk, cocoa powder, sugar, topped with small white marshmallows.',
              'حليب دافئ وبودرة كاكاو وسكر، مغطاة بمارشميلو أبيض صغير.'
            ),
            price: 165,
          },
          {
            name: L('Peanut Chocolate', 'شوكولاتة بالفول السوداني'),
            desc: L(
              'Warm milk, chocolate syrup, peanut butter, rich and nutty drink.',
              'حليب دافئ وصوص شوكولاتة وزبدة فول سوداني، مشروب غني بطعم المكسرات.'
            ),
            price: 185,
          },
          {
            name: L('Strawberry Chocolate', 'شوكولاتة بالفراولة'),
            desc: L(
              'Warm milk, chocolate syrup, strawberry puree, topped with whipped cream.',
              'حليب دافئ وصوص شوكولاتة وبيوريه فراولة، مغطاة بكريمة مخفوقة.'
            ),
            price: 200,
          },
          {
            name: L('Spicy White Chocolate', 'شوكولاتة بيضاء بالتوابل'),
            desc: L(
              'Warm milk, white chocolate sauce, cinnamon, ginger, cloves, warming spices.',
              'حليب دافئ وصوص شوكولاتة بيضاء وقرفة وزنجبيل وقرنفل وتوابل دافئة.'
            ),
            price: 175,
          },
          {
            name: L('Hot Cider', 'سايدر ساخن'),
            desc: L(
              'Pressed apple juice, cinnamon, cloves, star anise, served warm.',
              'عصير تفاح معصور وقرفة وقرنفل ويانسون نجمي، يُقدَّم دافئًا.'
            ),
            price: 95,
          },
        ],
      },
      {
        id: 'ice-tea',
        title: L('Ice Tea', 'شاي مثلج'),
        tagline: L('Chilled, fruity, and refreshing', 'بارد وفاكهي ومنعش'),
        items: [
          {
            name: L('Classic Tea', 'شاي مثلج كلاسيك'),
            desc: L(
              'Chilled black tea, lemon juice, ice, simple and refreshing drink.',
              'شاي أسود مبرّد وعصير ليمون وثلج، مشروب بسيط ومنعش.'
            ),
            price: 135,
          },
          {
            name: L('Hibiscus Tea', 'شاي كركديه'),
            desc: L(
              'Dried hibiscus petals, water, sugar, lemon, served over cold ice.',
              'أوراق كركديه مجففة وماء وسكر وليمون، تُقدَّم على ثلج بارد.'
            ),
            price: 125,
          },
          {
            name: L('Passion Fruit Tea', 'شاي باشن فروت'),
            desc: L(
              'Chilled black tea, passion fruit syrup, ice, tropical fruit flavor.',
              'شاي أسود مبرّد وشراب باشن فروت وثلج، بنكهة الفاكهة الاستوائية.'
            ),
            price: 165,
          },
          {
            name: L('Peach Tea', 'شاي خوخ'),
            desc: L(
              'Chilled black tea, peach syrup, ice, fresh peach fruit slices.',
              'شاي أسود مبرّد وشراب خوخ وثلج، مع شرائح خوخ طازجة.'
            ),
            price: 165,
          },
        ],
      },
      {
        id: 'milkshake',
        title: L('Milk Shakes', 'ميلك شيك'),
        tagline: L('Thick, creamy, and utterly satisfying', 'كثيف وكريمي ومُشبع تمامًا'),
        items: [
          {
            name: L('Chocolate Milkshake', 'ميلك شيك شوكولاتة'),
            desc: L(
              'Milk, chocolate ice cream, chocolate syrup, blended for a rich texture.',
              'حليب وآيس كريم شوكولاتة وصوص شوكولاتة، مخفوق لقوام غني.'
            ),
            price: 130,
          },
          {
            name: L('Vanilla Milkshake', 'ميلك شيك فانيليا'),
            desc: L(
              'Milk, vanilla ice cream, vanilla syrup, blended until thick and smooth.',
              'حليب وآيس كريم فانيليا وشراب فانيليا، مخفوق حتى الكثافة والنعومة.'
            ),
            price: 130,
          },
          {
            name: L('Mango Milkshake', 'ميلك شيك مانجو'),
            desc: L(
              'Milk, vanilla ice cream, mango pulp, blended into a tropical drink.',
              'حليب وآيس كريم فانيليا ولب مانجو، مخفوق لمشروب استوائي.'
            ),
            price: 130,
          },
          {
            name: L('Salted Caramel Milkshake', 'ميلك شيك كراميل مملح'),
            desc: L(
              'Milk, vanilla ice cream, caramel syrup, sea salt, blended smooth.',
              'حليب وآيس كريم فانيليا وشراب كراميل وملح البحر، مخفوق حتى النعومة.'
            ),
            price: 130,
          },
          {
            name: L('Salted Banana Milkshake', 'ميلك شيك موز مملح'),
            desc: L(
              'Milk, vanilla ice cream, bananas, sea salt, blended until creamy.',
              'حليب وآيس كريم فانيليا وموز وملح البحر، مخفوق حتى الكريمية.'
            ),
            price: 140,
          },
          {
            name: L('Strawberry Milkshake', 'ميلك شيك فراولة'),
            desc: L(
              'Milk, vanilla ice cream, fresh strawberries, blended into a cold treat.',
              'حليب وآيس كريم فانيليا وفراولة طازجة، مخفوق لمشروب بارد.'
            ),
            price: 145,
          },
          {
            name: L('Lavender Milkshake', 'ميلك شيك لافندر'),
            desc: L(
              'Milk, vanilla ice cream, lavender syrup, blended for floral aroma.',
              'حليب وآيس كريم فانيليا وشراب لافندر، مخفوق برائحة زهرية.'
            ),
            price: 145,
          },
          {
            name: L('Matcha Milkshake', 'ميلك شيك ماتشا'),
            desc: L(
              'Milk, vanilla ice cream, ground green tea, blended creamy herbal.',
              'حليب وآيس كريم فانيليا وشاي أخضر مطحون، مخفوق كريمي وعشبي.'
            ),
            price: 180,
          },
        ],
      },
      {
        id: 'mojito',
        title: L('Mojito', 'موهيتو'),
        tagline: L('Fresh mint, sparkling, tart refreshment', 'نعناع طازج وفوّار وانتعاش حامض'),
        items: [
          {
            name: L('Lemon Mint Mojito', 'موهيتو ليمون ونعناع'),
            desc: L(
              'Mint leaves, lime juice, sugar, sparkling soda, ice, refreshing citrus.',
              'أوراق نعناع وعصير ليمون وسكر وصودا فوارة وثلج، انتعاش حمضي.'
            ),
            price: 180,
          },
          {
            name: L('Strawberry Mojito', 'موهيتو فراولة'),
            desc: L(
              'Strawberries, mint, lime, sugar, sparkling soda, ice, fruity and fresh.',
              'فراولة ونعناع وليمون وسكر وصودا فوارة وثلج، فاكهي ومنعش.'
            ),
            price: 185,
          },
          {
            name: L('Peach Mojito', 'موهيتو خوخ'),
            desc: L(
              'Peach, mint, lime, sugar, sparkling soda, ice, summer fruit blend.',
              'خوخ ونعناع وليمون وسكر وصودا فوارة وثلج، مزيج فاكهة صيفية.'
            ),
            price: 190,
          },
          {
            name: L('Raspberry Mojito', 'موهيتو توت أحمر'),
            desc: L(
              'Raspberries, mint, lime, sugar, sparkling soda, ice, tart and refreshing.',
              'توت أحمر ونعناع وليمون وسكر وصودا فوارة وثلج، حامض ومنعش.'
            ),
            price: 210,
          },
          {
            name: L('Blueberry Mojito', 'موهيتو بلوبيري'),
            desc: L(
              'Blueberries, mint, lime, sugar, sparkling soda, ice, berry citrus mix.',
              'توت أزرق ونعناع وليمون وسكر وصودا فوارة وثلج، مزيج توت وحمضيات.'
            ),
            price: 210,
          },
          {
            name: L('Passion Fruit Mojito', 'موهيتو باشن فروت'),
            desc: L(
              'Passion fruit, mint, lime, sugar, sparkling soda, ice, tropical refresher.',
              'باشن فروت ونعناع وليمون وسكر وصودا فوارة وثلج، منعش استوائي.'
            ),
            price: 210,
          },
        ],
      },
    ],
  },
  {
    id: 'food',
    label: L('Food', 'طعام'),
    emoji: '🍽️',
    categories: [
      {
        id: 'sandwiches',
        title: L('Sandwiches in Ciabatta', 'ساندويتشات تشاباتا'),
        tagline: L('Crusty, toasted, and loaded', 'خبز مقرمش محمّص وحشوة سخية'),
        items: [
          {
            name: L('Spicy Chicken', 'دجاج حار'),
            desc: L(
              'Ciabatta, spicy chicken, peppers, onions, pepper jack cheese, served warm.',
              'خبز تشاباتا ودجاج حار وفلفل وبصل وجبنة بيبر جاك، يُقدَّم دافئًا.'
            ),
            price: 280,
          },
          {
            name: L('Pesto Smoked Turkey', 'تيركي مدخن بالبيستو'),
            desc: L(
              'Ciabatta, smoked turkey, basil pesto, mozzarella, tomatoes, pressed until warm.',
              'خبز تشاباتا وتيركي مدخن وبيستو الريحان وموتزاريلا وطماطم، محمّص حتى يدفأ.'
            ),
            price: 245,
          },
          {
            name: L('Beef Bacon', 'بيف بيكون'),
            desc: L(
              'Ciabatta, beef bacon, lettuce, tomatoes, mayonnaise, served in crusty bread.',
              'خبز تشاباتا وبيف بيكون وخس وطماطم ومايونيز، في خبز مقرمش.'
            ),
            price: 240,
          },
          {
            name: L('Tuna', 'تونة'),
            desc: L(
              'Ciabatta, tuna, corn, onions, celery, mayonnaise, served in toasted bread.',
              'خبز تشاباتا وتونة وذرة وبصل وكرفس ومايونيز، في خبز محمّص.'
            ),
            price: 230,
          },
        ],
      },
      {
        id: 'croissant',
        title: L('Stuffed Croissant', 'كرواسون محشو'),
        tagline: L('Buttery, flaky, baked to order', 'بالزبدة وهش، يُخبز عند الطلب'),
        items: [
          {
            name: L('Bacon Croissant', 'كرواسون بيكون'),
            desc: L(
              'Pastry, butter, beef bacon, melted cheese, baked until crisp and warm.',
              'عجين وزبدة وبيف بيكون وجبنة ذائبة، يُخبز حتى القرمشة والدفء.'
            ),
            price: 190,
          },
          {
            name: L('Cheese Croissant', 'كرواسون جبنة'),
            desc: L(
              'Pastry, butter, melted cheddar, mozzarella cheese, baked until flaky and golden.',
              'عجين وزبدة وشيدر وموتزاريلا ذائبة، يُخبز حتى الهشاشة واللون الذهبي.'
            ),
            price: 170,
          },
          {
            name: L('Scrambled Cheese Croissant', 'كرواسون بيض وجبنة'),
            desc: L(
              'Pastry, butter, scrambled eggs, mixed cheeses, baked until soft and flaky.',
              'عجين وزبدة وبيض مخفوق وأجبان مشكّلة، يُخبز حتى الطراوة والهشاشة.'
            ),
            price: 210,
          },
          {
            name: L('Turkey & Cheese Croissant', 'كرواسون تيركي وجبنة'),
            desc: L(
              'Pastry, butter, smoked turkey, Swiss cheese, baked until golden brown.',
              'عجين وزبدة وتيركي مدخن وجبنة سويسرية، يُخبز حتى اللون الذهبي.'
            ),
            price: 200,
            tag: 'popular',
          },
          {
            name: L('Scrambled Bacon Croissant', 'كرواسون بيض وبيكون'),
            desc: L(
              'Pastry, butter, scrambled eggs, beef bacon, baked until warm and flaky.',
              'عجين وزبدة وبيض مخفوق وبيف بيكون، يُخبز حتى يدفأ ويهش.'
            ),
            price: 220,
          },
        ],
      },
      {
        id: 'hot-bites',
        title: L('Hot Bites', 'أطباق ساخنة'),
        tagline: L('Hearty, warm, and satisfying', 'دسمة ودافئة ومشبعة'),
        items: [
          {
            name: L('Chicken Quesadillas', 'كساديا دجاج'),
            desc: L(
              'Tortillas roasted, grilled chicken, cheese, peppers, toasted until golden and crispy.',
              'تورتيلا محمّصة ودجاج مشوي وجبنة وفلفل، محمّرة حتى الذهبية والقرمشة.'
            ),
            price: 335,
          },
          {
            name: L('Philly Steak Sandwich', 'ساندويتش فيلي ستيك'),
            desc: L(
              'Beef steak slices, onions, peppers, melted cheese, served in bread.',
              'شرائح ستيك بقري وبصل وفلفل وجبنة ذائبة، تُقدَّم في الخبز.'
            ),
            price: 295,
          },
          {
            name: L('Oklahoma Burger Bun', 'أوكلاهوما برجر'),
            desc: L(
              'Toasted bun, grilled beef patty, onions, melted cheese, simple layers.',
              'خبز برجر محمّص وقطعة لحم مشوية وبصل وجبنة ذائبة، بطبقات بسيطة.'
            ),
            price: 320,
          },
        ],
      },
      {
        id: 'sweets',
        title: L('Sweets & Breakfast', 'حلويات وفطور'),
        tagline: L('An event in itself', 'تجربة بحد ذاتها'),
        items: [
          {
            name: L('Granola', 'جرانولا'),
            desc: L(
              'Oats, nuts, honey, dried fruits, baked until crunchy, served with milk.',
              'شوفان ومكسرات وعسل وفواكه مجففة، مخبوزة حتى القرمشة وتُقدَّم مع الحليب.'
            ),
            price: 265,
          },
          {
            name: L('French Toast', 'فرنش توست'),
            desc: L(
              'Bread, eggs, milk, cinnamon, vanilla, toasted until golden and soft.',
              'خبز وبيض وحليب وقرفة وفانيليا، محمّص حتى الذهبية والطراوة.'
            ),
            price: 235,
            tag: 'popular',
          },
        ],
      },
      {
        id: 'salads',
        title: L('Salads', 'سلطات'),
        tagline: L('Fresh, crisp, and vibrant', 'طازجة ومقرمشة ونابضة'),
        items: [
          {
            name: L('Caesar', 'سيزر'),
            desc: L(
              'Romaine lettuce, croutons, parmesan cheese, garlic lemon dressing, tossed together.',
              'خس روماني وخبز محمّص وجبنة بارميزان وصلصة الثوم والليمون، ممزوجة معًا.'
            ),
            price: 200,
          },
          {
            name: L('Latin', 'لاتين'),
            desc: L(
              'Mixed greens, black beans, corn, avocado, tomatoes, sauce lime juice vinaigrette.',
              'خضار مشكّلة وفاصوليا سوداء وذرة وأفوكادو وطماطم، مع صلصة عصير الليمون.'
            ),
            price: 220,
          },
        ],
      },
    ],
  },
];

export type FlatItem = MenuItem & {
  groupId: string;
  groupLabel: Localized;
  categoryTitle: Localized;
};

/** Flat list of every item, with its group/category context — used by search. */
export const allItems: FlatItem[] = menu.flatMap((g) =>
  g.categories.flatMap((c) =>
    c.items.map((i) => ({
      ...i,
      groupId: g.id,
      groupLabel: g.label,
      categoryTitle: c.title,
    }))
  )
);

/**
 * Hand-picked highlights for the landing page, resolved from the menu itself so
 * the copy and prices never drift. The blurb for each lives in the dictionary
 * under `signature.notes`, in the same order.
 */
const signatureNames = ['Spanish Latte', 'Pistachio Latte', 'Iced Matcha Latte', 'French Toast'];

export const signatures: FlatItem[] = signatureNames.map(
  (name) => allItems.find((i) => i.name.en === name)!
);
