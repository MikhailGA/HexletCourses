SELECT name
  FROM "goods"
  WHERE category_id in (SELECT id FROM "categories" WHERE state = 'published');