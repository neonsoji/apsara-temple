import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/locales";
import UnderConstruction from "@/components/home/UnderConstruction";

export default async function CartPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return <UnderConstruction locale={locale} dictNav={dict.navigation} dictFooter={dict.footer} title={dict.navigation.cart} />;
}
