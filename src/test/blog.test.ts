import supertest from 'supertest'
import { describe, it, beforeEach, after } from 'mocha'
import { expect } from 'chai'
import app from '../app'

const server = app.listen()
const request = supertest.agent(server)

describe('blog API test', () => {
  it('should return the blog', done => {
    request
      .get('/api/blog')
      .expect('Content-type', /html/)
      .expect(200)
      .end(done)
  })

  it('should return the blogList', done => {
    request
      .post('/blogbyid')
      .send({blogid: '5b729d34e3de0116f1c428d5'})
      .set('Content-type', 'application/json')
      .expect(200)
      .expect(res => {
        res.body.title = 'NodeJs学习笔记之系统初识'
        res.body.create_date = '2017-08-01'
      })
      .end(done)
  })
})
