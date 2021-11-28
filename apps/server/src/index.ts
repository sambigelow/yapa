import Fastify from 'fastify'

const address = 3000
const fastify = Fastify()

fastify.get('/ping', async (_request, _reply) => {
  return 'pong\n'
})

fastify.listen(address, (err: any) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})