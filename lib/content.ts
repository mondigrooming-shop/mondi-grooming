import { Droplet, Scissors, Sparkles, Leaf, ShieldCheck, MapPin } from "lucide-react";

export type CategoryGroup = { key: string; label: string; blurb: string; icon: typeof Droplet };

export const CATEGORY_GROUPS: CategoryGroup[] = [
  { key: "barbe", label: "La Barbe", blurb: "Huiles, baumes et shampooings pour assouplir, discipliner et sublimer.", icon: Droplet },
  { key: "cheveux", label: "Le Cheveu", blurb: "Soins pensés pour les cheveux texturés : hydratation profonde et brillance.", icon: Sparkles },
  { key: "peau", label: "La Peau", blurb: "Nettoyants doux pour peaux sèches — l'équilibre sans agresser.", icon: Leaf },
  { key: "accessoires", label: "Les Accessoires", blurb: "Durags, bonnets et peignes en bois pour préserver et façonner.", icon: Scissors },
];

export const VALUES = [
  { icon: Leaf, title: "Ingrédients d'origine naturelle", body: "Huiles précieuses, beurres végétaux et extraits sélectionnés pour leur performance réelle sur le cheveu texturé et la peau sèche." },
  { icon: Droplet, title: "Pensé pour cheveux texturés", body: "Des formules riches qui pénètrent sans laisser de résidu, assouplissent les boucles, disciplinent le volume et nourrissent en profondeur." },
  { icon: ShieldCheck, title: "Peaux sèches respectées", body: "Sans alcool desséchant, sans sulfates agressifs. Une hydratation qui dure, du visage aux pointes." },
  { icon: MapPin, title: "Fait à Montréal", body: "Conçu au Québec, cruelty-free et vegan friendly. Le soin comme art de vivre, du premier geste au résultat." },
];

export const TESTIMONIALS = [
  { name: "Jordan M.", role: "Cheveux crépus · Montréal", rating: 5, quote: "Mes boucles n'ont jamais été aussi définies. L'huile pénètre vraiment, fini gras zéro. C'est devenu mon rituel du matin." },
  { name: "Alex T.", role: "Barbe épaisse · Laval", rating: 5, quote: "Le baume sculpte sans cartonner. Ma barbe est douce, le parfum de cèdre tient la journée. Rien à voir avec ce que j'utilisais avant." },
  { name: "Samira K.", role: "Peau sèche · Gatineau", rating: 5, quote: "Mon visage ne tirait plus après trois jours. Doux, sans parfum agressif. Enfin un nettoyant qui respecte ma peau." },
  { name: "Karim B.", role: "Low fade + texte · Montréal", rating: 5, quote: "Le leave-in contrôle mon volume toute la journée, même par humidité. Le résultat tient, le toucher reste naturel." },
];

export const FAQS = [
  { q: "Vos produits conviennent-ils aux cheveux texturés et crépus ?", a: "Oui — c'est même notre point de départ. Nos formules riches en huiles végétales et beurres nourrissants sont pensées pour pénétrer le cheveu texturé sans laisser de résidu, assouplir les boucles, définir le curl et maîtriser le volume." },
  { q: "J'ai la peau sèche — vos soins sont-ils adaptés ?", a: "Absolument. Nos nettoyants et soins sont sans alcool desséchant et sans sulfates agressifs. Ils nettoient en douceur et préservent la barrière hydrolipidique, pour une peau confortable et hydratée toute la journée." },
  { q: "Les ingrédients sont-ils naturels et éthiques ?", a: "Nous privilégions des ingrédients d'origine naturelle, sélectionnés pour leur performance. Tous nos produits sont cruelty-free et vegan friendly, conçus et formulés à Montréal, au Québec." },
  { q: "Quels sont les délais de livraison ?", a: "Livraison partout au Canada en 2 à 5 jours ouvrables. La livraison est offerte pour toute commande de 75 $ et plus. Les commandes passées avant 14 h sont expédiées le jour même depuis Montréal." },
  { q: "Puis-je retourner un produit ?", a: "Oui. Vous disposez de 30 jours pour nous retourner tout produit non ouvert. Pour un produit ouvert qui ne vous conviendrait pas, écrivez-nous : nous trouverons le soin fait pour vous." },
  { q: "Comment construire mon rituel ?", a: "Trois gestes suffisent : Nettoyer, Nourrir, Façonner. Commencez par un nettoyant visage et un shampooing barbe, ajoutez une huile ou un baume pour nourrir, puis un leave-in ou une crème pour façonner." },
];

export const RITUALS = [
  { icon: Droplet, step: "01", title: "Nettoyer", body: "On débarrasse la barbe et la peau des impuretés et de l'excès de sébum, sans jamais les dessécher. La base d'un rituel sain, même sur peau sèche." },
  { icon: Sparkles, step: "02", title: "Nourrir", body: "Huiles précieuses et baumes riches pénètrent le cheveu texturé pour assouplir, hydrater et fortifier le follicule. Boucles définies, barbe dense et douce." },
  { icon: Scissors, step: "03", title: "Façonner", body: "Crèmes, baumes et accessoires sculptent la barbe et le cheveu avec une tenue naturelle, un fini mat, un toucher impeccable." },
];
