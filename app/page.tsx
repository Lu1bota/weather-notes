import MainClient from "../components/MainClient";

type SearchParams = { city?: string };

type Props = {
  searchParams?: SearchParams | Promise<SearchParams>;
};

export default async function Home({ searchParams }: Props) {
  const params = (await searchParams) as SearchParams;
  const initialCity = params?.city ?? undefined;
  return <MainClient initialCity={initialCity} />;
}
