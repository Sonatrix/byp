'use strict';

/**
 * Treatmenthistory.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');

module.exports = {

  /**
   * Promise to fetch all treatmenthistories.
   *
   * @return {Promise}
   */

  fetchAll: (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('treatmenthistory', params);
    // Select field to populate.
    const populate = Treatmenthistory.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    return Treatmenthistory
      .find()
      .where(filters.where)
      .sort(filters.sort)
      .skip(filters.start)
      .limit(filters.limit)
      .populate(populate);
  },

  /**
   * Promise to fetch a/an treatmenthistory.
   *
   * @return {Promise}
   */

  fetch: (params) => {
    // Select field to populate.
    const populate = Treatmenthistory.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    return Treatmenthistory
      .findOne(_.pick(params, _.keys(Treatmenthistory.schema.paths)))
      .populate(populate);
  },

  /**
   * Promise to count treatmenthistories.
   *
   * @return {Promise}
   */

  count: (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('treatmenthistory', params);

    return Treatmenthistory
      .count()
      .where(filters.where);
  },

  /**
   * Promise to add a/an treatmenthistory.
   *
   * @return {Promise}
   */

  add: async (values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Treatmenthistory.associations.map(ast => ast.alias));
    const data = _.omit(values, Treatmenthistory.associations.map(ast => ast.alias));

    // Create entry with no-relational data.
    const entry = await Treatmenthistory.create(data);

    // Create relational data and return the entry.
    return Treatmenthistory.updateRelations({ _id: entry.id, values: relations });
  },

  /**
   * Promise to edit a/an treatmenthistory.
   *
   * @return {Promise}
   */

  edit: async (params, values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Treatmenthistory.associations.map(a => a.alias));
    const data = _.omit(values, Treatmenthistory.associations.map(a => a.alias));

    // Update entry with no-relational data.
    const entry = await Treatmenthistory.update(params, data, { multi: true });

    // Update relational data and return the entry.
    return Treatmenthistory.updateRelations(Object.assign(params, { values: relations }));
  },

  /**
   * Promise to remove a/an treatmenthistory.
   *
   * @return {Promise}
   */

  remove: async params => {
    // Select field to populate.
    const populate = Treatmenthistory.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    // Note: To get the full response of Mongo, use the `remove()` method
    // or add spent the parameter `{ passRawResult: true }` as second argument.
    const data = await Treatmenthistory
      .findOneAndRemove(params, {})
      .populate(populate);

    if (!data) {
      return data;
    }

    await Promise.all(
      Treatmenthistory.associations.map(async association => {
        if (!association.via || !data._id) {
          return true;
        }

        const search = _.endsWith(association.nature, 'One') || association.nature === 'oneToMany' ? { [association.via]: data._id } : { [association.via]: { $in: [data._id] } };
        const update = _.endsWith(association.nature, 'One') || association.nature === 'oneToMany' ? { [association.via]: null } : { $pull: { [association.via]: data._id } };

        // Retrieve model.
        const model = association.plugin ?
          strapi.plugins[association.plugin].models[association.model || association.collection] :
          strapi.models[association.model || association.collection];

        return model.update(search, update, { multi: true });
      })
    );

    return data;
  },

  /**
   * Promise to search a/an treatmenthistory.
   *
   * @return {Promise}
   */

  search: async (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('treatmenthistory', params);
    // Select field to populate.
    const populate = Treatmenthistory.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    const $or = Object.keys(Treatmenthistory.attributes).reduce((acc, curr) => {
      switch (Treatmenthistory.attributes[curr].type) {
        case 'integer':
        case 'float':
        case 'decimal':
          if (!_.isNaN(_.toNumber(params._q))) {
            return acc.concat({ [curr]: params._q });
          }

          return acc;
        case 'string':
        case 'text':
        case 'password':
          return acc.concat({ [curr]: { $regex: params._q, $options: 'i' } });
        case 'boolean':
          if (params._q === 'true' || params._q === 'false') {
            return acc.concat({ [curr]: params._q === 'true' });
          }

          return acc;
        default:
          return acc;
      }
    }, []);

    return Treatmenthistory
      .find({ $or })
      .sort(filters.sort)
      .skip(filters.start)
      .limit(filters.limit)
      .populate(populate);
  }
};
