const escapeHtml = (text) => {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
};

app.get('/echo', (req, res) => {
    const name = escapeHtml(req.query.name || '');
    res.send(`الاسم: ${name}`);
});