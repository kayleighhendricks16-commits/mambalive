RewriteEngine On

# Redirect /page.html to /page (for SEO and to remove the extension from the address bar)
RewriteCond %{THE_REQUEST} \s/+(.+?)\.html[\s?] [NC]
RewriteRule ^ /%1 [R=301,L,NE]

# Internally map /page to /page.html (so the page loads even without .html)
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME}.html -f
RewriteRule ^(.+?)/?$ $1.html [L]

# Also handle index.html separately (optional, but good)
RewriteCond %{THE_REQUEST} /index\.html [NC]
RewriteRule ^(.*)index\.html$ /$1 [R=301,L]
DirectoryIndex index.html