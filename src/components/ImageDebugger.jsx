import React, { useState, useEffect } from 'react';

// Debug component to check product images
export default function ImageDebugger() {
    const [products, setProducts] = useState([]);
    const [localStorageData, setLocalStorageData] = useState(null);

    useEffect(() => {
        // Check localStorage
        const stored = localStorage.getItem('virasat_products');
        setLocalStorageData(stored);

        if (stored) {
            try {
                setProducts(JSON.parse(stored));
            } catch (e) {
                console.error('Error parsing localStorage:', e);
            }
        }
    }, []);

    const clearStorage = () => {
        localStorage.removeItem('virasat_products');
        localStorage.removeItem('virasat_cart');
        localStorage.removeItem('virasat_user');
        alert('Storage cleared! Refreshing...');
        window.location.reload();
    };

    return (
        <div style={{ padding: '20px', background: '#0f172a', color: 'white', minHeight: '100vh' }}>
            <h1>🔍 Image Debugger</h1>

            <div style={{ marginBottom: '20px' }}>
                <button
                    onClick={clearStorage}
                    style={{
                        padding: '10px 20px',
                        background: '#f59e0b',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    Clear LocalStorage & Reload
                </button>
            </div>

            <h2>LocalStorage Status:</h2>
            <pre style={{ background: '#1e293b', padding: '10px', borderRadius: '5px', overflow: 'auto' }}>
                {localStorageData ? 'Data exists in localStorage' : 'No data in localStorage'}
            </pre>

            <h2>Products ({products.length}):</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                {products.map((p, idx) => (
                    <div key={idx} style={{ background: '#1e293b', padding: '15px', borderRadius: '10px' }}>
                        <h3 style={{ fontSize: '14px', marginBottom: '10px' }}>{p.title}</h3>
                        <div style={{ marginBottom: '10px' }}>
                            <strong>Image Path:</strong>
                            <code style={{ display: 'block', background: '#0f172a', padding: '5px', borderRadius: '3px', fontSize: '11px', wordBreak: 'break-all' }}>
                                {p.image || 'NO IMAGE PATH'}
                            </code>
                        </div>
                        <img
                            src={p.image}
                            alt={p.title}
                            style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '5px', background: '#334155' }}
                            onLoad={(e) => e.target.style.border = '3px solid #10b981'}
                            onError={(e) => {
                                e.target.style.border = '3px solid #ef4444';
                                e.target.alt = '❌ Failed to load';
                            }}
                        />
                        <div style={{ marginTop: '5px', fontSize: '11px', color: '#94a3b8' }}>
                            Green border = loaded, Red border = failed
                        </div>
                    </div>
                ))}
            </div>

            {products.length === 0 && (
                <div style={{ padding: '40px', textAlign: 'center', background: '#1e293b', borderRadius: '10px' }}>
                    <p>No products found in localStorage.</p>
                    <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '10px' }}>
                        The app will use INITIAL_PRODUCTS from App.jsx on next load.
                    </p>
                </div>
            )}
        </div>
    );
}
