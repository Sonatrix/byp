'use strict';

/**
 * Treatmenthistory.js controller
 *
 * @description: A set of functions called "actions" for managing `Treatmenthistory`.
 */

module.exports = {

  /**
   * Retrieve treatmenthistory records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.treatmenthistory.search(ctx.query);
    } else {
      return strapi.services.treatmenthistory.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a treatmenthistory record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.treatmenthistory.fetch(ctx.params);
  },

  /**
   * Count treatmenthistory records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.treatmenthistory.count(ctx.query);
  },

  /**
   * Create a/an treatmenthistory record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.treatmenthistory.add(ctx.request.body);
  },

  /**
   * Update a/an treatmenthistory record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.treatmenthistory.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an treatmenthistory record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.treatmenthistory.remove(ctx.params);
  }
};
