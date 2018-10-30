'use strict';

/**
 * TreatmentHistory.js controller
 *
 * @description: A set of functions called "actions" for managing `TreatmentHistory`.
 */

module.exports = {

  /**
   * Retrieve treatmentHistory records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.treatmentHistory.search(ctx.query);
    } else {
      return strapi.services.treatmentHistory.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a treatmentHistory record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.treatmentHistory.fetch(ctx.params);
  },

  /**
   * Count treatmentHistory records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.treatmentHistory.count(ctx.query);
  },

  /**
   * Create a/an treatmentHistory record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.treatmentHistory.add(ctx.request.body);
  },

  /**
   * Update a/an treatmentHistory record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.treatmentHistory.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an treatmentHistory record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.treatmentHistory.remove(ctx.params);
  }
};
