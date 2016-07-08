var validate = {
  '/api/getuserinfo': [
  		{ 'user_id': 'string' }
  ],
  '/api/login': [
    { username: 'string' },
    { password: 'string' },
    { email: 'email' },
  ],
  '/api/register': [
    { username: 'string' },
    { password: 'string' },
    { ensure: 'string' },
    { email: 'string' }
  ],
  '/api/uploadblog': [
    { title: 'string' },
    { content: 'string' },
    { tag: 'Array' }
  ],
  '/api/getbloglist': [
    { user_id: 'string' }
  ],
  'api/getblogbyid': [
    { blog_id: 'string' }
  ],
  'api/dellog': [
    { blog_id: 'string' }
  ]
};
