'use strict';

/**
 * Doctor.js controller
 *
 * @description: A set of functions called "actions" for managing `Doctor`.
 */

module.exports = {

  /**
   * Retrieve doctor records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.doctor.search(ctx.query);
    } else {
      return strapi.services.doctor.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a doctor record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.doctor.fetch(ctx.params);
  },

  /**
   * Count doctor records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.doctor.count(ctx.query);
  },

  /**
   * Create a/an doctor record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.doctor.add(ctx.request.body);
  },

  /**
   * Update a/an doctor record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.doctor.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an doctor record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.doctor.remove(ctx.params);
  }
};
