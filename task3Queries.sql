-- Query A: Count of certificates per matter for the last 30 days
SELECT 
    o.matter_id,
    COUNT(c.id) AS certificates_count
FROM Orders o
JOIN Certificates c ON c.order_id = o.id
WHERE c.created_at >= NOW() - INTERVAL '30 days'
GROUP BY o.matter_id;

-- Query B: Matter IDs without a Title certificate in the last 30 days
SELECT DISTINCT o.matter_id
FROM Orders o
LEFT JOIN Certificates c
    ON c.order_id = o.id
    AND c.type = 'Title'
    AND c.created_at >= NOW() - INTERVAL '30 days'
WHERE c.id IS NULL;

-- Suggested index to speed up Query B
-- Index on (order_id, type, created_at) helps quickly find Title certificates within a date range
CREATE INDEX idx_certificates_order_type_date ON Certificates(order_id, type, created_at);
