// الخطوة 1: استيراد مكتبة Supabase
// نحن نستخدم "CDN" لجلبها مباشرة من الإنترنت
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';

// الخطوة 2: وضع مفاتيحك الخاصة (استبدلها من حسابك)
const SUPABASE_URL = 'https://vhrvdkaqlrwplkdgwwkl.supabase.co'; // ⬅️ غيّر هذا
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZocnZka2FxbHJ3cGxrZGd3d2tsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMzOTUyMTAsImV4cCI6MjA3ODk3MTIxMH0.mNAn3qo48y46FDkDOqUVt1xwN2smFMZL1lBNbT0OkTA'; // ⬅️ غيّر هذا

// الخطوة 3: إنشاء "العميل" الذي سيتحدث مع قاعدة البيانات
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// لنختبره!
console.log('Supabase client is ready!', supabase);


// ... (الكود السابق يبقى كما هو) ...

// دالة (Function) لجلب وعرض المنتجات
async function getProducts() {
    console.log('Fetching products...');

    // هذا هو السطر الذي يطلب من Supabase:
    // "اختر كل شيء (*) من جدول Products"
    let { data: products, error } = await supabase
        .from('Products')
        .select('*');

    if (error) {
        console.error('Error fetching products:', error);
        return;
    }

    // وجدنا المنتجات!
    console.log('Products found:', products);

    // الآن، دعنا نعرضها في الصفحة
    // ابحث عن الـ div الذي حضّرناه في HTML
    const productsGrid = document.getElementById('products-grid');

    // من أجل كل منتج وجدناه...
    for (let product of products) {
        // ... أنشئ عنصر HTML جديد
        const productCard = document.createElement('div');
        productCard.classList.add('product-card'); // (سنضيف الستايل لهذا لاحقاً في style.css)

        // أضف اسم المنتج والسعر
        productCard.innerHTML = `
            <h3>${product.name}</h3>
            <p>${product.price} DZD</p>
            <img src="${product.image_url}" alt="${product.name}" width="100">
        `;

        // أضف البطاقة الجديدة إلى الشبكة
        productsGrid.appendChild(productCard);
    }
}

// أخيراً، قم بتشغيل الدالة فوراً عند فتح الصفحة
getProducts();
