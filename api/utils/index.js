export const transformModal = (doc, ret) => {
  // remove the _id of every document before returning the result
  const { _id, __v, ...rest } = ret

  return {
    id: _id,
    ...rest,
  }
}

export const isProduction = process.env === 'production'
export const homePageUrl = isProduction ? '/' : 'http://localhost:3000/'
