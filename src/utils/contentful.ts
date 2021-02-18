import {createClient} from 'contentful'

// TODO: Find some way to hide these access tokens
export const contentfulClient = createClient({
  space: 'hr64k362jsrr',
  accessToken: 'xJ069hQFlKqqlRVysCAg6a6mZsq-HyW1BmRfWZ77360'
})

export const PROGRESSIVE_JPG_QUERY = `fm=jpg&fl=progressive`
