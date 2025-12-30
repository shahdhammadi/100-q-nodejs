const { performance, PerformanceObserver } = require('perf_hooks');

const obs = new PerformanceObserver((items) => {
    items.getEntries().forEach((entry) => {
        console.log(`${entry.name}: ${entry.duration}ms`);
    });
});

obs.observe({ entryTypes: ['measure'] });

async function asyncOperation() {
    performance.mark('async-start');
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    performance.mark('async-end');
    performance.measure('Async Operation', 'async-start', 'async-end');
}

asyncOperation();