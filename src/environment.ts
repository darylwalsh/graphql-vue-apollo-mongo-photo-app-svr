const defaultPort = 4000
const defaultURI = ''

export interface Environment {
  apollo: {
    introspection: boolean
    playground: boolean
  }
  port: number | string
  mongouri: string | string 
}


export const environment: Environment = {
  apollo: {
    introspection: process.env.APOLLO_INTROSPECTION === 'true',
    playground: process.env.APOLLO_PLAYGROUND === 'true',
  },
  port: process.env.PORT || defaultPort,
  mongouri: process.env.MONGO_URI || defaultURI
}
