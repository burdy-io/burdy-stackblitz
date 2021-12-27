import Hooks from 'burdy/src/shared/features/hooks';
import { getEnhancedRepository } from 'burdy/src/server/common/orm-helpers';
import Post from 'burdy/src/server/models/post.model';
import asyncMiddleware from 'burdy/src/server/middleware/async.middleware';
import { publishedQuery } from 'burdy/src/server/common/post.utility';

Hooks.addAction('api/init', async (app) => {
  app.get('/sitemap', asyncMiddleware(async (req, res) => {
    const postRepository = getEnhancedRepository(Post);
    const query = postRepository.createQueryBuilder('post');

    publishedQuery(query);

    query.andWhere('post.type IN (:...types)', {
      types: ['hierarchical_post','post','page']
    })

    const posts = await query.getMany();

    res.send(posts);
  }))
}, {id: 'sitemap'});
