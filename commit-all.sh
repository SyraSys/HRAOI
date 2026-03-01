#!/bin/bash
set -e

AUTHOR="Co-Authored-By: Oz <oz-agent@warp.dev>"

commit_file() {
  local file="$1"
  local msg="$2"
  git add -- "$file"
  git commit -m "$msg

$AUTHOR"
}

# Modified files
commit_file ".gitignore" "Update .gitignore"
commit_file "app/about-us/page.tsx" "Update About Us page"
commit_file "app/admin/layout.tsx" "Update admin layout"
commit_file "app/api/admin/circulars/route.ts" "Update admin circulars API route"
commit_file "app/api/admin/gallery/route.ts" "Update admin gallery API route"
commit_file "app/api/admin/orders/route.ts" "Update admin orders API route"
commit_file "app/api/membership/route.ts" "Update membership API route"
commit_file "app/circulars/page.tsx" "Update circulars page"
commit_file "app/contact-us/page.tsx" "Update Contact Us page"
commit_file "app/enquiry/page.tsx" "Update enquiry page"
commit_file "app/globals.css" "Update global styles"
commit_file "app/membership/page.tsx" "Update membership page"
commit_file "app/orders/page.tsx" "Update orders page"
commit_file "app/page.tsx" "Update homepage"
commit_file "components/Announcements.tsx" "Update Announcements component"
commit_file "components/ConditionalLayout.tsx" "Update ConditionalLayout component"
commit_file "components/Footer.tsx" "Update Footer component"
commit_file "components/Header.tsx" "Update Header component"
commit_file "components/MemberSearch.tsx" "Update MemberSearch component"
commit_file "lib/prisma.ts" "Update Prisma client"
commit_file "package.json" "Update package.json dependencies"
commit_file "package-lock.json" "Update package-lock.json"
commit_file "prisma/schema.prisma" "Update Prisma schema"
commit_file "todo.md" "Update todo"

# Deleted files
commit_file "lib/supabase-storage.ts" "Remove Supabase storage utility"
commit_file "public/images/torch.gif" "Remove torch GIF image"

# New files
commit_file "app/admin/certificates/page.tsx" "Add admin certificates page"
commit_file "app/api/admin/certificates/route.ts" "Add admin certificates API route"
commit_file "app/api/certificates/[id]/route.ts" "Add certificate by ID API route"
commit_file "app/api/certificates/search/route.ts" "Add certificates search API route"
commit_file "app/api/membership/search/route.ts" "Add membership search API route"
commit_file "app/search/page.tsx" "Add search page"
commit_file "components/Motion.tsx" "Add Motion component"
commit_file "lib/cloudinary.ts" "Add Cloudinary utility"
commit_file "public/images/header.jpeg" "Add header image"
commit_file "public/images/torch.jpeg" "Add torch image"

# Homepage images (filenames with spaces)
for img in public/homepage/*.jpeg; do
  filename=$(basename "$img")
  commit_file "$img" "Add homepage image: $filename"
done

echo ""
echo "All files committed individually!"
