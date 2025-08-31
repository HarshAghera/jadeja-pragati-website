import SlugInnerPage from "@/app/client/components/slug_page/slug_inner";

type PageProps = {
  params: Promise<{
    section: string;
    category: string;
    slug: string;
  }>;
};

async function getPageData(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/pages/${slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;
  return res.json();
}

export default async function Page(props: PageProps) {
  const params = await props.params; 
  const data = await getPageData(params.slug);

  return <SlugInnerPage data={data} />;
}
