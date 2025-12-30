// 37.js - Query Parameters
const http = require('http');
const url = require('url');

console.log("=== Query Parameters Handling ===\n");

const PORT = 3006;

const server = http.createServer((req, res) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  
  // تحليل الـ URL
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;
  
  res.setHeader('Content-Type', 'application/json');
  
  // المسار /greet
  if (pathname === '/greet') {
    const name = query.name || 'Guest';
    const greeting = query.greeting || 'Hello';
    
    res.writeHead(200);
    res.end(JSON.stringify({
      message: `${greeting}, ${name}!`,
      query: query,
      timestamp: new Date().toISOString()
    }));
    return;
  }
  
  // المسار /search
  if (pathname === '/search') {
    const { q, limit = '10', page = '1' } = query;
    
    if (!q) {
      res.writeHead(400);
      res.end(JSON.stringify({
        error: 'Missing search query',
        example: '/search?q=nodejs&limit=20&page=2'
      }));
      return;
    }
    
    const limitNum = parseInt(limit);
    const pageNum = parseInt(page);
    
    // محاكاة نتائج البحث
    const results = Array.from({length: limitNum}, (_, i) => ({
      id: i + 1,
      title: `Result ${i + 1} for "${q}"`,
      content: `This is result number ${i + 1} for the search query "${q}"`,
      relevance: Math.random().toFixed(2)
    }));
    
    const totalResults = 100;
    const totalPages = Math.ceil(totalResults / limitNum);
    
    res.writeHead(200);
    res.end(JSON.stringify({
      query: q,
      page: pageNum,
      limit: limitNum,
      totalResults,
      totalPages,
      results,
      hasNext: pageNum < totalPages,
      hasPrev: pageNum > 1
    }));
    return;
  }
  
  // المسار /filter
  if (pathname === '/filter') {
    const { category, minPrice, maxPrice, sort = 'price_asc' } = query;
    
    // محاكاة منتجات
    const products = [
      { id: 1, name: 'Laptop', category: 'electronics', price: 999.99 },
      { id: 2, name: 'Phone', category: 'electronics', price: 699.99 },
      { id: 3, name: 'Book', category: 'books', price: 19.99 },
      { id: 4, name: 'Chair', category: 'furniture', price: 149.99 },
      { id: 5, name: 'Table', category: 'furniture', price: 299.99 },
      { id: 6, name: 'Headphones', category: 'electronics', price: 199.99 },
    ];
    
    let filtered = [...products];
    
    // تطبيق الفلاتر
    if (category) {
      filtered = filtered.filter(p => p.category === category);
    }
    
    if (minPrice) {
      filtered = filtered.filter(p => p.price >= parseFloat(minPrice));
    }
    
    if (maxPrice) {
      filtered = filtered.filter(p => p.price <= parseFloat(maxPrice));
    }
    
    // الترتيب
    if (sort === 'price_asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === 'price_desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sort === 'name_asc') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }
    
    res.writeHead(200);
    res.end(JSON.stringify({
      filters: query,
      total: filtered.length,
      products: filtered
    }));
    return;
  }
  
  // المسار /users
  if (pathname === '/users') {
    const users = [
      { id: 1, name: 'Alice', age: 25, city: 'New York' },
      { id: 2, name: 'Bob', age: 30, city: 'London' },
      { id: 3, name: 'Charlie', age: 35, city: 'Paris' },
      { id: 4, name: 'Diana', age: 28, city: 'Tokyo' },
      { id: 5, name: 'Eve', age: 22, city: 'Sydney' }
    ];
    
    let filteredUsers = [...users];
    
    // فلترة حسب العمر
    if (query.minAge) {
      filteredUsers = filteredUsers.filter(u => u.age >= parseInt(query.minAge));
    }
    
    if (query.maxAge) {
      filteredUsers = filteredUsers.filter(u => u.age <= parseInt(query.maxAge));
    }
    
    // فلترة حسب المدينة
    if (query.city) {
      filteredUsers = filteredUsers.filter(u => 
        u.city.toLowerCase().includes(query.city.toLowerCase())
      );
    }
    
    // ترتيب
    if (query.sort) {
      const [field, order] = query.sort.split('_');
      filteredUsers.sort((a, b) => {
        if (order === 'asc') {
          return a[field] > b[field] ? 1 : -1;
        } else {
          return a[field] < b[field] ? 1 : -1;
        }
      });
    }
    
    // ترقيم الصفحات
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
    
    res.writeHead(200);
    res.end(JSON.stringify({
      page,
      limit,
      total: filteredUsers.length,
      totalPages: Math.ceil(filteredUsers.length / limit),
      users: paginatedUsers,
      filters: query
    }));
    return;
  }
  
  // المسار /analyze
  if (pathname === '/analyze') {
    res.writeHead(200);
    res.end(JSON.stringify({
      url: req.url,
      parsedUrl: parsedUrl,
      query: query,
      queryString: parsedUrl.search,
      pathname: pathname,
      hasQuery: Object.keys(query).length > 0
    }));
    return;
  }
  
  // المسار الرئيسي
  if (pathname === '/') {
    res.writeHead(200);
    res.end(JSON.stringify({
      message: 'Query Parameters Demo API',
      endpoints: {
        '/greet': 'GET - Greet a user',
        '/search': 'GET - Search with pagination',
        '/filter': 'GET - Filter products',
        '/users': 'GET - Users with filtering and pagination',
        '/analyze': 'GET - Analyze query parameters'
      },
      examples: {
        greet: 'http://localhost:3006/greet?name=Sara&greeting=Welcome',
        search: 'http://localhost:3006/search?q=nodejs&limit=5&page=1',
        filter: 'http://localhost:3006/filter?category=electronics&minPrice=100&maxPrice=1000&sort=price_asc',
        users: 'http://localhost:3006/users?minAge=25&maxAge=35&city=New&sort=age_asc&page=1&limit=2'
      }
    }));
    return;
  }
  
  // 404
  res.writeHead(404);
  res.end(JSON.stringify({
    error: 'Not Found',
    path: req.url,
    availableEndpoints: ['/', '/greet', '/search', '/filter', '/users', '/analyze']
  }));
});

// بدء السيرفر
server.listen(PORT, () => {
  console.log(`✅ Query Parameters Server running on http://localhost:${PORT}`);
  console.log(`\n📋 Test URLs:`);
  console.log(`   http://localhost:${PORT}/greet?name=Sara`);
  console.log(`   http://localhost:${PORT}/greet?name=John&greeting=Hi`);
  console.log(`   http://localhost:${PORT}/search?q=javascript&limit=3`);
  console.log(`   http://localhost:${PORT}/filter?category=electronics`);
  console.log(`   http://localhost:${PORT}/users?minAge=25&sort=name_asc`);
  console.log(`   http://localhost:${PORT}/analyze?test=1&another=value`);
});

process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});