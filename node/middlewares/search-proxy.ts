export async function search_proxy(ctx: Context) {
  console.log(ctx.req.url)

  const url = ctx.req?.url?.replace('/_v/multi-tenant-search', "")
  console.log(url)
  const store = ctx.vtex.account
  let statusResponse = await ctx.clients.searchClient.search(store, url||'/productsearch')

  if(statusResponse?.total === 0) {
    statusResponse = await ctx.clients.searchClient.search('checkoutio', url||'/productsearch')
  }

  // ctx.status = statusResponse
  // ctx.body = statusResponse?.data || []
  // //ctx.set('Cache-Control', headers['cache-control'])
  return ctx.body = statusResponse
}
