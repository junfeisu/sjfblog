import request from 'supertest'
import server from '../src/app'

describe('app test', () => {
  it('should return the blog', () => {
    request(server)
      .get('/api/blog')
      .expect('Content-type', /json/)
      .expect(200)
      .expect(res => {
      })
      .end((err, res) => {
        if (err) {
          console.log('err', err)
          throw err
        } else {
          console.log('hello', res)
        }
      })
  })
})