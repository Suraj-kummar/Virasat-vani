import React, { useState } from 'react';
import { ShoppingBag, Sparkles, Globe, User, Camera } from 'lucide-react';
import PropTypes from 'prop-types';
import NavIcon from '../ui/NavIcon';
import ShopView from './ShopView';
import StoriesView from './StoriesView';
import DiscoverView from './DiscoverView';
import ProfileView from './ProfileView';
import ProductDetail from './ProductDetail';

export default function BuyerContainer({ products, cart, likes, user, onToggleLike, onAddToCart, onOpenCart, onSwitchToArtisan, onLogout }) {
    const [activeTab, setActiveTab] = useState('shop');
    const [selectedProduct, setSelectedProduct] = useState(null);

    return (
        <>
            {selectedProduct ? (
                <ProductDetail
                    product={selectedProduct}
                    isLiked={likes.has(selectedProduct.id)}
                    onClose={() => setSelectedProduct(null)}
                    onToggleLike={() => onToggleLike(selectedProduct.id)}
                    onAddToCart={() => onAddToCart(selectedProduct)}
                />
            ) : (
                <div className="h-full bg-slate-950 flex flex-col relative">
                    <div className="flex-1 overflow-y-auto pb-24 scrollbar-hide">
                        {activeTab === 'shop' && <ShopView products={products} onSelect={setSelectedProduct} onOpenCart={onOpenCart} cartCount={cart.reduce((acc, item) => acc + item.qty, 0)} user={user} />}
                        {activeTab === 'stories' && <StoriesView products={products} />}
                        {activeTab === 'discover' && <DiscoverView />}
                        {activeTab === 'profile' && <ProfileView user={user} onLogout={onLogout} products={products} likes={likes} />}
                    </div>

                    {/* Bottom Nav */}
                    <div className="h-20 bg-slate-950/80 backdrop-blur-xl border-t border-white/5 flex justify-around items-center px-2 z-40 absolute bottom-0 w-full">
                        <NavIcon icon={ShoppingBag} label="Shop" active={activeTab === 'shop'} onClick={() => setActiveTab('shop')} />
                        <NavIcon icon={Sparkles} label="Stories" active={activeTab === 'stories'} onClick={() => setActiveTab('stories')} />

                        <button onClick={onSwitchToArtisan} className="w-14 h-14 bg-gradient-to-tr from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center -mt-8 shadow-lg shadow-amber-500/20 border-4 border-slate-950 transform rotate-3 active:scale-95 transition-all">
                            <Camera size={24} className="text-white" />
                        </button>

                        <NavIcon icon={Globe} label="Discover" active={activeTab === 'discover'} onClick={() => setActiveTab('discover')} />
                        <NavIcon icon={User} label="Profile" active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
                    </div>
                </div>
            )}
        </>
    );
}

BuyerContainer.propTypes = {
    products: PropTypes.array.isRequired,
    cart: PropTypes.array.isRequired,
    likes: PropTypes.object.isRequired,
    user: PropTypes.object,
    onToggleLike: PropTypes.func.isRequired,
    onAddToCart: PropTypes.func.isRequired,
    onOpenCart: PropTypes.func.isRequired,
    onSwitchToArtisan: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired
};
