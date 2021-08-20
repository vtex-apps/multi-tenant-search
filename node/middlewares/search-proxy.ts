export async function search_proxy(ctx: Context) {
  let url = ctx.req?.url?.replace('/_v/multi-tenant-search', "")

  const store = ctx.vtex.account
  let statusResponse = await ctx.clients.searchClient.search(store, url || '/productsearch')

  if (storeConfiguration?.active?.empty_search && statusResponse?.total === 0) {
    url = `c/${storeConfiguration.categories_of_products.join("/c/")}${url}`
    statusResponse = await ctx.clients.searchClient.search(storeConfiguration.accountName, url || '/productsearch')

    statusResponse.products?.forEach((product: any) => {
      product.partnerAccount = storeConfiguration.accountName
    });

  }
  return ctx.body = statusResponse
}

var storeConfiguration = {
  accountName: "biggy",
  active: {
    empty_search: true
  },
  categories_of_products: [],
  age_group: "15-29",
  customer_type: "high_end",
  minimum_score: 70
};