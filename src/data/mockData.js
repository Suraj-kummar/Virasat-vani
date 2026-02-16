import { Globe, Sparkles, ShoppingBag } from 'lucide-react';

export const MOCK_GENERATED_PRODUCT = {
    id: 'new-1',
    title: "Vintage Hand-Painted Wooden Elephant",
    category: "Woodwork",
    priceNum: 2400,
    price: "₹ 2,400",
    image: "/product_kathputli.png",
    description: "Exquisite hand-carved Kadamb wood elephant, adorned with traditional gold-leaf painting. This piece was crafted using 200-year-old techniques passed down through generations in the Udaipur artisan community.",
    artisan: "Ramesh Kumawat",
    location: "Shilpgram, Udaipur",
    materials: ["Kadamb Wood", "Gold Leaf", "Stone Colors"],
    audioStory: "This elephant represents the royal procession of the Maharana. My grandfather taught me how to mix these stone colors when I was just a boy..."
};

export const EXISTING_PRODUCTS = [
    {
        id: 1,
        title: "Blue Pottery Floral Vase",
        category: "Pottery",
        priceNum: 1800,
        price: "₹ 1,800",
        image: "/product_pottery_vase.png",
        artisan: "Sunita Devi",
        location: "Jaipur Region",
        materials: ["Quartz Powder", "Glass", "Oxide Colors"],
        audioStory: "The blue color comes from cobalt oxide. It takes 40 days to fire this pottery."
    },
    {
        id: 2,
        title: "Embroidered Leather Mojari",
        category: "Textiles",
        priceNum: 3200,
        price: "₹ 3,200",
        image: "/product_mojari.png",
        artisan: "Mohan Lal",
        location: "Jodhpur",
        materials: ["Camel Leather", "Silk Thread"],
        audioStory: "Every stitch tells a story of the desert sands. These shoes are made to last a lifetime."
    },
    {
        id: 3,
        title: "Block Print Cotton Stole",
        category: "Textiles",
        priceNum: 950,
        price: "₹ 950",
        image: "/product_saree.png",
        artisan: "Anjali Chippa",
        location: "Bagru",
        materials: ["Cotton", "Natural Dye"],
        audioStory: "We use natural vegetable dyes and wooden blocks carved by my father."
    },
    {
        id: 4,
        title: "Hand Carved Window Frame",
        category: "Woodwork",
        priceNum: 12000,
        price: "₹ 12,000",
        image: "/product_jharokha.png",
        artisan: "Kailash Suthar",
        location: "Udaipur",
        materials: ["Teak Wood", "Varnish"],
        audioStory: "This design is from the old Haveli styles. It takes two weeks to carve one frame."
    }
];

export const NOTIFICATIONS = [
    { id: 1, title: "Order Shipped", msg: "Your Blue Pottery Vase is on the way!", time: "2h ago", icon: Globe },
    { id: 2, title: "New Story", msg: "Ramesh Kumawat added a new story.", time: "5h ago", icon: Sparkles },
    { id: 3, title: "Price Drop", msg: "Mojari prices dropped by 10%.", time: "1d ago", icon: ShoppingBag },
];
